function resetValues() {
  seconds = 0;
  minutes = 0;
  resetWrongGuesses();
  matchedCards = [];
  pickedCards = [];
  cardWasFlipped = false;
  clearInterval(interval);
}

function startGame() {
  resetValues();
  startTimer();
  let objectInput = { target: { value: inputValue } };
  selectLevel(objectInput);
  document.getElementById("popup-congrats").classList.add("hide");
}

function selectLevel(event) {
  resetValues();
  inputValue = parseInt(event.target.value);
  loadCards(event.target.value - 1);
  startTimer();
}

function loadCards(levelCards) {
  let html = "";
  shuffledCards = shuffleCards(cards[levelCards]);
  shuffledCards.forEach((card) => {
    html += `<div class="card" data-card-name="${card.name}">`;
    html += `<div class="back" name="${card.name}"></div>`;
    if (card.img) {
      html += `<div class="front"><img src='./imgs/${card.img}' width="auto" height="70"><div id="quote">${card.quote}</div></div>`;
    } else if (!card.img) {
      html += `<div class="front"><div id="quote">${card.quote}</div></div>`;
    }
    html += `</div>`;
  });
  memoryBoard.innerHTML = html;
  memoryBoard.innerHTML += `<div id="popup-congrats" class="hide"><div class="modal-content" style="background-image: url('../imgs/H8EN.gif')">Nicely done!</div></div>`;
  document
    .querySelectorAll(".card")
    .forEach((card) => card.addEventListener("click", flipCard));
}

function shuffleCards(cards) {
  if (!cards) {
    return undefined;
  } else {
    for (let i = 0; i < cards.length - 1; i++) {
      let j = Math.floor(Math.random() * cards.length);
      let temp = cards[j];
      cards[j] = cards[i];
      cards[i] = temp;
    }
    return cards;
  }
}

function startTimer() {
  interval = setInterval(function () {
    timer.innerHTML = "Time: " + minutes + ":0" + seconds;
    seconds += 1;
    if (seconds > 9 && seconds < 60) {
      timer.innerHTML = "Time: " + minutes + ":" + seconds;
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
    firstCard = this;
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
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
    }, 2000);
    cardsUnmatched();
  } else {
    disableCards();
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
    "Wrong guesses: " + wrongGuesses;
  timer.innerHTML = "Time: 0:00";
}

function cardsMatched() {
  pickedCards[0].classList.add("match");
  pickedCards[1].classList.add("match");
  matchedCards.push(pickedCards[0]);
  matchedCards.push(pickedCards[1]);
  pickedCards = [];
  enableCards();
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
  if (matchedCards.length === shuffledCards.length) {
    clearInterval(interval);
    let finalTime = timer.innerHTML;
    document.getElementById("popup-congrats").classList.remove("hide");
    document
      .querySelector("#popup-congrats")
      .addEventListener("click", startGame);
  }
}

//EVENT LISTENERS
document
  .querySelector(".start-game-button")
  .addEventListener("click", startGame);
document.querySelector(".select-level").addEventListener("input", selectLevel);
