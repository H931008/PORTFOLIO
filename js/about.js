// --- ABOUT SECTION INTERACTION (undo.co.in 스타일) ---
$(function () {
  const $about = $('#about');
  const $seed = $('.home-seed');
  const $thorns = $about.find('.about-thorn');
  const $thornTips = $about.find('.about-thorn-tip');
  const $profile = $about.find('.about-profile');
  const $profileImg = $about.find('.about-profile__img');
  const $texts = $about.find('.about-name, .about-role, .about-desc, .about-values');
  const $valueIcons = $about.find('.about-value-icon');

  // 1. 섹션 진입: 씨앗 사라짐
  let seedGone = false;
  function seedDisappear() {
    if (seedGone) return;
    seedGone = true;
    $seed.animate({ opacity: 0, top: '+=100px' }, 700, 'easeInCubic');
  }
  // 스크롤로 트리거 (About)
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    const io = new window.IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) seedDisappear();
      });
    }, { threshold: 0.3 });
    io.observe(aboutSection);
  }

  // 2. 가시 덤불 등장 (0.5s~)
  $thorns.css({ opacity: 0, pathLength: 0 });
  setTimeout(() => {
    $thorns.each(function (i) {
      setTimeout(() => {
        $(this).animate({ opacity: 1 }, 200);
        // SVG path 애니메이션 (GSAP 추천)
        if (window.gsap) {
          gsap.to(this, { duration: 0.7, strokeDashoffset: 0, delay: 0.1 * i });
        }
      }, i * 100);
    });
  }, 500);

  // 3. 가시 끝 강조 (1.5s~)
  setTimeout(() => {
    $thornTips.each(function (i) {
      setTimeout(() => {
        $(this).css({ background: '#8B2635' });
        // 펄스 효과
        $(this).animate({ scale: 1.2, opacity: 1 }, 200).animate({ scale: 1, opacity: 1 }, 200);
      }, i * 80);
    });
  }, 1500);

  // 4. 프로필 페이드인 (2s~)
  $profile.css({ opacity: 0, 'clip-path': 'circle(0% at 50% 50%)' });
  setTimeout(() => {
    $profile.animate({ opacity: 1 }, 500);
    $profile.css({ 'clip-path': 'circle(60% at 50% 50%)' });
  }, 2000);

  // 5. 텍스트 순차 등장 (2.5s~)
  $texts.css({ opacity: 0, transform: 'translateY(30px)' });
  setTimeout(() => {
    $texts.each(function (i) {
      setTimeout(() => {
        $(this).animate({ opacity: 1 }, 350);
        $(this).css({ transform: 'translateY(0)' });
      }, i * 200);
    });
  }, 2500);

  // 6. 스크롤 패럴랙스 (가시, 프로필)
  $(window).on('scroll', function () {
    const scrollY = window.scrollY;
    $thorns.css('transform', `translateY(${-scrollY * 0.08}px)`);
    $profile.css('transform', `translateY(${-scrollY * 0.04}px)`);
  });

  // 7. 호버 인터랙션
  $valueIcons.on('mouseenter', function () {
    $(this).css({ color: '#8B2635' });
  }).on('mouseleave', function () {
    $(this).css({ color: '' });
  });
  $thorns.on('mouseenter', function () {
    $(this).animate({ rotate: 7 }, 120).animate({ rotate: -7 }, 120).animate({ rotate: 0 }, 120);
  });
});
// --- END ABOUT SECTION INTERACTION ---

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

