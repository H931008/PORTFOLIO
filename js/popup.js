//YES 팝업 띄우기
function openPop() {
    document.getElementById("popup_layer").style.display = "block";
    document.body.style.overflow = "hidden"; // 스크롤 막기
}

//YES 팝업 닫기
function closePop() {
    document.getElementById("popup_layer").style.display = "none";
    document.body.style.overflow = "auto"; // 스크롤 복원 (명시적으로 auto 설정)
}

//NO 팝업 띄우기
function openNoPop() {
    document.getElementById("no_popup_layer").style.display = "block";
    document.body.style.overflow = "hidden"; // 스크롤 막기
}

//NO 팝업 닫기
function closeNoPop() {
    document.getElementById("no_popup_layer").style.display = "none";
    document.body.style.overflow = "auto"; // 스크롤 복원 (명시적으로 auto 설정)
}

// 팝업 배경 클릭 시 닫기 기능 추가
document.addEventListener('DOMContentLoaded', function() {
    // YES 팝업 배경 클릭 시 닫기
    var yesPopupLayer = document.getElementById("popup_layer");
    if (yesPopupLayer) {
        yesPopupLayer.addEventListener('click', function(e) {
            // 팝업 레이어 자체를 클릭했을 때만 닫기 (popup_box 내부 클릭은 제외)
            if (e.target === yesPopupLayer) {
                closePop();
            }
        });
    }

    // NO 팝업 배경 클릭 시 닫기
    var noPopupLayer = document.getElementById("no_popup_layer");
    if (noPopupLayer) {
        noPopupLayer.addEventListener('click', function(e) {
            // 팝업 레이어 자체를 클릭했을 때만 닫기 (popup_box 내부 클릭은 제외)
            if (e.target === noPopupLayer) {
                closeNoPop();
            }
        });
    }
});
