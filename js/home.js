/* home.js - Parallax and Dynamic elements for Hero Section */

document.addEventListener('DOMContentLoaded', () => {
    const headerInfo = document.querySelector('#headerInfo');
    const headerText = document.querySelector('#headerText');
    const sidePieces = document.querySelectorAll('.header-line-side-piece');
    const writeTime = document.querySelector('#writeTime');

    // 1. Entrance Animation like jagodakondratiuk.com
    const overlay = document.getElementById('firstAnimationOverlay');
    const introLineGroups = document.querySelectorAll('.main-text-wrapper .header-line-group');

    if (headerText) headerText.style.opacity = 1;

    // Overlay animation (slides up)
    if (overlay) {
        TweenMax.to(overlay, 0.7, {
            height: "0%",
            ease: "cubic-bezier(0.28, 0.4, 0.49, 0.97)",
            delay: 0.5, // Simulate preloader delay
            onComplete: () => {
                overlay.classList.add('hide');
            }
        });
    }

    // Top menu bar sequence via CSS class like reference site
    setTimeout(() => {
        if (headerInfo) headerInfo.classList.add('activate');
    }, 750);

    // Main SVG text lines stagger up sequence
    if (introLineGroups.length > 0) {
        TweenMax.staggerFromTo(introLineGroups, 0.7, 
            { opacity: 0, y: 135 }, 
            { opacity: 1, y: 0, ease: "cubic-bezier(0.28, 0.4, 0.49, 0.97)", delay: 0.75 }, 
            0.2
        );
    }

    // Side pieces (small text details) fade in sequence
    setTimeout(() => {
        if (sidePieces.length > 0) {
            sidePieces.forEach(p => {
                TweenMax.fromTo(p, 0.3, 
                    { opacity: 0, y: 30 }, 
                    { opacity: 1, y: 0, ease: "ease" }
                );
            });
        }
    }, 1000);

    // 2. Dynamic Time
    function updateTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        
        const timeStr = `${hours}:${minutes}:${seconds} ${ampm}`;
        if (writeTime) writeTime.innerText = timeStr;
    }
    
    setInterval(updateTime, 1000);
    updateTime();

    // 3. Parallax Effect on Scroll
    const lineGroups = document.querySelectorAll('.header-line-group');
    
    // Check if we are using smooth scroll or standard scroll
    // Since the project uses fullpage.js, we might need to hook into its events.
    // However, if the user wants standard parallax, we'll listen to the window or fullpage section transitions.
    
    function applyParallax(scrollY) {
        lineGroups.forEach(group => {
            const direction = group.getAttribute('data-direction') === 'r' ? 1 : -1;
            const coef = parseFloat(group.getAttribute('data-movecoef')) || 1;
            
            // Formula from original site: direction * scrollY * (coef * 0.05)
            const moveX = direction * scrollY * (coef * 0.08); // slightly faster for feel
            
            group.style.transform = `translateX(${moveX}px)`;
        });
    }

    // Fullpage.js support
    // If fullpage is active, we track the 'onLeave' or 'scroll' events.
    // But since the parallax in Jagoda's site is based on total page scroll, 
    // and fullpage.js works page by page, we can approximate it or use the 'afterLoad' progress.
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        applyParallax(scrollY);
    });

    // Handle fullpage.js specific scrolling (if it doesn't trigger standard scroll event)
    if (window.jQuery && jQuery.fn.fullpage) {
        // We can hook into fullpage progress if needed
    }
});
