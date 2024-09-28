fetch('buttons.html')
            .then(response => response.text())
            .then(data => {
                document.body.insertAdjacentHTML('beforeend', data);
                // Rufe die Funktion zur Initialisierung der Buttons auf, nachdem sie geladen sind
                initializeButtons(); // Hier die Initialisierung aufrufen
            })
            .catch(error => console.error('Error loading buttons:', error));