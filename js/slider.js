/**
 * Professional Image Slider
 * Annor Yeboah Care Foundation
 */

document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider-wrapper');
  if (!slider) return;

  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const indicators = document.querySelectorAll('.indicator');
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoPlayInterval;

  // Show specific slide
  function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentSlide = index;
  }

  // Next slide
  function nextSlide() {
    let next = currentSlide + 1;
    if (next >= totalSlides) {
      next = 0;
    }
    showSlide(next);
  }

  // Previous slide
  function prevSlide() {
    let prev = currentSlide - 1;
    if (prev < 0) {
      prev = totalSlides - 1;
    }
    showSlide(prev);
  }

  // Auto play
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    });
  }

  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function() {
      stopAutoPlay();
      showSlide(index);
      startAutoPlay();
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    } else if (e.key === 'ArrowRight') {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    }
  });

  // Pause on hover
  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);
  }

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    });

    sliderContainer.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Swipe left
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    }
    if (touchEndX > touchStartX + 50) {
      // Swipe right
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    }
  }

  // Start auto play
  startAutoPlay();

  // Initialize first slide
  showSlide(0);
});
