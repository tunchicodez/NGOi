// Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 10);
                } else {
                    const category = item.getAttribute('data-category');
                    if (category === filterValue) {
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.classList.add('hidden');
                        }, 300);
                    }
                }
            });
        });
    });
});

// Lightbox Functionality
let currentImageIndex = 0;
const images = [
    {
        src: 'images/WhatsApp Image 2025-10-27 at 11.37.06.jpeg',
        caption: 'iCare Educational Fund - Supporting students with scholarships'
    },
    {
        src: 'images/WhatsApp Image 2025-10-27 at 11.37.06 (1).jpeg',
        caption: 'Classroom Support - Providing quality education resources'
    },
    {
        src: 'images/Mr.Annor Yeboah.jpg',
        caption: 'Skills Development - Empowering through vocational training'
    },
    {
        src: 'images/logo.jpeg',
        caption: 'Workshop Training - Hands-on skills development'
    },
    {
        src: 'images/WhatsApp Image 2025-10-27 at 11.37.06.jpeg',
        caption: 'Community Engagement - Building stronger communities'
    },
    {
        src: 'images/WhatsApp Image 2025-10-27 at 11.37.06 (1).jpeg',
        caption: 'Support Programs - Helping families in need'
    },
    {
        src: 'images/Mr.Annor Yeboah.jpg',
        caption: 'Annual Celebration - Honoring our founder\'s legacy'
    },
    {
        src: 'images/logo.jpeg',
        caption: 'Fundraising Gala - Supporting our mission together'
    },
    {
        src: 'images/WhatsApp Image 2025-10-27 at 11.37.06.jpeg',
        caption: 'Scholarship Awards - Celebrating student achievements'
    }
];

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    lightboxImg.src = images[index].src;
    lightboxCaption.textContent = images[index].caption;
    lightbox.classList.add('active');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');

    // Restore body scroll
    document.body.style.overflow = '';
}

function changeSlide(direction) {
    currentImageIndex += direction;

    // Loop around
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    // Fade effect
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src = images[currentImageIndex].src;
        lightboxCaption.textContent = images[currentImageIndex].caption;
        lightboxImg.style.opacity = '1';
    }, 200);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    }
});

// Close lightbox when clicking outside image
document.getElementById('lightbox')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Load More Functionality (placeholder)
document.getElementById('loadMoreBtn')?.addEventListener('click', function() {
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    // Simulate loading
    setTimeout(() => {
        this.innerHTML = '<i class="fas fa-check"></i> All Photos Loaded';
        this.disabled = true;
        this.style.opacity = '0.6';
    }, 1000);
});
