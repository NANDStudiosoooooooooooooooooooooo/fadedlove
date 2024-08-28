const galleryWrapper = document.querySelector('.gallery-wrapper');
const galleryItems = document.querySelectorAll('.gallery-item');
let currentIndex = 0;

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
    if (delta > 0 && currentIndex < maxIndex) {
        currentIndex++;
    } else if (delta < 0 && currentIndex > 0) {
        currentIndex--;
    }
    updateGallery();
}

window.addEventListener('wheel', (event) => {
    scrollGallery(event.deltaY);
});

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

// Initialize the gallery
updateGallery();
