const root = document.documentElement;
const random = document.querySelector('#random');
const copy = document.querySelector('#copy');
const undo = document.querySelector('#undo');
const hex = document.querySelector('#hex');

const colors = [];

let timeout = 0;

const getRandomColor = (chars = 'bcdef') => {
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * chars.length)];
  }

  return color;
};

const setBg = () => {
  const newBg = getRandomColor();

  root.style.setProperty('--color', newBg);
  hex.textContent = newBg;

  colors.push(newBg);
  undo.disabled = colors.length < 2;
};

const copyBg = () => {
  const bg = getComputedStyle(root).getPropertyValue('--color');

  navigator.clipboard.writeText(bg);
  copy.querySelector('i').classList.replace('bi-clipboard', 'bi-clipboard-check');

  clearTimeout(timeout);

  timeout = setTimeout(() => {
    copy.querySelector('i').classList.replace('bi-clipboard-check', 'bi-clipboard');
  }, 1500);
};

const undoBg = () => {
  colors.pop();
  const newBg = colors[colors.length - 1];

  root.style.setProperty('--color', newBg);
  hex.textContent = newBg;

  undo.disabled = colors.length < 2;
};

random.addEventListener('click', setBg);
copy.addEventListener('click', copyBg);
undo.addEventListener('click', undoBg);

setBg();
