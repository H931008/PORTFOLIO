// WORKS 섹션 Circle 애니메이션

document.addEventListener('DOMContentLoaded', function() {
  const circleElement = document.querySelector('.works-circle');
  
  if (circleElement) {
    const circleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-active');
            console.log('Works circle is active!');
            circleObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    circleObserver.observe(circleElement);
    console.log('Works circle observer initialized');
  } else {
    console.error('Works circle element not found');
  }
});

