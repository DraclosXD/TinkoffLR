const button = document.getElementById('buttonMore');
const sectionSix = document.getElementById('section-sixth');
button.addEventListener('click', () =>
  sectionSix.scrollIntoView({behavior: 'smooth'})
);
