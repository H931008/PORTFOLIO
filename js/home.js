document.addEventListener("DOMContentLoaded", () => {
  const homeSection = document.querySelector("#home");
  const parallaxTexts = document.querySelectorAll(".hero-parallax-text");
  // Target the seed directly now
  const seedElement = document.querySelector(".seed-orbit__seed");
  const tickerTape = document.querySelector(".hero-ticker-tape");

  if (!homeSection) return;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    // Section height for calculation boundaries
    const sectionHeight = homeSection.offsetHeight;
    
    // Only animate if we are roughly looking at the top part (performance)
    if (scrollY > sectionHeight * 1.5) return;

    // 1. Text Parallax - Fixed position (no movement on scroll)
    parallaxTexts.forEach((text) => {
      // Keep text fixed at their initial positions
      let initialYPercent = 0;
      if (text.classList.contains("text-layer-back")) initialYPercent = -90;
      if (text.classList.contains("text-layer-front")) initialYPercent = 20;
      
      // No movement - keep fixed
      text.style.transform = `translate(-50%, ${initialYPercent}%)`;
    });

    // 2. Seed Rotation & Scale
    // Rotate seed based on scroll
    if (seedElement) {
      const rotation = scrollY * 0.1;
      const scale = Math.max(0.8, 1 - scrollY / (sectionHeight * 2)); 
      // Apply 3D rotation directly to seed. 
      seedElement.style.transform = `rotateX(10deg) rotateY(${-10 + rotation}deg) scale(${scale})`;
    }

    // 3. Ticker Tape - Fixed position (no parallax)
    if (tickerTape) {
      // Keep ticker fixed at its position
      tickerTape.style.transform = `translate(-50%, 0) rotate(-2deg)`;
    }
  });

  // Init ticker cloning
  const tickerTrack = document.querySelector('.ticker-track');
  if(tickerTrack) {
    // Clone contents EXACTLY ONCE to make 2 sets.
    // Animation will go from 0 to -50% (which is length of 1 set).
    // Ensure 1 set is fully visible on screen? NO. 
    // We need enough content to fill the screen width.
    // If one set < screen width, we see gaps or end.
    // Let's make sure we have enough copies to fill screen at least twice.
    // Safest bet: Clone 3 times (4 sets). 
    // But animate 0 -> -25%? No that complicates CSS.
    // Standard Infinite Scroll: Container has width: fit-content (flexible). 
    // Content A + Content A
    // Animate translateX(0) -> translateX(-50%).
    // Requirement: Content A width MUST be > Viewport Width.
    // If Content A < Viewport Width, we see the jump.
    // So if strictly "seamless", we need lots of copies.
    
    // Check item count?
    // Let's just clone 5 times to be safe.
    // BUT we need CSS animation to match. 
    // If we use standard CSS animation 0 -> -50%, it implies we have 2 equal halves.
    // So we just need to double whatever we have.
    // Step 1: Clone content enough times to exceed viewport.
    // Step 2: Then DOUBLE that entire block.
    
    // Simplification: Just clone original content 10 times.
    // Then animate track... wait, CSS keyframes are hardcoded.
    // CSS says `transform: translateX(-50%)`. This assumes track width is 200% of "one loop".
    // So logic:
    // 1. Construct a "Loop Block" that is definitely wider than screen (e.g. 5 copies).
    // 2. Clear HTML.
    // 3. Insert "Loop Block" + "Loop Block".
    // 4. CSS animates 0 -> -50% of the Total Width. 
    // Since Total Width = 2 * Loop Block, -50% is exactly 1 Loop Block.
    // It snaps back to 0 (Start of 1st Loop Block), which is visually identical to Start of 2nd Loop Block.
    
    const originalContent = tickerTrack.innerHTML;
    // Make a block that is definitely long enough (e.g. 4 copies of original)
    const loopBlock = originalContent.repeat(4);
    
    // Now put 2 Loop Blocks
    tickerTrack.innerHTML = loopBlock + loopBlock;
  }
});
