.modal {
  display: none;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); Black w/ opacity
}


//load game
window.addEventListener("load", (event) => {
  let html = "";
  let shuffledCards = shuffleCards(cards); //after this I can use cards normally because it has been mutated to new shuffled array and returned in this function
  //console.log(shuffledCards);
  //THIS IS WORKING BUT ONLY SOME OF THE TIME - PROBLEM DEBUGGING
  /*memoryGame.cards.*/ /*memoryGame.*/ shuffledCards.forEach((card) => {
    // html += `<div class="card" data-card-name="${card.name}">`;
    // html += `<div class="front" style="background-image: url(./imgs/image.jpg) no-repeat width:200px; height: auto"></div>`;
    // html += `<div class="back" name="${card.name}"></div>`;

    //   html += `<div class="front" style="background: url(./imgs/${card.img}) no-repeat width:200px; height: auto"></div>`;
    html += `</div>`;
    html += `<div class="card" data-card-name="${card.name}">`;
    html += `<div class="back" name="${card.img}"></div>`;
    html += `<div class="front" style="background: url(./imgs/${card.img}) no-repeat"></div>`;
    html += `</div>`;
  });

  // Add all the divs to the HTML.
  document.querySelector("#memory-board").innerHTML = html;

  // Link the click event for each element(i.e. card) to a function to flipCard function
  document
    .querySelectorAll(".card")
    .forEach((card) => card.addEventListener("click", flipCard));
  startTimer();
  //ALTERNATELY: FLIP METHOD ONE USING FLIP CLASS THAT TOGGLES + CSS ROTATE PROPERTY TO ROTATE HTML ELEMENTS&
  //AND TO MAKE OPPOSITE SIDES INVISIBLE AFTER ROTATING. REQUIRES CHANGES TO CSS.
});

function checkIfPair(firstCard, secondCard) {
  //add one to pairsClicked property
  //if cards are the same, add 1 to pairsGuessed
  //return true or false based on result of comparing both cards
  console.log("test checkifpair");

  //let cardName = div.dataset.cardname;
  //console.log(firstCard);
  console.log(this);
  if (firstCard.dataset.card - name === secondCard.dataset.card - name) {
    wrongGuesses += 1;
    console.log(wrongGuesses);
    disableCards();
  } else {
    console.log("Test checkifpair");
    //unflipCards();
  }

  function disableCards() {
    //called in checkIfPair if the two cards match
    //or maybe get them to disappear?
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
  }

  function unflipCards() {
    // called if two cards are not matching cards
    console.log("test unflip cards");
    setTimeout(() => {
      document.querySelectorAll(".card").classList.remove("flip");
    }, 2000);
  }
}
