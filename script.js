const body = document.querySelector('#body');
const btnRandom = document.querySelector('#btn-random');
const btnCopy = document.querySelector('#btn-copy');
const btnUndo = document.querySelector('#btn-undo');
const bgColor = document.querySelector('#bg-color');
const bgColorTextbox = document.querySelector('#bg-color-textbox');
const github = document.querySelector('#github');

var previousColor = '';

const getRandomColorInRgb = () => {
  const hex = 'BCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * hex.length)];
  }

  return color;
};

const rgbToHex = (rgbColor) => {
  var colorValues = rgbColor
    .substring(4)
    .substring(0, rgbColor.substring(4).length - 1)
    .split(',');

  var hexColor =
    '#' +
    Number(colorValues[0]).toString(16).toUpperCase() +
    Number(colorValues[1]).toString(16).toUpperCase() +
    Number(colorValues[2]).toString(16).toUpperCase();

  return hexColor;
};

const setBackground = () => {
  previousColor = body.style.background;
  btnUndo.disabled = false;

  body.style.background = getRandomColorInRgb();
  bgColor.textContent = rgbToHex(body.style.background);
};

const copyBackground = () => {
  bgColorTextbox.value = rgbToHex(body.style.background);
  bgColorTextbox.select();
  document.execCommand('copy');
  bgColorTextbox.value = '';
  bgColorTextbox.blur();

  btnCopy.innerHTML = 'Copied!';

  btnCopy.style.background = 'springgreen';
  btnCopy.style.color = 'black';

  setTimeout(() => {
    btnCopy.innerHTML = 'Copy';
    btnCopy.style.background = '';
    btnCopy.style.color = '';
  }, 1000);
};

const browseCode = () => {
  window.open('https://github.com/patel-priyank/Pastel-Color-Generator');
};

const setPreviousBackground = () => {
  body.style.background = previousColor;
  bgColor.textContent = rgbToHex(body.style.background);

  previousColor = '';
  btnUndo.disabled = true;
};

btnRandom.addEventListener('click', setBackground);
btnCopy.addEventListener('click', copyBackground);
btnUndo.addEventListener('click', setPreviousBackground);
github.addEventListener('click', browseCode);

bgColorTextbox.addEventListener('keydown', (event) => {
  event.preventDefault();
});

body.style.background = getRandomColorInRgb();
bgColor.textContent = rgbToHex(body.style.background);
