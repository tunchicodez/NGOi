// News Page Functionality

// Filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const newsCards = document.querySelectorAll('.news-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            newsCards.forEach(card => {
                if (filterValue === 'all') {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filterValue) {
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.classList.add('hidden');
                        }, 300);
                    }
                }
            });
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert('Thank you for subscribing! We will send updates to ' + email);
            this.reset();
        });
    }

    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreNews');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> All News Loaded';
                this.disabled = true;
                this.style.opacity = '0.6';
            }, 1000);
        });
    }
});
