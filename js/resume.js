/* js/resume.js - Circle animation on scroll */

document.addEventListener('DOMContentLoaded', function() {
  const circleElement = document.querySelector('.js-circle');
  
  if (!circleElement) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '-100px',
    threshold: 0.2
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-active');
      }
    });
  }, observerOptions);
  
  observer.observe(circleElement);
});


