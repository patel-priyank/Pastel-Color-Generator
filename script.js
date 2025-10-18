const root = document.documentElement;
const random = document.querySelector('#random');
const undo = document.querySelector('#undo');
const hex = document.querySelector('#hex');
const copyHex = document.querySelector('#copy-hex');
const rgb = document.querySelector('#rgb');
const copyRgb = document.querySelector('#copy-rgb');

const colors = [];

let timeoutHex = 0;
let timeoutRgb = 0;

const getRandomColor = (chars = 'bcdef') => {
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
  undo.disabled = colors.length < 2;
};

const undoBg = () => {
  colors.pop();
  const newBg = colors[colors.length - 1];

  root.style.setProperty('--color', newBg);
  hex.textContent = newBg;
  rgb.textContent = hexToRgb(newBg);

  undo.disabled = colors.length < 2;
};

const copyBgHex = () => {
  const bg = getComputedStyle(root).getPropertyValue('--color');

  navigator.clipboard.writeText(bg);
  copyHex.querySelector('i').classList.replace('bi-clipboard', 'bi-clipboard-check');

  clearTimeout(timeoutHex);

  timeoutHex = setTimeout(() => {
    copyHex.querySelector('i').classList.replace('bi-clipboard-check', 'bi-clipboard');
  }, 1500);
};

const copyBgRgb = () => {
  const bg = hexToRgb(getComputedStyle(root).getPropertyValue('--color'));

  navigator.clipboard.writeText(bg);
  copyRgb.querySelector('i').classList.replace('bi-clipboard', 'bi-clipboard-check');

  clearTimeout(timeoutRgb);

  timeoutRgb = setTimeout(() => {
    copyRgb.querySelector('i').classList.replace('bi-clipboard-check', 'bi-clipboard');
  }, 1500);
};

random.addEventListener('click', setBg);
undo.addEventListener('click', undoBg);
copyHex.addEventListener('click', copyBgHex);
copyRgb.addEventListener('click', copyBgRgb);

setBg();
