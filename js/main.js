const memoryGame = new MemoryGame(cards);
let memoryBoard = document.querySelector("#memory-board");
let memoryCard = document.querySelectorAll(".card");
//let modal = document.getElementById("popup-congrats");
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
let inputValue;
//let dropdownLevels = document.getElementById("select-level");
//let dropdownLevels = document.querySelectorAll(
//  ".select-level > select > option"
//);

//EVENT LISTENERS
document
  .querySelector(".start-game-button")
  .addEventListener("click", startGame);
//document.querySelector(".select-level").addEventListener("click", selectLevel);
document.querySelector(".select-level").addEventListener("input", selectLevel);

function startGame() {
  console.log("howmanygames");
  resetWrongGuesses();
  //console.log("guesses");
  startTimer();
  //console.log("timer");
  //console.log("reset");
  let objectInput = { target: { value: inputValue } };
  selectLevel(objectInput);
}
function selectLevel(event) {
  console.log(event.target.value);
  inputValue = parseInt(event.target.value); //line 41 here because of 46
  console.log(inputValue);
  loadCards(event.target.value - 1);
  // let dropdownLevels = document.querySelectorAll(
  //   ".select-level > select > option"
  // );
  // console.log(dropdownLevels, typeof dropdownLevels);
  //console.log(
  //  document.querySelectorAll(".select-level > select > option")[1].value
  //);
  //let levelChosen = dropdownLevels.addEventListener("click", selectLevel);

  // for (i = 1; i < dropdownLevels.length; i++) {
  //   console.log(i, dropdownLevels[i].value);
  // if (dropdownLevels[i].value === "1") {
  //   console.log("player chose level 1");
  //   dropdownLevels[i].onclick = loadCards(cardsLevel1);
  // }
  // }
  //dropdownLevels.forEach(function (level) {});
}

function loadCards(levelCards) {
  console.log(levelCards);
  let html = "";
  shuffledCards = shuffleCards(cards[levelCards]); //levelcards[2]
  shuffledCards.forEach((card) => {
    html += `<div class="card" data-card-name="${card.name}">`;
    html += `<div class="back" name="${card.name}"></div>`;
    html += `<div class="front" style="background-image: url('./imgs/${card.img}')"><div id="quote">${card.quote}</div></div>`;
    html += `</div>`;
  });
  memoryBoard.innerHTML = html; // Add all the divs to the HTML.
  memoryBoard.innerHTML += `<div id="popup-congrats" class="hide"><div class="modal-content">text here</div></div>`;
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
      alert("Time's up!");
      clearInterval(interval);
    }
  }, 1000);
}

function flipCard() {
  this.classList.add("flip");
  if (!cardWasFlipped) {
    cardWasFlipped = true;
    firstCard = this; //ie the first card they clicked is assigned to firstCard variable
    pickedCards.push(firstCard);
    return;
  } else {
    cardWasFlipped = false;
    secondCard = this;
    pickedCards.push(secondCard);
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
  pickedCards[0].classList.add("match");
  pickedCards[1].classList.add("match");
  matchedCards.push(pickedCards[0]);
  matchedCards.push(pickedCards[1]);
  pickedCards = [];
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
  console.log(matchedCards.length, shuffledCards.length);
  if (matchedCards.length === shuffledCards.length) {
    clearInterval(interval);

    let finalTime = timer.innerHTML;
    document.getElementById("popup-congrats").classList.remove("hide");
    console.log("Congratulations, you have found all the pairs!");
    matchedCards = [];
    document
      .querySelector("#popup-congrats")
      .addEventListener("click", startGame);
  }
}
//PROBLEM CLOSING THE POP-UP WINDOW
function playAgain() {
  document.querySelector("#popup-congrats").classList.add("hide");

  console.log("replay");
  startGame();
}
