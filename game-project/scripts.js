import { generateCards } from "../create.js";

// Получаем элементы карт

const gameBoard = document.querySelector(".memory-game");
const startButton = document.getElementById("start-game");
//--//
function adjustCardSize(pairCount) {
  const totalCards = pairCount * 2;
  const gameBoard = document.querySelector(".memory-game");
  const cards = gameBoard.querySelectorAll(".memory-card");

  // Расчет ширины и высоты каждой карточки
  let containerWidth = gameBoard.offsetWidth; // Ширина контейнера
  let containerHeight = gameBoard.offsetHeight; // Высота контейнера
  let cardSize;

  if (totalCards <= 4) {
    // Для 2 пар (4 карточки)
    cardSize = Math.min(containerWidth, containerHeight) / 2 - 10; // Две карточки в ряду
  } else {
    // Для 3 и более пар
    let rows = Math.ceil(Math.sqrt(totalCards)); // Количество рядов
    cardSize = Math.min(containerWidth, containerHeight) / rows - 10; // Равномерное распределение карточек
  }

  cards.forEach((card) => {
    card.style.width = `${cardSize}px`;
    card.style.height = `${cardSize}px`;
  });
}
//--//

startButton.addEventListener("click", () => {
  const pairCount = 4;
  generateCards(pairCount, gameBoard);
  addCardListeners();
  adjustCardSize(pairCount);
  // generateCards(3, gameBoard);
  // addCardListeners();
});

function addCardListeners() {
  const cards = document.querySelectorAll(".memory-card");
  cards.forEach((card) => card.addEventListener("click", flipCard));
}

let hasFlippedCard = false;
let lockBoard = false;
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

// cards.forEach((card) => card.addEventListener("click", flipCard));
