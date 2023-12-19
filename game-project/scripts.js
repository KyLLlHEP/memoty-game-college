import { generateCards } from "./create.js";

// Dificult scale

document.addEventListener("DOMContentLoaded", function () {
  highlightLevel(currentLevel);
});

function highlightLevel(level) {
  // Reset all style
  for (let i = 1; i <= 10; i++) {
    const levelSpan = document.getElementById(`level-${i}`);
    if (levelSpan) {
      levelSpan.style.fontSize = ""; // reset fonts
      levelSpan.style.color = ""; // reset color
    }
  }

  // Highlite current level
  const currentLevelSpan = document.getElementById(`level-${level}`);
  if (currentLevelSpan) {
    currentLevelSpan.style.fontSize = "larger"; // Incrase size fonts
    currentLevelSpan.style.color = "red"; // Change color
  }
}
// SHOW GIFF LEVEL UP
function showLevelCompleteGif() {
  const gif = document.getElementById("level-complete-gif");
  gif.style.display = "block"; // Show Giff

  // Hide giff 1 second after
  setTimeout(() => {
    gif.style.display = "none";
  }, 1000); // 1 second display
}

// END GAME GIFF
function showEndGameGif() {
  const gif = document.getElementById("end-game-gif");
  gif.style.display = "block"; // Show giff

  // Hide Giff
  setTimeout(() => {
    gif.style.display = "none";
  }, 3000); // 3 second show timer
}
// Get element card

const gameBoard = document.querySelector(".memory-game");
const startButton = document.querySelector(".start-game");

//
let currentLevel = 1;
let pairCount = 2;
let matchedPairs = 0;

function startGame() {
  modal.style.display = "none";
  startLevel();
  startButton.removeEventListener("click", startGame);
  highlightLevel(currentLevel); // Delite click after first start
}

function startLevel() {
  matchedPairs = 0; //Resetting the counter of found pairs
  clearBoard();
  generateCards(pairCount, gameBoard);
  addCardListeners();
  adjustCardSize(pairCount);
  highlightLevel(currentLevel);
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
    showLevelCompleteGif();
    startLevel();
  } else {
    console.log("Congragulation");
    showEndGameGif();
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

// GAME RULES

document.addEventListener("DOMContentLoaded", function () {
  // Get elem modal window
  const modal = document.getElementById("rulesModal");
  // Get button game-rules
  const rulesBtn = document.querySelector(".rules-game");
  // Get button "Restart"
  const restartBtn = document.querySelector(".restart-game");
  // Get elem  <span>, clouse window
  const span = document.getElementsByClassName("close-button")[0];
  // User press button  "Game Rules", opened modal window
  rulesBtn.onclick = function () {
    modal.style.display = "block";
  };
  // User click <span> (x), window clouse
  span.onclick = function () {
    modal.style.display = "none";
  };
  // User click outside modal window (window clouse)
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  //  "Restart"
  restartBtn.onclick = function () {
    location.reload(); // Reload window
  };
});
