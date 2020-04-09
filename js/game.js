class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = [];
    this.pairsClicked = 0; //need this to only allow two cards called
    //this.pairsGuessed = 0;
    this.wrongGuesses = 0;
  }

  //   init(){
  //     //load cards function here?? and then call it in main??
  //   }

  // shuffleCards(cards) {
  //   if (!cards) {
  //     return undefined;
  //   } else {
  //     //let newCardsArr = this.cardsArr.splice(0, cardsArr.length); //do I need to make sure not to mutate the original array?
  //     for (let i = 0; i < cards.length - 1; i++) {
  //       let j = Math.floor(Math.random() * cards.length + 1);
  //       let temp = cards[j];
  //       cards[j] = cards[i];
  //       cards[i] = temp;
  //     }
  //     return cards;
  //   }
  // }

  // checkIfPair(firstCard, secondCard) {
  //   //if cards are not the same, add 1 to mistakes
  //   //return true or false based on result of comparing both cards

  //   this.pickedCards.unshift(firstCard);
  //   this.pickedCards.push(secondCard);
  //   console.log(this.pickedCards);
  //   this.pairsClicked += 1;
  //   if (this.pickedCards[0].name === this.pickedCards[1].name) {
  //     //(firstCard.name === secondCard.name) {
  //     this.pairsGuessed += 1;
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  isFinished(cards) {
    if (this.pairsGuessed < cards.length / 2) {
      return false;
    } else if (this.pairsGuessed === cards.length / 2) {
      console.log("Congratulations, you have found all the pairs!");
      return true;
    }
  }
}
