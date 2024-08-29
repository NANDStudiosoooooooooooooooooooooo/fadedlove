const galleryWrapper = document.querySelector('.gallery-wrapper');
const galleryItems = document.querySelectorAll('.gallery-item');
let currentIndex = 0;
let isScrolling = false;
let startX = 0;  // Variable für Touch-Startpunkt

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
    }, 600);  // Dauer des Scrollens
}

// Event Listener für das Scrollen mit dem Mausrad
window.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaY) > 10) {
        scrollGallery(event.deltaY);
    }
});

// Event Listener für den Start eines Touch-Events
window.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

// Event Listener für das Ende eines Touch-Events (Swipe)
window.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const delta = startX - endX;

    if (Math.abs(delta) > 50) {
        scrollGallery(delta);
    }
});

// Initiale Aktualisierung der Galerie
updateGallery();