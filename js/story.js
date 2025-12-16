const storySectionInner = document.querySelector(".section-story__inner");

if (storySectionInner) {
  const storyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          storySectionInner.classList.add("story-active");
          storyObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  storyObserver.observe(storySectionInner);
}

// --- STORY SECTION INTERACTION (mediaaid 스타일) ---
$(function () {
  const $story = $('#story');
  const $inner = $story.find('.section-story__inner');
  const $timeline = $story.find('.story-timeline');
  const $stem = $story.find('.story-stem');
  const $seed = $story.find('.story-seed');
  const $root = $story.find('.story-root');
  const $thorns = $story.find('.story-thorn');
  const $leaf = $story.find('.story-leaf');
  const $bud = $story.find('.story-bud');
  const $points = $story.find('.story-point');
  const $bg = $story;

  // 1. 섹션 진입: 가시→줄기, 배경색 변화 시작
  let entered = false;
  function enterStory() {
    if (entered) return;
    entered = true;
    $thorns.addClass('to-stem'); // CSS에서 줄기 변형
    // 배경색 점진적 변화 시작 (scroll에서 동기화)
  }
  // IntersectionObserver로 진입 감지
  if ($inner.length) {
    const io = new window.IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) enterStory();
      });
    }, { threshold: 0.2 });
    io.observe($inner[0]);
  }

  // 2. 타임라인 드로잉 (0.5s)
  $timeline.css({ height: 0, opacity: 0 });
  setTimeout(() => {
    $timeline.animate({ height: '100%', opacity: 1 }, 700);
    $stem.addClass('drawn');
  }, 500);

  // 3~6. 스크롤 기반 성장/일러스트/배경 동기화
  $(window).on('scroll', function () {
    if (!$story.length) return;
    const winH = window.innerHeight;
    const rect = $story[0].getBoundingClientRect();
    const scrollP = Math.min(Math.max((winH - rect.top) / (rect.height + winH), 0), 1);
    // 0~1
    // 배경색 동기화
    const dark = [26,26,46], light = [244,237,228];
    const bgColor = `rgb(${dark.map((d,i)=>Math.round(d+(light[i]-d)*scrollP)).join(',')})`;
    $bg.css('background', bgColor);
    // 성장 단계별 애니메이션
    if (scrollP < 0.2) {
      $seed.show(); $root.hide(); $stem.hide(); $thorns.hide(); $leaf.hide(); $bud.hide();
    } else if (scrollP < 0.4) {
      $seed.show(); $root.show(); $stem.hide(); $thorns.hide(); $leaf.hide(); $bud.hide();
    } else if (scrollP < 0.6) {
      $seed.hide(); $root.show(); $stem.show(); $thorns.show(); $leaf.hide(); $bud.hide();
    } else if (scrollP < 0.8) {
      $seed.hide(); $root.show(); $stem.show(); $thorns.show(); $leaf.show(); $bud.hide();
    } else {
      $seed.hide(); $root.show(); $stem.show(); $thorns.show(); $leaf.show(); $bud.show();
      $bud.css({ transform: `scale(${0.7+0.6*(scrollP-0.8)/0.2})` });
    }
    // 4. 타임라인 이벤트 등장
    $points.each(function (i) {
      const pointP = (i+1)/($points.length+1);
      if (scrollP > pointP-0.1) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  });

  // 7. 호버 인터랙션 (포인트 확대/툴팁)
  $points.on('mouseenter', function () {
    $(this).css({ transform: 'scale(1.15)' });
    $(this).find('.story-point-tooltip').fadeIn(180);
  }).on('mouseleave', function () {
    $(this).css({ transform: 'scale(1)' });
    $(this).find('.story-point-tooltip').fadeOut(120);
  });
});
// --- END STORY SECTION INTERACTION ---
