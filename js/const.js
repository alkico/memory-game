const memoryBoard = document.querySelector("#memory-board");
let wrongGuesses = 0;
//SETTIMER FUNCTION
const timer = document.getElementById("timer");
let seconds = 0;
let minutes = 0;
let interval;
//FLIPCARDS, MATCHCARDS FUNCTIONS
let cardWasFlipped = false;
let firstCard, secondCard;
let pickedCards = [];
let shuffledCards = undefined;
let matchedCards = [];
//SELECT LEVEL FUNCTION
let level = 0;
let inputValue;
