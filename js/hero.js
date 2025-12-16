document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.querySelector("#hero");
  const aboutSection = document.querySelector("#about");
  const parallaxTexts = document.querySelectorAll(".hero-parallax-text");
  // Target the rose directly now
  const roseElement = document.querySelector(".hero-rose");
  const tickerTape = document.querySelector(".hero-ticker-tape");

  const rootStyles = getComputedStyle(document.documentElement);
  const baseRoseColor = roseElement ? getComputedStyle(roseElement).backgroundColor : "rgb(139, 38, 53)";
  const fallbackAboutColor = rootStyles.getPropertyValue("--color-cream").trim() || "#F4EDE4";

  const aboutBgResolved = (() => {
    if (!aboutSection) return fallbackAboutColor;
    const bg = getComputedStyle(aboutSection).backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return bg;
    return fallbackAboutColor;
  })();

  let seedCoverScale = 8;

  function parseColor(str) {
    if (!str) return { r: 0, g: 0, b: 0 };
    // rgb or rgba
    const rgbMatch = str.match(/rgba?\(([^)]+)\)/i);
    if (rgbMatch) {
      const [r, g, b] = rgbMatch[1].split(',').map(v => parseFloat(v));
      return { r, g, b };
    }
    // hex
    const hex = str.replace('#', '').trim();
    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      return { r, g, b };
    }
    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return { r, g, b };
    }
    return { r: 0, g: 0, b: 0 };
  }

  const seedBaseRGB = parseColor(baseRoseColor);
  const aboutRGB = parseColor(aboutBgResolved);

  function lerp(a, b, t) { return a + (b - a) * t; }
  function lerpColor(c1, c2, t) {
    const r = Math.round(lerp(c1.r, c2.r, t));
    const g = Math.round(lerp(c1.g, c2.g, t));
    const b = Math.round(lerp(c1.b, c2.b, t));
    return `rgb(${r}, ${g}, ${b})`;
  }

  function computeCoverScale() {
    if (!roseElement) return;
    const rect = roseElement.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const scaleX = (window.innerWidth * 1.1) / rect.width;
    const scaleY = (window.innerHeight * 1.2) / rect.height;
    seedCoverScale = Math.max(scaleX, scaleY);
    roseElement.style.setProperty('--seed-fill-scale', seedCoverScale.toFixed(3));
  }

  computeCoverScale();
  window.addEventListener('resize', computeCoverScale);

  if (!heroSection) return;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    // Section height for calculation boundaries
    const sectionHeight = heroSection.offsetHeight;
    
    // Only animate if we are roughly looking at the top part (performance)
    if (scrollY > sectionHeight * 1.5) return;

    // 1. Text Parallax - Fixed position (no movement on scroll)
    parallaxTexts.forEach((text) => {
      let initialYPercent = 0;
      if (text.classList.contains("text-layer-back")) initialYPercent = -90;
      if (text.classList.contains("text-layer-front")) initialYPercent = 20;
      text.style.transform = `translate(-50%, ${initialYPercent}%)`;
    });

    // 2. Rose Rotation & Scroll-to-fill transition
    if (roseElement) {
      const rotation = scrollY * 0.1;
      const baseScale = Math.max(0.8, 1 - scrollY / (sectionHeight * 2));

      const zoomStart = aboutSection
        ? aboutSection.offsetTop - window.innerHeight * 0.65
        : sectionHeight * 0.6;
      const zoomEnd = aboutSection
        ? aboutSection.offsetTop - window.innerHeight * 0.25
        : sectionHeight * 1.1;

      let tZoom = (scrollY - zoomStart) / (zoomEnd - zoomStart);
      tZoom = Math.min(Math.max(tZoom, 0), 1);

      if (tZoom > 0) {
        roseElement.classList.add('seed-is-filling');
        roseElement.style.position = 'fixed';
        roseElement.style.top = '50%';
        roseElement.style.left = '50%';
        const scale = lerp(1, seedCoverScale, tZoom);
        roseElement.style.transform = `translate(-50%, -50%) scale(${scale})`;
        // Update rose petals and center color
        const petals = roseElement.querySelectorAll('.rose-petal, .rose-center');
        const newColor = lerpColor(seedBaseRGB, aboutRGB, tZoom);
        petals.forEach(petal => {
          petal.style.backgroundColor = newColor;
        });
        roseElement.style.boxShadow = '0 0 0 rgba(0,0,0,0.12)';
      } else {
        roseElement.classList.remove('seed-is-filling');
        roseElement.style.position = '';
        roseElement.style.top = '';
        roseElement.style.left = '';
        // Reset rose petals to wine color
        const petals = roseElement.querySelectorAll('.rose-petal, .rose-center');
        petals.forEach(petal => {
          if (petal.classList.contains('rose-petal--inner')) {
            petal.style.backgroundColor = '';
            petal.style.opacity = '';
          } else {
            petal.style.backgroundColor = '';
          }
        });
        roseElement.style.boxShadow = '';
        roseElement.style.transform = `rotateX(10deg) rotateY(${-10 + rotation}deg) scale(${baseScale})`;
      }
    }

    // 3. Ticker Tape - Fixed position (no parallax)
    if (tickerTape) {
      tickerTape.style.transform = `translate(-50%, 0) rotate(-2deg)`;
    }
  });

  // Init ticker cloning
  const tickerTrack = document.querySelector('.ticker-track');
  if(tickerTrack) {
    const originalContent = tickerTrack.innerHTML;
    // Make a block that is definitely long enough (e.g. 4 copies of original)
    const loopBlock = originalContent.repeat(4);
    
    // Now put 2 Loop Blocks
    tickerTrack.innerHTML = loopBlock + loopBlock;
  }
});

// --- HERO SECTION INTERACTION (텍스트 transform 건드리지 않고 opacity만 animate, 클래스 기반 트리거) ---
$(function () {
  const $hero = $('#hero');
  const $mainText = $hero.find('.text-layer-back');
  const $subText = $hero.find('.text-layer-front');
  const $scrollIndi = $hero.find('.section-home__scroll-indicator');
  const $rose = $hero.find('.hero-central-visual .hero-rose');
  const $petals = $hero.find('.rose-petal');
  const $roseCenter = $hero.find('.rose-center');
  const $roseLight = $hero.find('.rose-center-light');

  // 무조건 스크롤 맨 위로 이동 (브라우저 렌더 직후)
  window.scrollTo(0, 0);
  setTimeout(() => {
    // 텍스트/장미/인디케이터 모두 opacity 0, active 클래스 제거
    $mainText.removeClass('active').css({ opacity: 0 });
    $subText.removeClass('active').css({ opacity: 0 });
    $scrollIndi.removeClass('active').css({ opacity: 0 });
    $rose.removeClass('active');
    $petals.removeClass('active');
    if ($roseLight.length) $roseLight.removeClass('active');

    // 2. 메인 텍스트 페이드인 (0.5s)
    setTimeout(() => {
      $mainText.animate({ opacity: 1 }, 500, function() {
        $mainText.addClass('active');
      });
    }, 500);

    // 3. 장미 등장 (1.5s)
    if ($rose.length) {
      setTimeout(() => {
        $rose.addClass('active');
      }, 1500);
    }

    // 4. 장미 만개 (2.5s) - 꽃잎 순차, 빛 퍼짐
    if ($petals.length) {
      setTimeout(() => {
        $petals.each(function (i) {
          setTimeout(() => {
            $(this).addClass('active');
          }, i * 120);
        });
        if ($roseLight.length) {
          setTimeout(() => $roseLight.addClass('active'), 900);
        }
      }, 2500);
    }

    // 5. 서브 텍스트 페이드인 (3.5s)
    setTimeout(() => {
      $subText.animate({ opacity: 1 }, 600, function() {
        $subText.addClass('active');
      });
    }, 3500);

    // 6. 스크롤 인디케이터 (4s~) - opacity만 깜빡임(원래대로)
    setTimeout(() => {
      if ($scrollIndi.length) {
        $scrollIndi.animate({ opacity: 1 }, 400, function() {
          $scrollIndi.addClass('active');
        });
        // 깜빡임 효과 제거: setInterval 없음
      }
    }, 4000);
  }, 1); // 렌더 직후 1프레임 뒤에 실행
});
// --- END HERO SECTION INTERACTION ---
