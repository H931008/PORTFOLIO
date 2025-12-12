// WORKS 섹션 애니메이션

document.addEventListener("DOMContentLoaded", () => {
  const workCards = document.querySelectorAll(".work-card");

  // 카드 호버 시 꽃 만개 + 확대 애니메이션
  workCards.forEach((card) => {
    card.addEventListener("mouseenter", function() {
      const lotusCore = this.querySelector(".lotus-core");
      if (lotusCore) {
        lotusCore.style.transform = "scale(1)";
        lotusCore.style.boxShadow = "0 0 32px rgba(212, 175, 55, 0.6), 0 0 8px rgba(212, 175, 55, 0.3)";
      }
    });

    card.addEventListener("mouseleave", function() {
      const lotusCore = this.querySelector(".lotus-core");
      if (lotusCore) {
        lotusCore.style.transform = "scale(0.7)";
        lotusCore.style.boxShadow = "0 0 18px rgba(212, 175, 55, 0.3)";
      }
    });
  });
});

