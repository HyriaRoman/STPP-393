document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('[data-carousel-track]');
  const slides = document.querySelectorAll('[data-carousel-slide]');
  const dotsContainer = document.querySelector('[data-carousel-dots]');

  if (!track || !dotsContainer || slides.length === 0) return;

  const MOBILE_BREAKPOINT = 1440;
  const GAP = 16;
  const SWIPE_THRESHOLD = 50;

  let currentIndex = 0;

  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let isDragging = false;

  slides.forEach((_, index) => {
    const dot = document.createElement('button');

    dot.type = 'button';
    dot.dataset.carouselDot = '';
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);

    if (index === 0) {
      dot.dataset.active = '';
    }

    dot.addEventListener('click', () => {
      goToSlide(index);
    });

    dotsContainer.append(dot);
  });

  const dots = dotsContainer.querySelectorAll('[data-carousel-dot]');

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.toggleAttribute('data-active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    if (window.innerWidth >= MOBILE_BREAKPOINT) {
      track.style.transform = '';
      return;
    }

    currentIndex = index;

    const slideWidth = slides[0].offsetWidth;

    currentTranslate = -(slideWidth + GAP) * currentIndex;
    prevTranslate = currentTranslate;

    track.style.transform = `translateX(${currentTranslate}px)`;

    updateDots();
  }

  track.addEventListener('touchstart', e => {
    if (window.innerWidth >= MOBILE_BREAKPOINT) return;

    startX = e.touches[0].clientX;
    isDragging = true;

    track.style.transition = 'none';
  });

  track.addEventListener('touchmove', e => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    track.style.transform = `translateX(${prevTranslate + diff}px)`;
  });

  track.addEventListener('touchend', e => {
    if (!isDragging) return;

    isDragging = false;

    track.style.transition = 'transform 200ms ease-in-out';

    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff < 0 && currentIndex < slides.length - 1) {
        currentIndex++;
      }

      if (diff > 0 && currentIndex > 0) {
        currentIndex--;
      }
    }

    goToSlide(currentIndex);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= MOBILE_BREAKPOINT) {
      track.style.transform = '';
      return;
    }

    goToSlide(currentIndex);
  });

  goToSlide(0);
});
