const memoryGame = new MemoryGame(cards);
let memoryBoard = document.querySelector("#memory-board");
let memoryCard = document.querySelectorAll(".card");
//refactor let memoryCards = doesn't work when I try to call within functions
//START GAME AND SHUFFLE CARDS
//COUNT MISTAKES
let wrongGuesses = 0;
//SETTIMER FUNCTION
let timer = document.getElementById("timer");
let seconds = 0;
let minutes = 0;
let interval;
//FLIPCARDS, MATCHCARDS FUNCTIONs
let cardWasFlipped = false;
let firstCard, secondCard;
let pickedCards = [];
let shuffledCards = undefined;
let matchedCards = [];
let level = 0;
//EVENT LISTENERS
document
  .querySelector(".start-game-button")
  .addEventListener("click", startGame);

function startGame() {
  resetWrongGuesses();
  startTimer();
  resetWrongGuesses();
  loadCards();
  countWrongGuesses();
  congratulations();
}

function loadCards() {
  let html = "";
  shuffledCards = shuffleCards(cards[level]); //index of level
  shuffledCards.forEach((card) => {
    html += `<div class="card" data-card-name="${card.name}">`;
    html += `<div class="back" name="${card.name}"></div>`;
    html += `<div class="front" style="background-image: url('./imgs/${card.img}')"><div id="quote">${card.quote}</div></div>`;
    html += `</div>`;
  });
  memoryBoard.innerHTML = html; // Add all the divs to the HTML.
  memoryBoard.innerHTML += `<div id="popup-congrats"></div>`;
  document
    .querySelectorAll(".card")
    .forEach((card) => card.addEventListener("click", flipCard));
}

function shuffleCards(cards) {
  //console.log(JSON.parse(JSON.stringify(cards))); //creates deep copy and shows ORIGINAL cards array
  if (!cards) {
    return undefined;
  } else {
    for (let i = 0; i < cards.length - 1; i++) {
      let j = Math.floor(Math.random() * cards.length); //don't need +1 because length starts fm 0
      let temp = cards[j];
      cards[j] = cards[i];
      cards[i] = temp;
    }
    return cards; //swaps position of card at index i (0 thru till last cast) and card at random index j
  }
}

function startTimer() {
  interval = setInterval(function () {
    timer.innerHTML = minutes + ":0" + seconds;
    seconds += 1;
    if (seconds > 9 && seconds < 60) {
      timer.innerHTML = minutes + ":" + seconds;
    }
    if (seconds === 60) {
      minutes += 1;
      seconds = 0;
    }
    if (minutes === 60) {
      console.log("Time's up!");
    }
  }, 1000);
}

function flipCard() {
  console.log(this);
  this.classList.add("flip");
  if (!cardWasFlipped) {
    cardWasFlipped = true;
    firstCard = this; //ie the first card they clicked is assigned to firstCard variable
    //console.log(cardWasFlipped, firstCard.dataset);
    pickedCards.push(firstCard);
    return;
  } else {
    cardWasFlipped = false;
    secondCard = this;
    //console.log(cardWasFlipped, secondCard);
    pickedCards.push(secondCard);
    //console.log(pickedCards);
    checkIfMatching();
  }
}

function checkIfMatching() {
  if (firstCard.dataset.cardName !== secondCard.dataset.cardName) {
    countWrongGuesses();
    console.log("it's not a match!", this);
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
    }, 2000);
    cardsUnmatched();
  } else {
    console.log("it's a match");
    setTimeout(function () {
      cardsMatched();
    }, 2000);
  }
}

function countWrongGuesses() {
  wrongGuesses += 1;
  document.getElementById("count-wrong-guesses").innerHTML =
    "Incorrect guesses: " + wrongGuesses;
}

function resetWrongGuesses() {
  wrongGuesses = 0;
  document.getElementById("count-wrong-guesses").innerHTML =
    "Incorrect guesses: " + wrongGuesses;
  timer.innerHTML = "Time: 0:00";
}

function cardsMatched() {
  //console.log(pickedCards);
  pickedCards[0].classList.add("match");
  pickedCards[1].classList.add("match");
  matchedCards.push(pickedCards[0]);
  matchedCards.push(pickedCards[1]);
  pickedCards = [];
  //console.log(pickedCards);
  congratulations();
}

function cardsUnmatched() {
  pickedCards[0].classList.add("unmatched");
  pickedCards[1].classList.add("unmatched");
  disableCards();
  setTimeout(function () {
    pickedCards[0].classList.remove("flip", "unmatched");
    pickedCards[1].classList.remove("flip", "unmatched");
    pickedCards = [];
    enableCards();
  }, 2000);
}

function disableCards() {
  if (pickedCards.length === 2) {
    document.querySelectorAll(".card").forEach(function (card) {
      card.classList.add("disabled");
    });
  }
}

function enableCards() {
  document.querySelectorAll(".card").forEach(function (card) {
    card.classList.remove("disabled");
  });
}

function congratulations() {
  let modal = document.getElementById("popup-congrats");
  if (matchedCards.length === shuffledCards.length) {
    clearInterval(interval);
    let finalTime = timer.innerHTML;
    modal.classList.add("show-popup");
    console.log("Congratulations, you have found all the pairs!");
  }
}
