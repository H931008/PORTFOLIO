// contact section staged reveal & interaction
$(function () {
	// 순차 등장 (staged reveal)
	function stagedReveal() {
		var $anims = $('.section-contact .contact-anim');
		var $rose = $('.section-contact .rose-main');
		var $leafs = $('.section-contact .leaf');
		var $butterfly = $('.section-contact .butterfly');
		setTimeout(function () { $rose.addClass('active'); }, 200);
		setTimeout(function () { $leafs.eq(0).addClass('active'); }, 600);
		setTimeout(function () { $leafs.eq(1).addClass('active'); }, 900);
		setTimeout(function () { $butterfly.addClass('active'); }, 1200);
		$anims.each(function (i) {
			setTimeout(() => $(this).addClass('active'), 1400 + i * 200);
		});
	}

	// 뷰포트 진입 시 reveal (IntersectionObserver)
	function observeContactSection() {
		var $section = $('.section-contact');
		if (!$section.length) return;
		var revealed = false;
		var io = new window.IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting && !revealed) {
					revealed = true;
					stagedReveal();
				}
			});
		}, { threshold: 0.3 });
		io.observe($section[0]);
	}

	// 마우스 패럴랙스 효과
	function contactParallax() {
		var $roseGroup = $('.section-contact .rose-group');
		var $butterfly = $('.section-contact .butterfly');
		var $leafs = $('.section-contact .leaf');
		if (!$roseGroup.length) return;
		$('.section-contact').on('mousemove', function (e) {
			var w = $(this).width(), h = $(this).height();
			var x = (e.offsetX - w / 2) / w, y = (e.offsetY - h / 2) / h;
			// roseGroup
			$roseGroup.css('transform', `translate(-50%, -55%) scale(1) rotate(${x * 8}deg)`);
			// butterfly
			$butterfly.css('transform', `translate(-50%, 0) scale(1.08) rotate(${y * 18 - 10}deg)`);
			// leafs
			$leafs.eq(0).css('transform', `rotate(${-20 + y * 18}deg) scale(1)`);
			$leafs.eq(1).css('transform', `rotate(${30 + x * 18}deg) scale(1)`);
		});
		$('.section-contact').on('mouseleave', function () {
			$roseGroup.css('transform', 'translate(-50%, -55%) scale(1) rotate(0deg)');
			$butterfly.css('transform', 'scale(1) rotate(-10deg)');
			$leafs.eq(0).css('transform', 'rotate(-20deg) scale(1)');
			$leafs.eq(1).css('transform', 'rotate(30deg) scale(1)');
		});
	}

	// 폼 전송 인터랙션 (AJAX X, 기본 애니메이션)
	function contactFormHandler() {
		$('.contact-form').on('submit', function (e) {
			e.preventDefault();
			var $btn = $(this).find('.contact-send-btn');
			$btn.prop('disabled', true).text('SENDING...');
			setTimeout(function () {
				$btn.text('SENT!').addClass('sent');
				setTimeout(function () {
					$btn.prop('disabled', false).text('SEND').removeClass('sent');
					$('.contact-form')[0].reset();
				}, 1800);
			}, 1200);
		});
	}

	// 초기화
	observeContactSection();
	contactParallax();
	contactFormHandler();
});
