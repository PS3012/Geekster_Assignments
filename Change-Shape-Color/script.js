const colorItem = document.querySelector(".shape-color-item");
const shapeItem = document.querySelector(".shape-box");
const colorButton = document.getElementById("change-color");
const shapeButton = document.getElementById("change-shape");
const clipPath = [
  "50% 0%, 0% 100%, 100% 100%",
  "20% 0%, 80% 0%, 100% 100%, 0% 100%",
  "25% 0%, 100% 0%, 75% 100%, 0% 100%",
  "50% 0%, 100% 50%, 50% 100%, 0% 50%",
  "50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%",
  "25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%",
  "50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%",
  "30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%",
  "50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%",
  "0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%",
  "40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%",
  "0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%",
  "50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%",
  "10% 25%, 35% 25%, 35% 0%, 65% 0%, 65% 25%, 90% 25%, 90% 50%, 65% 50%, 65% 100%, 35% 100%, 35% 50%, 10% 50%",
  "0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%",
  "20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%",
];

const getRandomValue = () => Math.floor(Math.random() * 255);

const changeButtonHover = (button, color) => {
  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = color;
  });
  button.addEventListener("mouseout", () => {
    button.style.backgroundColor = "#000000";
  });
};

colorButton.addEventListener("click", () => {
  const color = `rgb(${getRandomValue()}, ${getRandomValue()}, ${getRandomValue()})`;
  colorItem.style.background = color;
  changeButtonHover(colorButton, color);
  changeButtonHover(shapeButton, color);
});

shapeButton.addEventListener("click", () => {
  const shape = clipPath[Math.floor(Math.random() * (clipPath.length + 1))];
  shapeItem.style.clipPath = `polygon(${shape})`;
});
