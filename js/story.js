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
