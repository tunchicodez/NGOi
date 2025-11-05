/**
 * Donation Page JavaScript
 * Handles tab switching and copy-to-clipboard functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  initializeDonationTabs();
});

/**
 * Initialize donation method tabs
 */
function initializeDonationTabs() {
  const tabButtons = document.querySelectorAll('.donation-tab-btn');
  const tabPanes = document.querySelectorAll('.donation-tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      
      // Remove active class from all buttons and panes
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Add active class to clicked button and corresponding pane
      this.classList.add('active');
      const activePane = document.getElementById(tabName);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });
}

/**
 * Copy text to clipboard with visual feedback
 */
function copyToClipboard(text, button) {
  navigator.clipboard.writeText(text).then(() => {
    const originalHTML = button.innerHTML;
    const originalClass = button.className;
    
    // Change button appearance
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    button.classList.add('copied');
    
    // Revert after 2 seconds
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.className = originalClass;
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
    alert('Failed to copy to clipboard');
  });
}

/* Add CSS for copied state */
const style = document.createElement('style');
style.textContent = `
  .btn-copy.copied {
    background-color: #10b981 !important;
    border-color: #10b981 !important;
  }
`;
document.head.appendChild(style);
