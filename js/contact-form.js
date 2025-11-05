/**
 * Contact Form JavaScript
 * Handles form validation and submission
 */

document.addEventListener('DOMContentLoaded', function() {
  initializeContactForm();
  initializeInvolvementForm();
});

/**
 * Initialize contact form on Contact page
 */
function initializeContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateContactForm()) {
      submitContactForm(form);
    }
  });

  // Clear errors on input
  const inputs = form.querySelectorAll('.form-input');
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      clearFieldError(this);
    });
  });
}

/**
 * Initialize involvement form on Get Involved page
 */
function initializeInvolvementForm() {
  const form = document.getElementById('involvement-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateInvolvementForm()) {
      submitInvolvementForm(form);
    }
  });

  // Clear errors on input
  const inputs = form.querySelectorAll('.form-input');
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      clearFieldError(this);
    });
  });
}

/**
 * Validate contact form
 */
function validateContactForm() {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');
  
  let isValid = true;

  // Validate name
  if (!name.value.trim()) {
    showFieldError(name, 'Name is required');
    isValid = false;
  }

  // Validate email
  if (!email.value.trim()) {
    showFieldError(email, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    showFieldError(email, 'Please enter a valid email address');
    isValid = false;
  }

  // Validate subject
  if (!subject.value) {
    showFieldError(subject, 'Please select a subject');
    isValid = false;
  }

  // Validate message
  if (!message.value.trim()) {
    showFieldError(message, 'Message is required');
    isValid = false;
  }

  return isValid;
}

/**
 * Validate involvement form
 */
function validateInvolvementForm() {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const involvementType = document.getElementById('involvement-type');
  const message = document.getElementById('message');
  
  let isValid = true;

  // Validate name
  if (!name.value.trim()) {
    showFieldError(name, 'Name is required');
    isValid = false;
  }

  // Validate email
  if (!email.value.trim()) {
    showFieldError(email, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    showFieldError(email, 'Please enter a valid email address');
    isValid = false;
  }

  // Validate involvement type
  if (!involvementType.value) {
    showFieldError(involvementType, 'Please select how you\'d like to get involved');
    isValid = false;
  }

  // Validate message
  if (!message.value.trim()) {
    showFieldError(message, 'Please tell us more about your interest');
    isValid = false;
  }

  return isValid;
}

/**
 * Submit contact form
 */
function submitContactForm(form) {
  const messageDiv = document.getElementById('form-message');
  
  // Show success message
  messageDiv.className = 'form-message success';
  messageDiv.innerHTML = '<strong>Success!</strong> Thank you for your message. We will get back to you soon.';
  messageDiv.style.display = 'block';

  // Reset form
  form.reset();

  // Scroll to message
  messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Hide message after 5 seconds
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 5000);
}

/**
 * Submit involvement form
 */
function submitInvolvementForm(form) {
  const messageDiv = document.getElementById('form-message');
  
  // Show success message
  messageDiv.className = 'form-message success';
  messageDiv.innerHTML = '<strong>Success!</strong> Thank you for your interest. We will contact you soon to discuss opportunities.';
  messageDiv.style.display = 'block';

  // Reset form
  form.reset();

  // Scroll to message
  messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Hide message after 5 seconds
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 5000);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Show field error
 */
function showFieldError(field, message) {
  clearFieldError(field);
  field.classList.add('input-error');
  
  const errorSpan = field.parentElement.querySelector('.form-error');
  if (errorSpan) {
    errorSpan.textContent = message;
  }
}

/**
 * Clear field error
 */
function clearFieldError(field) {
  field.classList.remove('input-error');
  
  const errorSpan = field.parentElement.querySelector('.form-error');
  if (errorSpan) {
    errorSpan.textContent = '';
  }
}
