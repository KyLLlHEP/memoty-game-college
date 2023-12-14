import { generateCards } from "./create.js";

// Get element card

const gameBoard = document.querySelector(".memory-game");
const startButton = document.getElementById("start-game");

//
let currentLevel = 1;
let pairCount = 2;
let matchedPairs = 0;

function startGame() {
  startLevel();
  startButton.removeEventListener("click", startGame); // Delite click after first start
}

function startLevel() {
  matchedPairs = 0; //Resetting the counter of found pairs
  clearBoard();
  generateCards(pairCount, gameBoard);
  addCardListeners();
  adjustCardSize(pairCount);
}

function clearBoard() {
  gameBoard.innerHTML = "";
}

startButton.addEventListener("click", startGame);

//
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // First click
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // Second click
    hasFlippedCard = false;
    secondCard = this;

    if (firstCard.dataset.pictures === secondCard.dataset.pictures) {
      // Card matched
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);

      // Add counter find card
      matchedPairs++;

      // Check all cards find
      if (matchedPairs === pairCount) {
        // If all cards open go next level
        setTimeout(nextLevel, 1000);
      }
    } else {
      // Card no matched , clouse card
      lockBoard = true;
      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        lockBoard = false;
      }, 1500);
    }
  }
}

function nextLevel() {
  currentLevel++;
  if (currentLevel <= 10) {
    pairCount = currentLevel + 1;
    startLevel();
  } else {
    console.log("Congragulation");
    // End game. Need video content add.
  }
}
//

function adjustCardSize(pairCount) {
  const totalCards = pairCount * 2;
  const gameBoard = document.querySelector(".memory-game");
  const cards = gameBoard.querySelectorAll(".memory-card");

  // Size calculate cards
  let containerWidth = gameBoard.offsetWidth; // With container
  let containerHeight = gameBoard.offsetHeight; // Hight container
  let cardSize;

  if (totalCards <= 4) {
    // for 2 pair cards(4 cards)
    cardSize = Math.min(containerWidth, containerHeight) / 2 - 10; // Two card in line
  } else {
    // for 3 pairs and over
    let rows = Math.ceil(Math.sqrt(totalCards)); // Number of rows
    cardSize = Math.min(containerWidth, containerHeight) / rows - 10; // Even distribution of cards
  }

  cards.forEach((card) => {
    card.style.width = `${cardSize}px`;
    card.style.height = `${cardSize}px`;
  });
}

startButton.addEventListener("click", () => {
  const pairCount = 2;
  generateCards(pairCount, gameBoard);
  addCardListeners();
  adjustCardSize(pairCount);
});

function addCardListeners() {
  const cards = document.querySelectorAll(".memory-card");
  cards.forEach((card) => card.addEventListener("click", flipCard));
}

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
