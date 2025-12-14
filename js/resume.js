document.addEventListener('DOMContentLoaded', function() {
  const skillBars = document.querySelectorAll(".skill-bar");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.getAttribute("data-level");
          const fill = bar.querySelector(".skill-bar__fill");
          if (fill && level) {
            fill.style.width = `${level}%`;
          }
          bar.classList.add("is-filled");
          skillObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 }
  );

  skillBars.forEach((bar) => skillObserver.observe(bar));
});


