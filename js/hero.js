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
