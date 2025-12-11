// CONTACT: 폼 제출 시 씨앗 애니메이션 + 상태 메세지
const contactForm = document.getElementById("contactForm");
const contactStatus = document.querySelector(".contact-form__status");
const contactSeed = document.querySelector(".contact-seed");

if (contactForm && contactSeed) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // 간단한 상태 메시지
    if (contactStatus) {
      contactStatus.textContent = "씨앗이 정원으로 전해졌습니다. 감사합니다.";
    }

    // 씨앗 애니메이션
    contactSeed.classList.remove("is-active");
    // 리플레이를 위해 reflow
    void contactSeed.offsetWidth;
    contactSeed.classList.add("is-active");

    // 실제 사용 시에는 여기에서 이메일 전송 로직 or API 호출 추가
  });
}
