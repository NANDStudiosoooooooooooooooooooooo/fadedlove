const galleryWrapper = document.querySelector('.gallery-wrapper');
const galleryItems = document.querySelectorAll('.gallery-item');
let currentIndex = 0;
let isScrolling = false;

function updateGallery() {
    galleryWrapper.style.transform = `translateX(-${currentIndex * 100}vw)`;

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

    if (isScrolling) return;

    if (delta > 0 && currentIndex < maxIndex) {
        currentIndex++;
    } else if (delta < 0 && currentIndex > 0) {
        currentIndex--;
    }

    updateGallery();

    isScrolling = true;
    setTimeout(() => {
        isScrolling = false;
    }, 600);
}

window.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaY) > 10) {
        scrollGallery(event.deltaY);
    }
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

updateGallery();
