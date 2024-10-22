const isMobile = /Mobi|Android/i.test(navigator.userAgent);

        // Wenn es kein Mobilgerät ist, erstelle den benutzerdefinierten Cursor
        if (!isMobile) {
            // Cursor-Element erstellen
            const cursor = document.createElement('div');
            cursor.classList.add('custom-cursor');
            document.body.appendChild(cursor);

            // Update Cursor-Position bei Mausbewegung
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = `${e.pageX}px`;
                cursor.style.top = `${e.pageY}px`;
            });

            // Hover-Effekt bei Links und Buttons
            const hoverElements = document.querySelectorAll('a, button');
            hoverElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    cursor.classList.add('hover'); // Klasse hinzufügen, wenn man über Link/Button fährt
                });
                element.addEventListener('mouseleave', () => {
                    cursor.classList.remove('hover'); // Klasse entfernen, wenn man den Link/Button verlässt
                });
            });
        }