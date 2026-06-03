document.addEventListener('DOMContentLoaded', () => {
    
    /* --- Modal Logic --- */
    const overlay = document.getElementById('modal-overlay');
    const loginModal = document.getElementById('modal-login');
    const storeModal = document.getElementById('modal-store');
    const closeBtns = document.querySelectorAll('.close-modal');

    // Buttons
    const btnFindStore = document.getElementById('btn-find-store');
    const btnLogin = document.getElementById('btn-login');
    const btnMyInfo = document.getElementById('btn-myinfo');

    function openModal(modal) {
        if (!modal) return;
        overlay.classList.add('active');
        modal.classList.add('active');
    }

    function closeModal() {
        overlay.classList.remove('active');
        document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    }

    if (btnFindStore) btnFindStore.addEventListener('click', () => openModal(storeModal));
    
    // Login Button & My Info Logic
    const liMyInfo = document.getElementById('li-myinfo');

    function updateAuthUI() {
        const isLoggedIn = sessionStorage.getItem('droptop_login') === 'true';
        if (isLoggedIn) {
            if (btnLogin) {
                btnLogin.innerText = 'LOGOUT';
                // Remove old listeners to avoid stacking (simple way: clone or flag)
                // or just handle logic in one listener.
            }
            if (liMyInfo) liMyInfo.style.display = 'block'; // Show My Info
        } else {
            if (btnLogin) btnLogin.innerText = '로그인';
            if (liMyInfo) liMyInfo.style.display = 'none'; // Hide My Info
        }
    }

    // Initial Check
    updateAuthUI();

    if (btnLogin) {
        btnLogin.addEventListener('click', () => {
             if (sessionStorage.getItem('droptop_login') === 'true') {
                // Perform Logout
                sessionStorage.removeItem('droptop_login');
                alert('로그아웃 되었습니다.');
                window.location.reload();
             } else {
                // Open Login Modal
                openModal(loginModal);
             }
        });
    }

    // My Info Logic
    if (btnMyInfo) btnMyInfo.addEventListener('click', () => {
        if (sessionStorage.getItem('droptop_login') === 'true') {
            location.href = 'my_info.html';
        } else {
            // Not logged in -> Open Login Modal
            openModal(loginModal);
        }
    });

    // New Menu - Swiper Initialization
    // New Menu - Swiper Initialization
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper(".mySwiper", {
            slidesPerView: 'auto', // Allows slides to retain their CSS width (298px)
            centeredSlides: true,  // Active slide is always centered
            spaceBetween: 0,       // Spacing handled by padding or visual gaps? User image has gaps.
                                   // If 298px width and we want gaps, we should add spaceBetween or margin in CSS.
                                   // Let's use spaceBetween: 30 or 50 as previously requested/observed.
            spaceBetween: -40,     // Tightened spacing to fit 1200px visual width
            loop: true,
            speed: 800,           
            roundLengths: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            slideToClickedSlide: true, // Allow user to click side items to center them
            
            // Adjust loopAdditionalSlides if flickering occurs
            loopAdditionalSlides: 5, 
        });

        // Dessert Menu - Swiper Initialization (4 items visible)
        const dessertSwiper = new Swiper(".dessertSwiper", {
            slidesPerView: 4,
            spaceBetween: 20, /* Space between items */
            loop: true,
            speed: 800,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".dessert-next",
                prevEl: ".dessert-prev",
            },
        });

        // Notice Bar Swiper (Vertical Ticker)
        const noticeSwiper = new Swiper(".noticeSwiper", {
            direction: 'vertical',
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            speed: 600,
        });

        // Review Banner Swiper (Vertical Ticker)
        const bannerSwiper = new Swiper(".bannerSwiper", {
            direction: 'vertical',
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            speed: 600,
        });
        
        // Review Section Swiper (5 items visible)
        const reviewSwiper = new Swiper(".reviewSwiper", {
            slidesPerView: 5,
            spaceBetween: 15,
            loop: false,
            rewind: true,
            speed: 800,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
        });

    } else {
        console.error("Swiper JS not loaded!");
    }

    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
    if (overlay) overlay.addEventListener('click', closeModal);

    // Login Form Submission
    const loginForm = document.querySelector('#modal-login form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = loginForm.querySelectorAll('input');
            const uid = inputs[0].value;
            const upw = inputs[1].value;

            // Hardcoded Check
            if (uid === 'droptop' && upw === '1234') {
                alert('로그인 성공!');
                sessionStorage.setItem('droptop_login', 'true');
                closeModal();
                
                // If we were on index, reload to update button or redirect?
                // User asked for "Open My Info page" if My Info was clicked, but this is a generic login.
                // We'll just reload current page to reflect state, or check if we should redirect.
                // Simple behavior: Reload index to show "Logout".
                window.location.reload(); 
            } else {
                alert('아이디 또는 비밀번호가 일치하지 않습니다.\n(Test ID: droptop / PW: 1234)');
            }
        });
    }


    /* --- Main Banner Slider Logic --- */
    const slides = document.querySelectorAll('.main-slider .slide');
    const prevSlideBtn = document.querySelector('.prev-slide');
    const nextSlideBtn = document.querySelector('.next-slide');
    const dotsContainer = document.querySelector('.dots-container');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;

    if (totalSlides > 0) {
        // Create Dots
        for(let i=0; i<totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        const dots = document.querySelectorAll('.dot');

        function updateSlider() {
            // Update Slides
            slides.forEach(slide => slide.classList.remove('active'));
            slides[currentSlide].classList.add('active');

            // Update Dots
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
            resetInterval();
        }

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000); // 5 seconds auto play
        }

        // Listeners
        if (nextSlideBtn) nextSlideBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
        
        if (prevSlideBtn) prevSlideBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        // Start Auto Play
        resetInterval();
    }


});
