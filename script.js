const body = document.querySelector('#body');
const btnRandom = document.querySelector('#btn-random');
const btnCopy = document.querySelector('#btn-copy');
const bgColor = document.querySelector('#bg-color');
const bgColorTextbox = document.querySelector('#bg-color-textbox');
const github = document.querySelector('#github');

const getRandomColor = () => {
  const hex = 'BCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * hex.length)];
  }

  return color;
};

const rgbToHex = () => {
  var colorValues = body.style.background
    .substring(4)
    .substring(0, body.style.background.substring(4).length - 1)
    .split(',');

  var hexColor =
    '#' +
    Number(colorValues[0]).toString(16).toUpperCase() +
    Number(colorValues[1]).toString(16).toUpperCase() +
    Number(colorValues[2]).toString(16).toUpperCase();

  return hexColor;
};

const setBackground = () => {
  body.style.background = getRandomColor();
  bgColor.textContent = rgbToHex();
};

const copyBackground = () => {
  bgColorTextbox.value = rgbToHex();
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

btnRandom.addEventListener('click', setBackground);
btnCopy.addEventListener('click', copyBackground);

github.addEventListener('click', () => {
  window.open('https://github.com/patel-priyank/Pastel-Color-Generator');
});

bgColorTextbox.addEventListener('keydown', (event) => {
  event.preventDefault();
});

setBackground();
