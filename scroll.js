const galleryWrapper = document.querySelector('.gallery-wrapper');
const galleryItems = document.querySelectorAll('.gallery-item');
const totalItems = galleryItems.length;

// Clone gallery items for infinite scrolling
const firstClone = galleryItems[0].cloneNode(true);
const lastClone = galleryItems[totalItems - 1].cloneNode(true);
galleryWrapper.appendChild(firstClone);
galleryWrapper.insertBefore(lastClone, galleryItems[0]);

let currentIndex = 0;

function scrollGallery(delta) {
    const maxIndex = totalItems;
    const newIndex = currentIndex + (delta > 0 ? 1 : -1);
    
    if (newIndex >= totalItems + 1) {
        galleryWrapper.style.transition = 'none';
        galleryWrapper.style.transform = `translateX(-${100 * totalItems}vw)`;
        currentIndex = 0;
        setTimeout(() => {
            galleryWrapper.style.transition = 'transform 0.5s ease';
            galleryWrapper.style.transform = `translateX(-${currentIndex * 100}vw)`;
        }, 50);
    } else if (newIndex < 0) {
        galleryWrapper.style.transition = 'none';
        galleryWrapper.style.transform = `translateX(0)`;
        currentIndex = totalItems - 1;
        setTimeout(() => {
            galleryWrapper.style.transition = 'transform 0.5s ease';
            galleryWrapper.style.transform = `translateX(-${currentIndex * 100}vw)`;
        }, 50);
    } else {
        currentIndex = newIndex;
        galleryWrapper.style.transform = `translateX(-${currentIndex * 100}vw)`;
    }
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
