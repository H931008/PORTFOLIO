// ABOUT 섹션: Parallax effect only
document.addEventListener("DOMContentLoaded", () => {
  const rootIllustration = document.querySelector(".js-root");

  if (rootIllustration) {
    // Parallax effect
    window.addEventListener("scroll", () => {
      const rect = rootIllustration.getBoundingClientRect();
      const center = window.innerHeight / 2;
      const offsetY = (rect.top + rect.height / 2 - center) * -0.06;
      rootIllustration.style.transform = `translateY(${offsetY}px)`;
    });
  }
});

