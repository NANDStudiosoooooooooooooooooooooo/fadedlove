const videos = [
    {
        src: "media/logoC.mp4",
        hoverText: "FADEDLOVE",
        link: "https://example.com/1"
    },
    {
        src: "media/logoC.mp4",
        hoverText: "ANOTHER TEXT",
        link: "https://example.com/2"
    },
    // Add more videos here
];

let currentIndex = 0;
let scrollCount = 0; // Track how many times the user scrolls
let startX = 0;
let startY = 0;

const videoElement = document.getElementById("load-obj");
const hoverText = document.getElementById("hoverText");
const videoWrapper = document.getElementById("videoWrapper");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

function updateVideo() {
    videoElement.src = videos[currentIndex].src;
    videoElement.load();
    hoverText.textContent = videos[currentIndex].hoverText;
}

videoWrapper.addEventListener("mouseover", () => {
    hoverText.classList.remove("hidden");
});

videoWrapper.addEventListener("mouseout", () => {
    hoverText.classList.add("hidden");
});

videoWrapper.addEventListener("click", () => {
    window.open(videos[currentIndex].link);
});

nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % videos.length;
    videoElement.style.transform = 'translateX(100%)'; // Slide out animation
    setTimeout(() => {
        updateVideo();
        videoElement.style.transform = 'translateX(-100%)'; // Slide in animation
    }, 500); // Wait for the slide-out animation
});

prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + videos.length) % videos.length;
    videoElement.style.transform = 'translateX(-100%)'; // Slide out animation
    setTimeout(() => {
        updateVideo();
        videoElement.style.transform = 'translateX(100%)'; // Slide in animation
    }, 500); // Wait for the slide-out animation
});

// Mouse scroll handler
function handleScroll(event) {
    const delta = Math.sign(event.deltaY); // Normalize scroll direction (positive = down, negative = up)

    // Only trigger horizontal scroll after two vertical scroll events
    scrollCount += delta;

    if (scrollCount >= 2) {
        nextButton.click(); // Scroll down triggers next video
        scrollCount = 0;    // Reset scroll count
    } else if (scrollCount <= -2) {
        prevButton.click(); // Scroll up triggers previous video
        scrollCount = 0;    // Reset scroll count
    }
}

// Listen for the scroll event on the window
window.addEventListener('wheel', handleScroll);

// Handle swipe gestures for mobile
function handleTouchStart(event) {
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
}

function handleTouchMove(event) {
    if (!startX || !startY) return;

    const touch = event.touches[0];
    const diffX = touch.clientX - startX;
    const diffY = touch.clientY - startY;

    // Check if the swipe is more horizontal than vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 50) {
            prevButton.click(); // Swipe right triggers previous video
        } else if (diffX < -50) {
            nextButton.click(); // Swipe left triggers next video
        }
    }

    // Reset touch coordinates after handling the move
    startX = 0;
    startY = 0;
}

// Add touch event listeners for mobile
window.addEventListener('touchstart', handleTouchStart);
window.addEventListener('touchmove', handleTouchMove);

// Initialize the first video
updateVideo();
