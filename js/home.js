document.addEventListener("DOMContentLoaded", () => {
  // Home section doesn't need special animation logic
});

// --- HOME SECTION INTERACTION (undo.co.in 스타일) ---
$(function () {
  const $home = $('#home');
  const $rose = $('.hero-central-visual .hero-rose');
  const $petals = $('.hero-central-visual .rose-petal');
  const $seed = $home.find('.home-seed');
  const $mainText = $home.find('.home-highlight__label');
  const $bottomText = $home.find('.home-highlight__text');
  const $scrollIndi = $home.find('.section-home__scroll-indicator');

  // 1. Hero→Home 스크롤: 장미 축소/꽃잎 닫힘/씨앗 변형 (IntersectionObserver or scroll)
  let roseToSeedDone = false;
  function roseToSeedTransition() {
    if (roseToSeedDone) return;
    roseToSeedDone = true;
    // 장미 축소
    $rose.css({ transition: 'transform 1.2s cubic-bezier(.7,0,.3,1)', transform: 'scale(0.4)' });
    // 꽃잎 닫힘 (역재생)
    $petals.each(function (i) {
      setTimeout(() => {
        $(this).css({ transition: 'transform 0.7s, opacity 0.7s', transform: 'scale(0.7)', opacity: 0 });
      }, i * 80);
    });
    // 씨앗 변형 (rose-center → seed)
    setTimeout(() => {
      $rose.addClass('to-seed');
      $rose.find('.rose-center').addClass('seed-appear');
    }, 700);
    // 씨앗 낙하 애니메이션 트리거
    setTimeout(seedDrop, 1200);
  }
  // 스크롤로 트리거 (Hero→Home)
  const homeSection = document.getElementById('home');
  if (homeSection) {
    const io = new window.IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) roseToSeedTransition();
      });
    }, { threshold: 0.3 });
    io.observe(homeSection);
  }

  // 2. 텍스트 페이드인 (0.5s)
  $mainText.css({ opacity: 0, transform: 'translateY(30px)' });
  setTimeout(() => {
    $mainText.animate({ opacity: 1 }, 500);
    $mainText.css({ transform: 'translateY(0)' });
  }, 500);

  // 3. 씨앗 떨어지는 애니메이션 (1s)
  function seedDrop() {
    if (!$seed.length) return;
    $seed.css({ opacity: 0, top: '-60px', left: '50%', transform: 'translateX(-50%) scale(1)' });
    $seed.show();
    $seed.animate({ opacity: 1, top: '50%' }, 900, 'easeInCubic', function () {
      // 바운스 효과
      $seed.animate({ top: 'calc(50% + 10px)' }, 180, 'easeOutCubic', function () {
        $seed.animate({ top: '50%' }, 120, 'easeInCubic');
      });
    });
    // 4. 씨앗 정착 (2s)
    setTimeout(() => {
      $seed.animate({ rotate: 5 }, 300).animate({ rotate: -5 }, 300).animate({ rotate: 0 }, 200);
      $seed.animate({ top: 'calc(50% + 5px)' }, 400);
    }, 1200);
    // 5. 하단 텍스트 페이드인 (2.5s)
    setTimeout(() => {
      $bottomText.animate({ opacity: 1 }, 500);
      $bottomText.css({ transform: 'translateY(0)' });
    }, 2500);
    // 6. 스크롤 인디케이터 (3s)
    setTimeout(() => {
      $scrollIndi.css({ opacity: 1 });
      setInterval(() => {
        $scrollIndi.animate({ opacity: 0.3 }, 400).animate({ opacity: 1 }, 400);
      }, 1200);
      setInterval(() => {
        $scrollIndi.find('.scroll-indicator__line').animate({ top: '10px' }, 400).animate({ top: '0px' }, 400);
      }, 1200);
    }, 3000);
    // 7. 씨앗 마우스 인터랙션
    $seed.on('mouseenter', function () {
      $(this).animate({ scale: 1.08 }, 200);
    }).on('mouseleave', function () {
      $(this).animate({ scale: 1 }, 200);
    }).on('click', function () {
      $(this).fadeOut(80).fadeIn(80);
    });
  }
});
// --- END HOME SECTION INTERACTION ---


