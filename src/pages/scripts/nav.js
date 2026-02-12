document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.nav-slider');
  const links = document.querySelectorAll('.nav-link');

  const moveSlider = (link) => {
    slider.style.width = link.offsetWidth + 'px';
    slider.style.transform = `translateX(${link.offsetLeft - 4}px)`;
  };

  moveSlider(document.querySelector('.nav-link.active'));

  links.forEach((link) => {
    link.addEventListener('click', () => {
      links.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
      moveSlider(link);
    });
  });
});
