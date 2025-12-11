document.addEventListener("DOMContentLoaded", () => {
// 스무스 스크롤 헬퍼
function scrollToTarget(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  const headerOffset = 72; // --header-height
  const rect = el.getBoundingClientRect();
  const offset = window.scrollY + rect.top - headerOffset + 1;

  window.scrollTo({
    top: offset,
    behavior: "smooth",
  });
}

// 헤더 내비게이션 클릭
document.querySelectorAll(".main-header__nav button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");
    if (target) scrollToTarget(target);
  });
});

// 도트 네비게이션 클릭
const dotButtons = document.querySelectorAll(".dot-nav__dot");

dotButtons.forEach((dot) => {
  dot.addEventListener("click", () => {
    const target = dot.getAttribute("data-target");
    if (target) scrollToTarget(target);
  });
});

// 섹션 in-view에 따라 도트 활성화
const sections = document.querySelectorAll(
  "#home, #about, #story, #works, #resume, #contact"
);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = "#" + entry.target.id;
        dotButtons.forEach((dot) => {
          if (dot.getAttribute("data-target") === id) {
            dot.classList.add("is-active");
          } else {
            dot.classList.remove("is-active");
          }
        });
      }
    });
  },
  {
    root: null,
    threshold: 0.45,
  }
);

sections.forEach((sec) => sectionObserver.observe(sec));

// 공통 페이드인 인터섹션 옵저버
const fadeTargets = document.querySelectorAll(".js-observe");

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

fadeTargets.forEach((el) => fadeObserver.observe(el));

// ABOUT: 뿌리 드로잉 + 패럴랙스
const rootIllustration = document.querySelector(".js-root");

if (rootIllustration) {
  const rootDrawObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          rootIllustration.classList.add("is-drawn");
          rootDrawObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  rootDrawObserver.observe(rootIllustration);

  // 간단 패럴랙스
  window.addEventListener("scroll", () => {
    const rect = rootIllustration.getBoundingClientRect();
    const center = window.innerHeight / 2;
    const offsetY = (rect.top + rect.height / 2 - center) * -0.05;
    rootIllustration.style.transform = `translateY(${offsetY}px)`;
  });
};
});
