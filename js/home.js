document.addEventListener("DOMContentLoaded", () => {
  const heroInner = document.querySelector(".hero-inner");
  const scrollIndicator = document.querySelector(".hero-scroll-indicator");

  if (!heroInner || !scrollIndicator) return;

  // 1단계: 텍스트 페이드인
  setTimeout(() => {
    heroInner.classList.add("text-visible");
  }, 300);

  // 2단계: 씨앗 떨어지는 애니메이션 시작
  setTimeout(() => {
    heroInner.classList.add("seed-drop-active");
  }, 1300);

  // 3단계: 스크롤 인디케이터 등장
  setTimeout(() => {
    scrollIndicator.classList.add("scroll-active");
  }, 2600);
});