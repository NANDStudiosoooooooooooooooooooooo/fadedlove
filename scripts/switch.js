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
    // Update video source and hover text
    videoElement.src = videos[currentIndex].src;
    videoElement.load();
    hoverText.textContent = videos[currentIndex].hoverText;

    // Make sure the text is hidden after updating the video
    hoverText.classList.add("hidden");
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
    // Slide out animation (move right)
    videoElement.style.transition = 'transform 0.5s ease-out';
    videoElement.style.transform = 'translateX(100vw)'; // Slide out to the right

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % videos.length;
        updateVideo();
        
        // Instantly reset position off-screen (left side)
        videoElement.style.transition = 'none';
        videoElement.style.transform = 'translateX(-100vw)'; // Start from left, but offscreen
        
        setTimeout(() => {
            // Slide in to the center
            videoElement.style.transition = 'transform 0.5s ease-in';
            videoElement.style.transform = 'translateX(0)'; // Centered again
        }, 10); // Small delay to ensure the transition is reset before sliding in
    }, 500); // Wait for the slide-out animation to finish
});

prevButton.addEventListener("click", () => {
    // Slide out animation (move left)
    videoElement.style.transition = 'transform 0.5s ease-out';
    videoElement.style.transform = 'translateX(-100vw)'; // Slide out to the left

    setTimeout(() => {
        currentIndex = (currentIndex - 1 + videos.length) % videos.length;
        updateVideo();
        
        // Instantly reset position off-screen (right side)
        videoElement.style.transition = 'none';
        videoElement.style.transform = 'translateX(100vw)'; // Start from right, but offscreen
        
        setTimeout(() => {
            // Slide in to the center
            videoElement.style.transition = 'transform 0.5s ease-in';
            videoElement.style.transform = 'translateX(0)'; // Centered again
        }, 10); // Small delay to ensure the transition is reset before sliding in
    }, 500); // Wait for the slide-out animation to finish
});

// Initialize the first video
updateVideo();
