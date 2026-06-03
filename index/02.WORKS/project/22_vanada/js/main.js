AOS.init();

// header 요소 선택
const header = document.querySelector('header');

// 스크롤 위치 기억하는 변수
let lastScrollY = window.scrollY;

// 스크롤 이벤트
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
        // 사용자가 아래로 내림
        if (header) header.style.top = '-100px';
    } else {
        // 사용자가 위로 올림
        if (header) header.style.top = '0';
    }
    lastScrollY = currentScrollY;
});

/* 메인 슬라이드 */
const mainSlide = new Swiper(".slide_visual", {
    spaceBetween: 8,
    effect: "fade",
    fadeEffect: { crossFade: true },
    loop: true,
    pagination: {
        el: ".main_visual .pager",
        clickable: true,
    },
    autoplay: {
        delay: 5500,
        disableOnInteraction: false,
    },
});

// 복제본 제외한 실제 슬라이드 개수 계산
const getTotal = () =>
    mainSlide.slidesEl.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length;

const infoSlide = new Swiper(".info .swiper", {
    loop: true,
    direction: "vertical",
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});

const customerSlide = new Swiper(".customer .slide_wrap", {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 30,
    speed: 9000,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
    },
    loopAdditionalSlides: 5,
    on: {
        init: function () {
            this.wrapperEl.style.transitionTimingFunction = 'linear';
        },
        slideChangeTransitionStart: function () {
            this.wrapperEl.style.transitionTimingFunction = 'linear';
        },
    },
});

const blogSlide = new Swiper(".blog .slide_wrap", {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 30,
    speed: 9000,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
    },
    loopAdditionalSlides: 5,
    on: {
        init: function () {
            this.wrapperEl.style.transitionTimingFunction = 'linear';
        },
        slideChangeTransitionStart: function () {
            this.wrapperEl.style.transitionTimingFunction = 'linear';
        },
    },
});
