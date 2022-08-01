//Could've used TypeScript here but it's way too capricious

const firstInputColor = document.querySelector(
  ".container__primary-color-input"
);

const labelFirstInputColor = document.querySelector("label[for=primary-color]");
labelFirstInputColor.style.color = "black";
firstInputColor.style.backgroundColor = "#FF5F6D";

const secondInputColor = document.querySelector(
  ".container__secondary-color-input"
);
const labelSecondInputColor = document.querySelector(
  "label[for=secondary-color]"
);

const gradientOrientationBar = document.querySelector(
  ".container__gradient-orientation-input"
);

labelSecondInputColor.style.color = "black";
secondInputColor.style.backgroundColor = "#FFC371";

const mainPageBackgroundGradient = document.querySelector(".main--gradient");

const copyButton = document.querySelector(".container__copy-button");

const randomButton = document.querySelector(".container__random-color-button");

const rotationSpan = document.querySelector(
  ".container__gradient-orientation-degrees"
);

let mainPageColorPrimary = "#FF5F6D";
let mainPageColorSecondary = "#FFC371";
let mainPageColorOrientation = 90;
let valueOfLinearGradient = `linear-gradient(${mainPageColorOrientation}, ${mainPageColorPrimary}, ${mainPageColorSecondary})`;

firstInputColor.addEventListener("input", (e) => {
  let inputtedColor = e.target.value;
  labelFirstInputColor.textContent = `${inputtedColor.toUpperCase()}`;

  //To make sure that the label remains visible when picking a color with a low contrast ratio
  if (inputtedColor > "#BABABA") {
    labelFirstInputColor.style.color = "black";
    firstInputColor.style.border = "2px solid black";
  } else {
    labelFirstInputColor.style.color = "white";
    firstInputColor.style.border = "2px solid white";
  }
  firstInputColor.style.backgroundColor = `${inputtedColor}`;
  mainPageColorPrimary = inputtedColor;
  changeMainPageBackground(
    mainPageColorOrientation,
    inputtedColor,
    mainPageColorSecondary
  );
});

secondInputColor.addEventListener("input", (e) => {
  let inputtedColor = e.target.value;
  labelSecondInputColor.textContent = `${inputtedColor.toUpperCase()}`;

  //To make sure that the label remains visible when picking a color with a low contrast ratio
  if (inputtedColor > "#BABABA") {
    labelSecondInputColor.style.color = "black";
    secondInputColor.style.border = "2px solid black";
  } else {
    labelSecondInputColor.style.color = "white";
    secondInputColor.style.border = "2px solid white";
  }
  secondInputColor.style.backgroundColor = `${inputtedColor}`;
  mainPageColorSecondary = inputtedColor;
  changeMainPageBackground(
    mainPageColorOrientation,
    mainPageColorPrimary,
    inputtedColor
  );
});

// function checkLuminosity(inputtedColor, label, input) {
//   if (inputtedColor > "#BABABA") {
//     label.style.color = "black";
//     input.style.border = "2px solid black";
//   } else {
//     label.style.color = "white";
//     input.style.border = "2px solid white";
//   }
// }

gradientOrientationBar.addEventListener("input", (e) => {
  let inputtedOrientation = e.target.value;
  rotationSpan.textContent = `${inputtedOrientation}°`;
  mainPageColorOrientation = inputtedOrientation;
  changeMainPageBackground(
    inputtedOrientation,
    mainPageColorPrimary,
    mainPageColorSecondary
  );
});

function changeMainPageBackground(orientation, firstColor, secondColor) {
  if (firstColor > "#BABABA") {
    labelFirstInputColor.style.color = "black";
    firstInputColor.style.border = "2px solid black";
  } else {
    labelFirstInputColor.style.color = "white";
    firstInputColor.style.border = "2px solid white";
  }
  if (secondColor > "#BABABA") {
    labelSecondInputColor.style.color = "black";
    secondInputColor.style.border = "2px solid black";
  } else {
    labelSecondInputColor.style.color = "white";
    secondInputColor.style.border = "2px solid white";
  }

  mainPageBackgroundGradient.style.backgroundImage = `linear-gradient(${orientation}deg, ${firstColor}, ${secondColor})`;
  valueOfLinearGradient = mainPageBackgroundGradient.style.backgroundImage;
  gradientOrientationBar.value = orientation;
  rotationSpan.textContent = `${orientation}°`;
  firstInputColor.style.backgroundColor = `${firstColor}`;
  firstInputColor.value = firstColor;
  labelFirstInputColor.textContent = `${firstColor.toUpperCase()}`;
  secondInputColor.style.backgroundColor = `${secondColor}`;
  secondInputColor.value = secondColor;
  labelSecondInputColor.textContent = `${secondColor.toUpperCase()}`;
}

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(valueOfLinearGradient);
  alert("Successfully copied the linear gradient to the clipboard!");
});

function createRandomGradient() {
  let maxRangeOfHexNumbers = 16777215;
  let randomColor1 = `#${Math.floor(
    Math.random() * maxRangeOfHexNumbers
  ).toString(16)}`;
  let randomColor2 = `#${Math.floor(
    Math.random() * maxRangeOfHexNumbers
  ).toString(16)}`;
  let randomOrientation = Math.trunc(Math.random() * 1000) % 360;

  changeMainPageBackground(randomOrientation, randomColor1, randomColor2);
}

randomButton.addEventListener("click", createRandomGradient);
