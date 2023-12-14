export const images = [
  "Cherry.jpg",
  "Dog.jpg",
  "Dolphin.jpg",
  "Dolphin.jpg",
  "Fire.jpg",
  "Globe.jpg",
  "Lion.jpg",
  "Lock.jpg",
  "Party.jpg",
  "Piano.jpg",
  "Pizza.jpg",
  "Present.jpg",
  "Silly.jpg",
  "Sunflower.jpg",
  "Target.jpg",
  "Top hat.jpg",
  "Umbrella.jpg",
];
export function generateCards(level, gameBoard) {
  const pairs = level;
  let selectedImages = getRandomImages(images, pairs);
  selectedImages = [...selectedImages, ...selectedImages]; // Дублируем для создания пар
  selectedImages = shuffle(selectedImages); // Перемешиваем картинки

  gameBoard.innerHTML = "";

  selectedImages.forEach((img) => {
    const cardHTML = `
      <div class="memory-card" data-pictures="${img}">
        <img class="front-face" src="img/${img}" alt="${img}" />
        <img class="back-face" src="img/Back-face.png" alt="memory-card" />
      </div>
    `;
    gameBoard.innerHTML += cardHTML;
  });
}

// Function for random image
function getRandomImages(images, count) {
  let shuffledImages = shuffle([...images]);
  return shuffledImages.slice(0, count);
}

//  shuffle card

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
