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

// Initialize the first video
updateVideo();
