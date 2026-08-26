document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.nav-slider');
  const links = document.querySelectorAll('.nav-link');
  const gap = parseFloat(getComputedStyle(slider.parentElement).getPropertyValue('--gap')) || 6;
  const pages = document.querySelectorAll('[data-page-content]');

  const moveSlider = (link) => {
    slider.style.width = link.offsetWidth + 'px';
    slider.style.transform = `translateX(${link.offsetLeft - gap}px)`;
  };

  function showPage(name) {
    const page = ['about', 'projects', 'contact'].includes(name) ? name : 'about';
    pages.forEach((section) => { section.hidden = section.dataset.pageContent !== page; });
    links.forEach((link) => link.classList.toggle('active', link.dataset.page === page));
    moveSlider(document.querySelector('.nav-link.active'));
  }

  showPage('about');
  links.forEach((link) => link.addEventListener('click', () => showPage(link.dataset.page)));
});
