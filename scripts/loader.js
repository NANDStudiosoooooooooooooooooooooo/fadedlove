const video = document.getElementById('load-obj');
        const loader = document.getElementById('loader');
        const logocontainerRef = document.getElementById('load-container');

        video.addEventListener('canplaythrough', function () {
            // Wenn das Video vollständig geladen ist, Ladeanimation ausblenden und Video anzeigen
            loader.style.display = 'none';
            logocontainerRef.style.display = 'flex';
        });