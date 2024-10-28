const videos = [
    {
        src: "media/fadedcloth.webm",
        hoverText: "FADEDLOVE",
        link: "https://example.com/1"
    },
    {
        src: "media/main.mp4",
        hoverText: "ANOTHER TEXT",
        link: "https://example.com/2"
    },
    // Weitere Videos hier hinzufügen
];

let currentIndex = 0;
let scrollCooldown = false; // Verhindert mehrfache Scrolls in kurzer Zeit
let startY = 0;

const videoElement = document.getElementById("load-obj");
const videoWrapper = document.getElementById("videoWrapper");

function updateVideo() {
    // Videoquelle aktualisieren
    videoElement.src = videos[currentIndex].src;
    videoElement.load();
}

// Scroll-Event zum Navigieren zwischen Videos (Desktop)
window.addEventListener("wheel", (event) => {
    if (!scrollCooldown) {
        scrollCooldown = true;

        if (event.deltaY > 0) {
            prevVideo(); // Nach unten scrollen -> vorheriges Video
        } else {
            nextVideo(); // Nach oben scrollen -> nächstes Video
        }

        setTimeout(() => {
            scrollCooldown = false;
        }, 1000); // 1 Sekunde Verzögerung, um übermäßiges Scrollen zu verhindern
    }
});

// Touch-Events für Wischen (Mobile)
videoWrapper.addEventListener("touchstart", (event) => {
    startY = event.touches[0].clientY; // Y-Position zum Starten des Touchs erfassen
    event.preventDefault(); // Standard-Touch-Scrolling verhindern
});

videoWrapper.addEventListener("touchend", (event) => {
    const endY = event.changedTouches[0].clientY; // Y-Position am Ende des Touchs erfassen
    const diffY = startY - endY;

    if (Math.abs(diffY) > 50) { // Mindest-Wischdistanz zum Auslösen
        if (diffY > 0) {
            nextVideo(); // Wischen nach oben -> nächstes Video
        } else {
            prevVideo(); // Wischen nach unten -> vorheriges Video
        }
    }
});

function nextVideo() {
    // Slide-out-Animation (nach rechts bewegen)
    videoElement.style.transition = 'transform 0.5s ease-out';
    videoElement.style.transform = 'translateX(100vw)'; // Nach rechts ausblenden

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % videos.length;
        updateVideo();

        // Sofortige Rücksetzung der Position außerhalb des Bildschirms (links)
        videoElement.style.transition = 'none';
        videoElement.style.transform = 'translateX(-100vw)'; // Starten von links, aber außerhalb des Bildschirms

        setTimeout(() => {
            // In die Mitte einblenden
            videoElement.style.transition = 'transform 0.5s ease-in';
            videoElement.style.transform = 'translateX(0)'; // Wieder zentriert
        }, 10); // Kleine Verzögerung, um sicherzustellen, dass die Transition zurückgesetzt wird, bevor sie einblendet
    }, 500); // Warten, bis die Slide-out-Animation abgeschlossen ist
}

function prevVideo() {
    // Slide-out-Animation (nach links bewegen)
    videoElement.style.transition = 'transform 0.5s ease-out';
    videoElement.style.transform = 'translateX(-100vw)'; // Nach links ausblenden

    setTimeout(() => {
        currentIndex = (currentIndex - 1 + videos.length) % videos.length;
        updateVideo();

        // Sofortige Rücksetzung der Position außerhalb des Bildschirms (rechts)
        videoElement.style.transition = 'none';
        videoElement.style.transform = 'translateX(100vw)'; // Starten von rechts, aber außerhalb des Bildschirms

        setTimeout(() => {
            // In die Mitte einblenden
            videoElement.style.transition = 'transform 0.5s ease-in';
            videoElement.style.transform = 'translateX(0)'; // Wieder zentriert
        }, 10); // Kleine Verzögerung, um sicherzustellen, dass die Transition zurückgesetzt wird, bevor sie einblendet
    }, 500); // Warten, bis die Slide-out-Animation abgeschlossen ist
}

// Initialisiere das erste Video
updateVideo();
