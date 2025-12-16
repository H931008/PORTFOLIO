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
  let slidesPerPage = () => window.innerWidth > 1700 ? 4 : window.innerWidth > 1200 ? 3 : 2;
  let maxPageCount = () => Math.max(0, Math.ceil(slideCount / slidesPerPage()) - 1);

  function goToPage(pageNumber = 0) {
    currentPage = Math.min(maxPageCount(), Math.max(0, pageNumber));
    console.log('Current page:', currentPage);
    worksSection.style.setProperty('--page', currentPage);
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

  // Drag functionality
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  let dragThreshold = 100; // 드래그로 인식할 최소 거리 (픽셀)

  slides.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    scrollLeft = currentPage;
    slides.style.cursor = 'grabbing';
    e.preventDefault();
  });

  slides.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
  });

  slides.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    slides.style.cursor = 'grab';
    
    const endX = e.pageX;
    const diffX = startX - endX;
    
    if (Math.abs(diffX) > dragThreshold) {
      if (diffX > 0) {
        // 왼쪽으로 드래그 -> 다음 페이지
        goToPage(currentPage + 1);
      } else {
        // 오른쪽으로 드래그 -> 이전 페이지
        goToPage(currentPage - 1);
      }
    }
  });

  slides.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
      slides.style.cursor = 'grab';
    }
  });

  // 초기 커서 스타일 설정
  slides.style.cursor = 'grab';

  console.log('Works slides initialized with', slideCount, 'slides');
});

