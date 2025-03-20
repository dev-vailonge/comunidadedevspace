// FAQ Functionality
document.querySelectorAll('.faq-button').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const arrow = button.querySelector('svg');
        
        // Toggle the content
        if (content.style.maxHeight === '0px' || content.style.maxHeight === '') {
            content.style.maxHeight = content.scrollHeight + 'px';
            arrow.classList.add('rotate-180');
        } else {
            content.style.maxHeight = '0px';
            arrow.classList.remove('rotate-180');
        }
    });
});

// Carousel Functionality
let currentSlide = 0;
const totalSlides = 7;
const carousel = document.getElementById('carousel');
const dots = document.querySelectorAll('.flex.justify-center.mt-4 button');

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.remove('bg-purple-600/50');
            dot.classList.add('bg-purple-600');
        } else {
            dot.classList.add('bg-purple-600/50');
            dot.classList.remove('bg-purple-600');
        }
    });
}

function moveCarousel(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
}

// Auto-advance carousel every 5 seconds
setInterval(() => {
    moveCarousel(1);
}, 5000);

// Initialize carousel
updateCarousel();

// Testimonials Page Horizontal Scroll
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const container = section.querySelector('.overflow-x-auto');
        if (!container) return;

        const leftButton = section.querySelector('button:first-of-type');
        const rightButton = section.querySelector('button:last-of-type');
        const scrollAmount = 300;
        let scrollInterval;
        let autoScrollInterval;

        function startAutoScroll(direction) {
            if (scrollInterval) return; // Prevent multiple intervals
            scrollInterval = setInterval(() => {
                container.scrollBy({
                    left: direction * scrollAmount / 3,
                    behavior: 'auto'
                });
            }, 50); // Smooth continuous scrolling
        }

        function stopAutoScroll() {
            if (scrollInterval) {
                clearInterval(scrollInterval);
                scrollInterval = null;
            }
        }

        // Auto scroll functionality
        function startContainerAutoScroll() {
            if (autoScrollInterval) return;
            autoScrollInterval = setInterval(() => {
                const maxScroll = container.scrollWidth - container.clientWidth;
                if (container.scrollLeft >= maxScroll) {
                    // Reset to start when reaching the end
                    container.scrollTo({ left: 0, behavior: 'auto' });
                } else {
                    container.scrollBy({ left: 1, behavior: 'auto' });
                }
            }, 30);
        }

        function stopContainerAutoScroll() {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        }

        // Start auto-scrolling
        startContainerAutoScroll();

        // Pause on hover over container
        container.addEventListener('mouseenter', stopContainerAutoScroll);
        container.addEventListener('mouseleave', startContainerAutoScroll);

        if (leftButton) {
            leftButton.addEventListener('mouseenter', () => {
                stopContainerAutoScroll();
                startAutoScroll(-1);
            });
            leftButton.addEventListener('mouseleave', () => {
                stopAutoScroll();
                startContainerAutoScroll();
            });
            leftButton.addEventListener('click', () => {
                container.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });
        }

        if (rightButton) {
            rightButton.addEventListener('mouseenter', () => {
                stopContainerAutoScroll();
                startAutoScroll(1);
            });
            rightButton.addEventListener('mouseleave', () => {
                stopAutoScroll();
                startContainerAutoScroll();
            });
            rightButton.addEventListener('click', () => {
                container.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });
        }

        // Show/hide scroll buttons based on scroll position
        container.addEventListener('scroll', () => {
            if (leftButton) {
                leftButton.style.opacity = container.scrollLeft > 0 ? '1' : '0';
                leftButton.style.pointerEvents = container.scrollLeft > 0 ? 'auto' : 'none';
            }
            if (rightButton) {
                const hasMoreContent = container.scrollLeft < (container.scrollWidth - container.clientWidth - 10);
                rightButton.style.opacity = hasMoreContent ? '1' : '0';
                rightButton.style.pointerEvents = hasMoreContent ? 'auto' : 'none';
            }
        });

        // Trigger initial scroll event to set button visibility
        container.dispatchEvent(new Event('scroll'));
    });
}); 