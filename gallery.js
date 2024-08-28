const galleryWrapper = document.querySelector('.gallery-wrapper');
const galleryItems = document.querySelectorAll('.gallery-item');
let currentIndex = 0;
let isScrolling = false;  // Prevent multiple scrolls at once

function updateGallery() {
    // Center the current item in the view
    galleryWrapper.style.transform = `translateX(-${currentIndex * 100}vw)`;
    
    // Apply the active class to the current item and remove from others
    galleryItems.forEach((item, index) => {
        if (index === currentIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function scrollGallery(delta) {
    const maxIndex = galleryItems.length - 1;

    // Prevent continuous scrolling while transition is happening
    if (isScrolling) return;
    
    if (delta > 0 && currentIndex < maxIndex) {
        currentIndex++;
    } else if (delta < 0 && currentIndex > 0) {
        currentIndex--;
    }

    updateGallery();
    
    // Block further scrolling until the current transition completes
    isScrolling = true;
    setTimeout(() => {
        isScrolling = false;
    }, 600);  // Adjust timeout duration to match your transition duration
}

window.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaY) > 10) {  // Adjust sensitivity to ensure meaningful scrolls
        scrollGallery(event.deltaY);
    }
});

// Touch support for mobile
let startX = 0;
window.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

window.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const delta = startX - endX;

    if (Math.abs(delta) > 50) {  // Sensitivity for touch scroll
        scrollGallery(delta);
    }
});

// Initialize the gallery with the first item active
updateGallery();
