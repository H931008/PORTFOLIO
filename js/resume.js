document.addEventListener('DOMContentLoaded', function() {
  const skillItems = document.querySelectorAll(".skill-item");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const item = entry.target;
          const fill = item.querySelector(".skill-bar-fill");
          
          if (fill) {
            const level = fill.getAttribute("data-width");
            if (level) {
              fill.style.width = level;
            }
          }
          item.classList.add("is-filled");
          skillObserver.unobserve(item);
        }
      });
    },
    { threshold: 0.4 }
  );

  skillItems.forEach((item) => {
    const fill = item.querySelector(".skill-bar-fill");
    if (fill) {
      // 기존 html에 있는 style width값을 data-width로 임시 보관하고 0%로 초기화
      fill.setAttribute("data-width", fill.style.width);
      fill.style.width = "0%";
    }
    skillObserver.observe(item);
  });
});
