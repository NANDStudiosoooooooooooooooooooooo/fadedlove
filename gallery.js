const galleryWrapper = document.querySelector('.gallery-wrapper');
let currentIndex = 0;
const galleryItems = document.querySelectorAll('.gallery-item');

function scrollGallery(delta) {
    const maxIndex = galleryItems.length - 1;
    
    if (delta > 0 && currentIndex < maxIndex) {
        currentIndex++;
    } else if (delta < 0 && currentIndex > 0) {
        currentIndex--;
    }

    // Infinite scroll logic
    if (currentIndex > maxIndex) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = maxIndex;
    }

    galleryWrapper.style.transform = `translateX(-${currentIndex * 100}vw)`;
}

let scrollTimeout;
window.addEventListener('wheel', (event) => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        scrollGallery(event.deltaY);
    }, 50);
});

// For touch screens (swipe)
let startX = 0;
window.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

window.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const delta = startX - endX;
    
    if (Math.abs(delta) > 50) {
        scrollGallery(delta);
    }
});
