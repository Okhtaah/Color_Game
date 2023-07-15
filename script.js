"use strict";

const spun = document.querySelector("#colorDisplay");
const reset = document.querySelector("#reset");
const easy = document.querySelector("#easyBtn");
const hard = document.querySelector("#hardBtn");
const message = document.querySelector("#message");
const circles = document.querySelectorAll(".square");
const container = document.querySelector("#container");
const header = document.querySelector("h1");

// Generate a random num
const ranNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Genrate a random color
const randColor = () => {
  return `rgb(${ranNum(0, 255)}, ${ranNum(0, 255)}, ${ranNum(0, 255)})`;
};

// set color to element
const setColorCircle = (element) => {
  element.style.backgroundColor = `${randColor()}`;
  return element.style.backgroundColor;
};
// const xx = setColorCircle(circles[0]);
// console.log(xx);

// set color to all
const setColorAll = (array) => {
  const listOfColors = [];
  for (const element of array) {
    if (element.classList.contains("removed")) {
      continue;
    }
    const rgbColor = setColorCircle(element);
    listOfColors.push(rgbColor);
  }
  return listOfColors;
};

const displayRandColor = (colors) => {
  const randomIndex = ranNum(0, colors.length - 1);
  const randomColor = colors[randomIndex];
  spun.textContent = randomColor;
  console.log(randomColor);
};

const win = () => {
  container.classList.add("unclickable");
  message.textContent = "Correct!!";
  for (const element of circles) {
    element.classList.remove("hidden");
    element.style.backgroundColor = spun.textContent;
  }
  header.style.backgroundColor = spun.textContent;
  reset.textContent = "Play again!!";
};
const lose = (wrongeOne) => {
  message.textContent = "Try again";
  wrongeOne.classList.add("hidden");
};

const resetElement = () => {
  header.style.backgroundColor = "";
  reset.textContent = "New Colors!";
  container.classList.remove("unclickable");
  message.textContent = "";
  for (const elem of circles) {
    elem.classList.remove("hidden");
  }
};

const colors = setColorAll(circles);
displayRandColor(colors);

const resetGame = () => {
  resetElement();
  const arrayColors = setColorAll(circles);
  console.log(arrayColors);
  displayRandColor(arrayColors);
};

reset.addEventListener("click", resetGame);

container.addEventListener("click", (event) => {
  if (event.target.nodeName === "DIV" && event.target.id !== "container") {
    if (event.target.style.backgroundColor === spun.textContent) {
      win();
    } else {
      lose(event.target);
    }
  }
});

easy.addEventListener("click", () => {
  easy.classList.add("selected");
  hard.classList.remove("selected");
  for (let i = 3; i < circles.length; i++) {
    setColorAll(circles);
    circles[i].classList.add("removed");
  }
  resetGame();
});

hard.addEventListener("click", () => {
  hard.classList.add("selected");
  easy.classList.remove("selected");
  for (let i = 3; i < circles.length; i++) {
    setColorAll(circles);
    circles[i].classList.remove("removed");
  }
  resetGame();
});
