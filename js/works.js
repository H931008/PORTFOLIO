// WORKS 섹션 Circle 애니메이션

document.addEventListener('DOMContentLoaded', function() {
  const circleElement = document.querySelector('.works-circle');
  
  if (circleElement) {
    const circleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-active');
            console.log('Works circle is active!');
            circleObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    circleObserver.observe(circleElement);
    console.log('Works circle observer initialized');
  } else {
    console.error('Works circle element not found');
  }

  // Works Slides Logic
  let worksSection = document.querySelector('.section-works');
  let slides = document.getElementById('works-slides');
  let next = document.querySelectorAll('#works-next');
  let prev = document.querySelectorAll('#works-prev');
  
  if (!slides) {
    console.error('Works slides element not found');
    return;
  }
  
  let slideChildren = slides.children;
  let slideCount = slideChildren.length;
  let currentlyDemoing = false;
  let currentPage = 0;
  // 항상 3개만 보이도록 고정
  let slidesPerPage = () => 3;
  let slideWidth = 360;
  let slideGap = 16;
  let maxPageCount = () => Math.max(0, Math.ceil(slideCount / slidesPerPage()) - 1);

  function goToPage(pageNumber = 0) {
    currentPage = Math.min(maxPageCount(), Math.max(0, pageNumber));
    // 정확한 위치 계산: (슬라이드너비+gap)*page*3, 단 첫페이지는 0
    const offset = currentPage * ((slideWidth + slideGap) * slidesPerPage());
    slides.style.transform = `translateX(${-offset}px)`;
    worksSection.style.setProperty('--page', currentPage);
    // 첫번째 슬라이드 margin-left 0 보정
    for (let i = 0; i < slideChildren.length; i++) {
      slideChildren[i].style.marginLeft = (i % slidesPerPage() === 0) ? '0' : '';
    }
  }

  function sleep(time) {
    return new Promise(res => setTimeout(res, time));
  }

  function hoverSlide(index) {
    if (index in slideChildren) {
      slideChildren[index].classList.add('hover');
    }
  }

  function unhoverSlide(index) {
    if (index in slideChildren) {
      slideChildren[index].classList.remove('hover');
    }
  }

  // Button event listeners
  next.forEach(n => n.addEventListener('click', () => !currentlyDemoing && goToPage(currentPage + 1)));
  prev.forEach(n => n.addEventListener('click', () => !currentlyDemoing && goToPage(currentPage - 1)));


  // Drag & Touch 기능 개선
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let dragThreshold = 60;

  function setTranslate(x) {
    slides.style.transition = 'none';
    slides.style.transform = `translateX(${x}px)`;
  }

  slides.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    currentTranslate = -currentPage * (slideWidth * slidesPerPage() + slideGap * (slidesPerPage() - 1));
    slides.style.transition = 'none';
    slides.style.cursor = 'grabbing';
    e.preventDefault();
  });

  slides.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const diff = e.pageX - startX;
    setTranslate(currentTranslate + diff);
    e.preventDefault();
  });

  slides.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    slides.style.cursor = 'grab';
    slides.style.transition = '';
    const diff = e.pageX - startX;
    if (Math.abs(diff) > dragThreshold) {
      if (diff < 0 && currentPage < maxPageCount()) {
        goToPage(currentPage + 1);
      } else if (diff > 0 && currentPage > 0) {
        goToPage(currentPage - 1);
      } else {
        goToPage(currentPage);
      }
    } else {
      goToPage(currentPage);
    }
  });

  slides.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
      slides.style.cursor = 'grab';
      slides.style.transition = '';
      goToPage(currentPage);
    }
  });

  // 터치 지원
  slides.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    currentTranslate = -currentPage * (slideWidth * slidesPerPage() + slideGap * (slidesPerPage() - 1));
    slides.style.transition = 'none';
  });
  slides.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const diff = e.touches[0].pageX - startX;
    setTranslate(currentTranslate + diff);
  });
  slides.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    slides.style.transition = '';
    const diff = (e.changedTouches[0].pageX - startX);
    if (Math.abs(diff) > dragThreshold) {
      if (diff < 0 && currentPage < maxPageCount()) {
        goToPage(currentPage + 1);
      } else if (diff > 0 && currentPage > 0) {
        goToPage(currentPage - 1);
      } else {
        goToPage(currentPage);
      }
    } else {
      goToPage(currentPage);
    }
  });

  // 초기 커서 스타일 설정
  slides.style.cursor = 'grab';

  // 최초 위치
  goToPage(0);
  console.log('Works slides initialized with', slideCount, 'slides');
});

