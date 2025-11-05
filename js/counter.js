// Animated Counter Component
class AnimatedCounter {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = parseInt(target);
        this.duration = duration;
        this.hasAnimated = false;
    }

    animate() {
        if (this.hasAnimated) return;
        
        const start = 0;
        const increment = this.target / (this.duration / 16);
        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < this.target) {
                this.element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                this.element.textContent = this.target.toLocaleString();
                this.hasAnimated = true;
            }
        };

        updateCounter();
    }
}

// Initialize counters when they come into view
function initCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target.getAttribute('data-target');
                const counter = new AnimatedCounter(entry.target, target, 2000);
                counter.animate();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
} else {
    initCounters();
}
