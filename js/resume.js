// 꽃잎 falling 애니메이션
document.addEventListener('DOMContentLoaded', function () {
    // 전역에 떠도는 .petal을 모두 제거 (resume 섹션 내부만 허용)
    function removeOrphanPetals() {
      document.querySelectorAll('.petal').forEach(petal => {
        const parent = petal.parentElement;
        if (!parent) return;
        if (!parent.closest('.section-resume__inner')) {
          petal.remove();
        }
      });
    }
    setInterval(removeOrphanPetals, 300);
  const petalImg = 'asset/images/resume/petal.svg'; // 꽃잎 SVG 경로 (존재해야 함)
  const PETAL_COUNT = 18;
  const $resume = document.querySelector('.section-resume');
  // resume 섹션 내부의 petal-container만 선택
  const $petalContainer = $resume ? $resume.querySelector('.petal-container') : null;
  let petalsCreated = false;
  if (!$resume || !$petalContainer) return;

  function random(min, max) { return Math.random() * (max - min) + min; }

  function createPetal() {
    const petal = document.createElement('img');
    petal.src = petalImg;
    petal.className = 'petal';
    // 랜덤 위치/회전/크기/속도
    const left = random(0, 100);
    const rot = random(-60, 60);
    const scale = random(0.7, 1.2);
    const x = random(-60, 60);
    const duration = random(2.8, 4.2);
    petal.style.left = left + '%';
    petal.style.setProperty('--petal-rot', rot + 'deg');
    petal.style.setProperty('--petal-scale', scale);
    petal.style.setProperty('--petal-x', x + 'px');
    petal.style.animationDuration = duration + 's';
    $petalContainer.appendChild(petal);
    // 관찰자: .section-resume__inner 밖으로 나가면 즉시 제거
    const resumeInner = $petalContainer.closest('.section-resume__inner');
    function checkPetalOutOfBounds() {
      if (!resumeInner || !petal.parentNode) return;
      const petalRect = petal.getBoundingClientRect();
      const containerRect = resumeInner.getBoundingClientRect();
      if (
        petalRect.bottom < containerRect.top ||
        petalRect.top > containerRect.bottom ||
        petalRect.right < containerRect.left ||
        petalRect.left > containerRect.right
      ) {
        petal.remove();
        window.removeEventListener('scroll', checkPetalOutOfBounds);
      }
    }
    window.addEventListener('scroll', checkPetalOutOfBounds);
    setTimeout(() => {
      petal.remove();
      window.removeEventListener('scroll', checkPetalOutOfBounds);
    }, duration * 1000 + 200);
  }

  function spawnPetals() {
    for (let i = 0; i < PETAL_COUNT; i++) {
      setTimeout(createPetal, i * 120 + random(0, 80));
    }
  }

  // IntersectionObserver로 resume 섹션 진입 시 트리거
  const io = new window.IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !petalsCreated) {
        petalsCreated = true;
        spawnPetals();
        setTimeout(() => { petalsCreated = false; }, 3500); // 재진입 시 재생 가능
      }
    });
  }, { threshold: 0.25 });
  io.observe($resume);
});
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


