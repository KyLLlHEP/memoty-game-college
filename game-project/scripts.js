// Получаем элементы карт
const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false; // Блокировка доски
let firstCard, secondCard;

// Функция для переворота карты
function flipCard() {
  if (lockBoard) return; // Предотвращаем переворачивание, если доска заблокирована
  if (this === firstCard) return; // Предотвращаем двойной клик на одну и ту же карту

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // Первый клик
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // Второй клик
    hasFlippedCard = false;
    secondCard = this;

    // Проверяем, совпадают ли карты
    if (firstCard.dataset.pictures === secondCard.dataset.pictures) {
      // Карты совпадают
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
    } else {
      // Карты не совпадают, закрываем их
      lockBoard = true; // Блокируем доску
      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        lockBoard = false; // Разблокируем доску
      }, 1500);
    }
  }
}

cards.forEach((card) => card.addEventListener("click", flipCard));
