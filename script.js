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