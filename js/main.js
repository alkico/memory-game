const memoryGame = new MemoryGame(cards);
let memoryBoard = document.querySelector("#memory-board");
//START GAME AND SHUFFLE CARDS
//let shuffledCards = shuffleCards(cards);
//DOM ELEMENTS
let wrongGuesses = 0;
let timer = document.getElementById("timer");
let seconds = 0;
let minutes = 0;
//FLIPCARDS FUNCTION
let cardWasFlipped = false;
let firstCard, secondCard;
let pickedCards = [];
let interval;
let shuffledCards = shuffleCards(cards);
let matchedCards = [];

//SHUFFLE CARDS
function shuffleCards(cards) {
  //console.log("test shuffle cards", JSON.parse(JSON.stringify(cards))); //creates deep copy and shows ORIGINAL cards array
  if (!cards) {
    return undefined;
  } else {
    //let newCardsArr = this.cardsArr.splice(0, cardsArr.length); //do I need to make sure not to mutate the original array?
    for (let i = 0; i < cards.length - 1; i++) {
      let j = Math.floor(Math.random() * cards.length); //don't need +1 because length starts fm 0
      let temp = cards[j];
      cards[j] = cards[i];
      cards[i] = temp;
    }
    return cards; //swaps position of card at index i (0 thru till last cast) and card at random index j
  }
}

//load cards in browser. Link this to the shuffle function

window.addEventListener("load", (event) => {
  let html = "";
  let shuffledCards = shuffleCards(cards); //after this I can use cards normally because it has been mutated to new shuffled array and returned in this function
  //console.log(shuffledCards);
  //THIS IS WORKING BUT ONLY SOME OF THE TIME - PROBLEM DEBUGGING
  /*memoryGame.cards.*/ /*memoryGame.*/ shuffledCards.forEach((card) => {
    html += `<div class="card" data-card-name="${card.name}">`;
    html += `<div class="back" name="${card.name}"></div>`;
    html += `<div class="front" style="background: url(./imgs/${card.img}) no-repeat width:200px; height: auto"></div>`;
    html += `</div>`;
  });

  // Add all the divs to the HTML.
  document.querySelector("#memory-board").innerHTML = html;

  // Link the click event for each element(i.e. card) to a function to flipCard function
  document
    .querySelectorAll(".card")
    .forEach((card) => card.addEventListener("click", flipCard));

  //ALTERNATELY: FLIP METHOD ONE USING FLIP CLASS THAT TOGGLES + CSS ROTATE PROPERTY TO ROTATE HTML ELEMENTS&
  //AND TO MAKE OPPOSITE SIDES INVISIBLE AFTER ROTATING. REQUIRES CHANGES TO CSS.
});

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
  // if (startGame) {
  //   // OR WOULD IT BE BETTER TO PUT CLEARINTERVAL IN THE START GAME FUNCTION (i tried this but couldn't get it to work)
  //   clearInterval(interval);
  // }
}

function flipCard() {
  //console.log("flipped");
  //console.log(this);
  //this.classList.toggle("flip");
  this.classList.add("flip");

  // checkForMatch(); //HAVING TROUBLE SETTING THIS ONE UP AS IT'S OWN FUNCTION BECAUSE OF dataset.className issue.

  if (!cardWasFlipped) {
    //ie the first time player clicks a card
    startTimer();
    cardWasFlipped = true;
    firstCard = this; //ie the card they clicked is assigned to firstCard variable
    //console.log(cardWasFlipped, firstCard.dataset);
    pickedCards.push(firstCard);
    //console.log(pickedCards);
    return;
  } else {
    //second time player clicks on card
    cardWasFlipped = false;
    secondCard = this;
    //console.log(cardWasFlipped, secondCard);
    pickedCards.push(secondCard);
    //console.log(pickedCards);

    checkIfMatching();
  }
}

function checkIfMatching() {
  // console.log(firstCard, firstCard.dataset);
  // console.log(secondCard, secondCard.dataset);
  if (firstCard.dataset.cardName !== secondCard.dataset.cardName) {
    //I don't get why the dataset is called cardName(i did set data above to cardName at one point but changed it to card-name)
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

function cardsMatched() {
  //console.log(pickedCards);
  pickedCards[0].classList.add("match");
  pickedCards[1].classList.add("match");
  matchedCards.push(pickedCards[0]);
  matchedCards.push(pickedCards[1]);
  pickedCards = [];
  //console.log(pickedCards);
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
  //console.log(pickedCards.length);
  if (pickedCards.length === 2) {
    //refactor let cardsArr = document.querySelectorAll(".card")
    document.querySelectorAll(".card").forEach(function (card) {
      card.classList.add("disabled");
    });
  }
  //console.log(cards);
}

function enableCards() {
  document.querySelectorAll(".card").forEach(function (card) {
    card.classList.remove("disabled");
  });
}

//gameOver function to check if game is over end load end screen
console.log(document.getElementsByClassName("start-game-button"));

document
  .querySelector(".start-game-button")
  .addEventListener("click", startGame);

function startGame() {
  shuffledCards = shuffleCards(cards); //shuffle deck for new game
  loadGame(); //load new game
  wrongGuesses = 0;
  document.getElementById("count-wrong-guesses").innerHTML =
    "Incorrect guesses: " + wrongGuesses;
  timer.innerHTML = "Time: 0:00";
  clearInterval(interval);
}

function loadGame() {
  let html = "";
  shuffledCards = shuffleCards(cards); //after this I can use cards normally because it has been mutated to new shuffled array and returned in this function
  //console.log(shuffledCards);
  //THIS IS WORKING BUT ONLY SOME OF THE TIME - PROBLEM DEBUGGING
  /*memoryGame.cards.*/ /*memoryGame.*/ shuffledCards.forEach((card) => {
    html += `<div class="card" data-card-name="${card.name}">`;
    html += `<div class="back" name="${card.name}"></div>`;
    html += `<div class="front" style="background: url(./imgs/${card.img}) no-repeat"></div>`;
    html += `</div>`;
  });

  // Add all the divs to the HTML.
  document.querySelector("#memory-board").innerHTML = html;

  // Link the click event for each element(i.e. card) to a function to flipCard function
  document
    .querySelectorAll(".card")
    .forEach((card) => card.addEventListener("click", flipCard));
}

function congratulations() {
  if (matchedCards.length === shuffledCards.length / 2) {
    console.log("Congrats");
  }
}

startGame();

congratulations();
