const sliders = (
  slideSelector,
  direction,
  prevSelector,
  nextSelector,
  startSlide = 1,
  autoSwitchTime = 3000,
) => {
  let slideIndex = startSlide - 1;
  let paused = false;
  const slides = document.querySelectorAll(slideSelector);

  function showSlides(index) {
    if (index >= slides.length) {
      slideIndex = 0;
    }

    if (index < 0) {
      slideIndex = slides.length - 1;
    }

    slides.forEach((slide) => {
      slide.classList.add('animated');
      slide.style.display = 'none';
    });

    slides[slideIndex].style.display = 'block';
  }

  showSlides(slideIndex);

  function switchSlides(step) {
    showSlides((slideIndex += step));
  }

  try {
    const prevButton = document.querySelector(prevSelector);
    const nextButton = document.querySelector(nextSelector);

    prevButton.addEventListener('click', () => {
      switchSlides(-1);
      slides[slideIndex].classList.remove('slideInRight');
      slides[slideIndex].classList.add('slideInLeft');
    });

    nextButton.addEventListener('click', () => {
      switchSlides(1);
      slides[slideIndex].classList.remove('slideInLeft');
      slides[slideIndex].classList.add('slideInRight');
    });
  } catch (error) {}

  function activateAnimation(time) {
    if (direction === 'vertical') {
      paused = setInterval(function () {
        switchSlides(1);
        slides[slideIndex].classList.add('slideInDown');
      }, time);
    } else {
      paused = setInterval(function () {
        switchSlides(1);
        slides[slideIndex].classList.add('slideInRight');
      }, time);
    }
  }
  activateAnimation(autoSwitchTime);

  slides[0].parentNode.addEventListener('mouseenter', () => {
    clearInterval(paused);
  });

  slides[0].parentNode.addEventListener('mouseleave', () => {
    activateAnimation(autoSwitchTime);
  });
};

export default sliders;
