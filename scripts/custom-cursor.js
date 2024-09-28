const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        // Update Cursor-Position bei Mausbewegung
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.pageX}px`;
            cursor.style.top = `${e.pageY}px`;
        });

        // Hover-Effekt bei Links
        const hoverElements = document.querySelectorAll('a');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hover'); // Klasse hinzufügen
            });
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover'); // Klasse entfernen
            });
        });