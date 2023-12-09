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
    //Match card
    if (firstCard.dataset.pictures === secondCard.dataset.pictures) {
      //It's a match
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
      }, 1500);
    }
  }
}

cards.forEach((card) => card.addEventListener("click", flipCard));
