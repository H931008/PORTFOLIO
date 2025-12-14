// WORKS 섹션 Circle 애니메이션

document.addEventListener('DOMContentLoaded', function() {
  const circleElement = document.querySelector('.works-circle');
  
  if (circleElement) {
    const circleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-active');
            circleObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    
    circleObserver.observe(circleElement);
  }
});

