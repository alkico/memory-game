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
    //this.classList.add("flip");
    setTimeout(() => {
      document.querySelectorAll(".card").classList.remove("flip");
    }, 2000);
  }
}
