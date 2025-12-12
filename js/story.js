const storySectionInner = document.querySelector(".section-story__inner");

if (storySectionInner) {
  const storyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          storySectionInner.classList.add("story-active");
          storyObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  storyObserver.observe(storySectionInner);
}

// position-card click handlers (story cards use same markup)
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.story-position-list .position-card');
  cards.forEach((card) => {
    const btn = card.querySelector('.position-link');
    const titleEl = card.querySelector('.position-title');
    const titleText = titleEl ? titleEl.textContent.trim() : 'Story Item';
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        alert(`${titleText} 상세로 이동합니다 (데모).`);
      });
    }
    card.addEventListener('click', () => {
      alert(`${titleText} 상세로 이동합니다 (데모).`);
    });
  });
});
