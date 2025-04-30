const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

const imagens = [
  'pic1.jpg',
  'pic2.jpg',
  'pic3.jpg',
  'pic4.jpg',
  'pic5.jpg',
  'pic6.jpg'
];
const altText = [
  'essa á galeria dos imortais do Mengudo (rsrs)',
];

for (let i = 0; i < imagens.length; i++) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/${imagens[i]}`);
  newImage.setAttribute('alt', altText[i]);
  thumbBar.appendChild(newImage);

  newImage.addEventListener('click', () => {
    displayedImage.setAttribute('src', `images/${imagens[i]}`);
    displayedImage.setAttribute('alt', altText[i]);
  });
}

btn.addEventListener('click', () => {
  const className = btn.getAttribute('class');
  if (className === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  }
});
