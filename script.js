const root = document.documentElement;
const btnNew = document.querySelector('#new');
const btnUndo = document.querySelector('#undo');
const btnRedo = document.querySelector('#redo');
const hex = document.querySelector('#hex');
const rgb = document.querySelector('#rgb');

const animationClass = 'animate__pulse';

const colors = [];
const undoneColors = [];

const getRandomColor = () => {
  const chars = 'bcdef';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * chars.length)];
  }

  return color;
};

const hexToRgb = () => {
  const bg = getComputedStyle(root).getPropertyValue('--color');

  const r = parseInt(bg.slice(1, 3), 16);
  const g = parseInt(bg.slice(3, 5), 16);
  const b = parseInt(bg.slice(5, 7), 16);

  return `rgb(${r}, ${g}, ${b})`;
};

const setBg = () => {
  const newBg = getRandomColor();

  root.style.setProperty('--color', newBg);
  hex.textContent = newBg;
  rgb.textContent = hexToRgb(newBg);

  colors.push(newBg);
  btnUndo.disabled = colors.length === 1;

  undoneColors.length = 0;
  btnRedo.disabled = true;
};

const undoBg = () => {
  undoneColors.push(colors.pop());
  const newBg = colors[colors.length - 1];

  root.style.setProperty('--color', newBg);
  hex.textContent = newBg;
  rgb.textContent = hexToRgb(newBg);

  btnUndo.disabled = colors.length === 1;
  btnRedo.disabled = false;
};

const redoBg = () => {
  colors.push(undoneColors.pop());
  const newBg = colors[colors.length - 1];

  root.style.setProperty('--color', newBg);
  hex.textContent = newBg;
  rgb.textContent = hexToRgb(newBg);

  btnUndo.disabled = false;
  btnRedo.disabled = undoneColors.length === 0;
};

const copyBgHex = () => {
  const bg = getComputedStyle(root).getPropertyValue('--color');
  navigator.clipboard.writeText(bg);
  hex.classList.add(animationClass);
};

const copyBgRgb = () => {
  const bg = hexToRgb(getComputedStyle(root).getPropertyValue('--color'));
  navigator.clipboard.writeText(bg);
  rgb.classList.add(animationClass);
};

btnNew.addEventListener('click', setBg);
btnUndo.addEventListener('click', undoBg);
btnRedo.addEventListener('click', redoBg);
hex.addEventListener('click', copyBgHex);
rgb.addEventListener('click', copyBgRgb);

hex.addEventListener('animationend', () => hex.classList.remove(animationClass));
rgb.addEventListener('animationend', () => rgb.classList.remove(animationClass));

setBg();
