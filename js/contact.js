// CONTACT: Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    // Observe contact section elements
    document.querySelectorAll('.section-contact .js-observe').forEach(el => {
        observer.observe(el);
    });
});

// CONTACT: 폼 제출 시 씨앗 애니메이션 + 상태 메세지
const contactForm = document.getElementById("contactForm");
const contactStatus = document.querySelector(".contact-form__status");
const contactSeed = document.querySelector(".contact-seed");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.btn-submit-seed');
    const seedIcon = submitBtn.querySelector('.seed-icon');
    
    // Trigger seed animation
    if (seedIcon) {
        seedIcon.style.animation = 'seed-plant 0.6s ease forwards';
        
        setTimeout(() => {
            seedIcon.style.animation = '';
        }, 600);
    }

    // 간단한 상태 메시지
    if (contactStatus) {
      contactStatus.textContent = "씨앗이 정원으로 전해졌습니다. 감사합니다.";
    }

    // 씨앗 애니메이션
    if (contactSeed) {
        contactSeed.classList.remove("is-active");
        // 리플레이를 위해 reflow
        void contactSeed.offsetWidth;
        contactSeed.classList.add("is-active");
    }

    // 실제 사용 시에는 여기에서 이메일 전송 로직 or API 호출 추가
    setTimeout(() => {
        alert('Message sent! 🌱 Thank you!');
        contactForm.reset();
    }, 600);
  });
}
