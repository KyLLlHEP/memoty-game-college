//Get elem memory-cards
const cards = document.querySelectorAll(".memory-card");
// manipulation cards
let hasFlippedCard = false;
let firstCard, secondCard;

// Flipped card
function flipCard() {
  this.classList.add("flip");
  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;
  } else {
    //second click
    hasFlippedCard = false;
    secondCard = this;
  }
}

cards.forEach((card) => card.addEventListener("click", flipCard));
