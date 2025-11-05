/**
 * Common JavaScript Utilities
 * Handles forms, gallery, and shared functionality
 */

// ============================================
// FORM UTILITIES
// ============================================

/**
 * Validate form fields
 */
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;

  const fields = form.querySelectorAll('[required]');
  let isValid = true;

  fields.forEach(field => {
    if (!field.value.trim()) {
      showError(field, 'This field is required');
      isValid = false;
    } else if (field.type === 'email' && !isValidEmail(field.value)) {
      showError(field, 'Please enter a valid email address');
      isValid = false;
    } else if (field.type === 'tel' && !isValidPhone(field.value)) {
      showError(field, 'Please enter a valid phone number');
      isValid = false;
    } else {
      clearError(field);
    }
  });

  return isValid;
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate phone number format
 */
function isValidPhone(phone) {
  const re = /^[\d\s\-\+\(\)]{7,}$/;
  return re.test(phone);
}

/**
 * Show error message for a field
 */
function showError(field, message) {
  clearError(field);
  field.classList.add('error');
  field.style.borderColor = '#C62828';
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.style.cssText = 'color: #C62828; font-size: 0.875rem; margin-top: 0.25rem;';
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);
}

/**
 * Clear error message for a field
 */
function clearError(field) {
  field.classList.remove('error');
  field.style.borderColor = '';
  
  const errorDiv = field.parentNode.querySelector('.error-message');
  if (errorDiv) {
    errorDiv.remove();
  }
}

/**
 * Copy text to clipboard
 */
function copyToClipboard(text, buttonId) {
  navigator.clipboard.writeText(text).then(() => {
    const button = document.getElementById(buttonId);
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      button.style.backgroundColor = '#4CAF50';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
      }, 2000);
    }
  }).catch(err => {
    console.error('Failed to copy: ', err);
    alert('Failed to copy to clipboard');
  });
}

// ============================================
// GALLERY & LIGHTBOX
// ============================================

/**
 * Initialize gallery with lightbox functionality
 */
function initGallery() {
  const gallery = document.querySelector('.gallery-grid');
  if (!gallery) return;

  const images = gallery.querySelectorAll('img');
  if (images.length === 0) return;

  images.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      showLightbox(images, index);
    });
  });
}

/**
 * Show lightbox with image
 */
function showLightbox(images, startIndex) {
  let currentIndex = startIndex;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease-out;
  `;

  const content = document.createElement('div');
  content.className = 'lightbox-content';
  content.style.cssText = `
    position: relative;
    max-width: 90%;
    max-height: 90vh;
  `;

  const img = document.createElement('img');
  img.className = 'lightbox-image';
  img.style.cssText = `
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
  `;
  img.src = images[currentIndex].src;
  img.alt = images[currentIndex].alt;

  const caption = document.createElement('div');
  caption.className = 'lightbox-caption';
  caption.style.cssText = `
    position: absolute;
    bottom: -40px;
    left: 0;
    right: 0;
    color: white;
    text-align: center;
    padding: 10px;
    font-size: 0.95rem;
  `;
  caption.textContent = images[currentIndex].alt;

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-button';
  closeBtn.innerHTML = '×';
  closeBtn.style.cssText = `
    position: absolute;
    top: -40px;
    right: -40px;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  `;
  closeBtn.addEventListener('mouseover', () => closeBtn.style.opacity = '1');
  closeBtn.addEventListener('mouseout', () => closeBtn.style.opacity = '0.7');
  closeBtn.addEventListener('click', () => lightbox.remove());

  // Previous button
  const prevBtn = document.createElement('button');
  prevBtn.className = 'prev-button';
  prevBtn.innerHTML = '‹';
  prevBtn.style.cssText = `
    position: absolute;
    left: -60px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  `;
  prevBtn.addEventListener('mouseover', () => prevBtn.style.opacity = '1');
  prevBtn.addEventListener('mouseout', () => prevBtn.style.opacity = '0.7');
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    img.src = images[currentIndex].src;
    img.alt = images[currentIndex].alt;
    caption.textContent = images[currentIndex].alt;
  });

  // Next button
  const nextBtn = document.createElement('button');
  nextBtn.className = 'next-button';
  nextBtn.innerHTML = '›';
  nextBtn.style.cssText = `
    position: absolute;
    right: -60px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  `;
  nextBtn.addEventListener('mouseover', () => nextBtn.style.opacity = '1');
  nextBtn.addEventListener('mouseout', () => nextBtn.style.opacity = '0.7');
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    img.src = images[currentIndex].src;
    img.alt = images[currentIndex].alt;
    caption.textContent = images[currentIndex].alt;
  });

  // Assemble lightbox
  content.appendChild(img);
  content.appendChild(caption);
  lightbox.appendChild(content);
  lightbox.appendChild(closeBtn);
  lightbox.appendChild(prevBtn);
  lightbox.appendChild(nextBtn);
  document.body.appendChild(lightbox);

  // Keyboard navigation
  const handleKeydown = (e) => {
    if (e.key === 'Escape') {
      lightbox.remove();
      document.removeEventListener('keydown', handleKeydown);
    }
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  };
  document.addEventListener('keydown', handleKeydown);

  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.remove();
      document.removeEventListener('keydown', handleKeydown);
    }
  });
}

// ============================================
// SMOOTH SCROLL & ANIMATIONS
// ============================================

/**
 * Smooth scroll to element
 */
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Observe elements for fade-in animation on scroll
 */
function observeElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .section').forEach(el => {
    observer.observe(el);
  });
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all common functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
  initGallery();
  observeElements();

  // Add smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      smoothScroll(this.getAttribute('href'));
    });
  });
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
