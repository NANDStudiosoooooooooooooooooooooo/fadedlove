// Funktion zum Öffnen und Schließen der Panels
function togglePanel(panelId) {
    // Alle Panels und Buttons auswählen
    let panels = document.querySelectorAll('.glass-panel');
    let buttons = document.querySelectorAll('.glass-button');
    let currentPanel = document.getElementById(panelId);
    let isAnyPanelOpen = false;

    // Überprüfen, ob das aktuelle Panel bereits sichtbar ist
    panels.forEach(panel => {
        if (!panel.classList.contains('hidden')) {
            isAnyPanelOpen = true; // Ein Panel ist offen
        }
    });

    if (currentPanel.classList.contains('hidden')) {
        // Alle Panels schließen
        panels.forEach(panel => panel.classList.add('hidden'));

        // Aktuelles Panel öffnen
        currentPanel.classList.remove('hidden');

        // Button-Status aktualisieren
        buttons.forEach(button => {
            button.classList.remove('active-button');
        });
        let activeButton = Array.from(buttons).find(button => button.getAttribute('data-target') === panelId);
        if (activeButton) {
            activeButton.classList.add('active-button');
        }
    } else {
        // Wenn das Panel bereits offen ist, schließe es
        currentPanel.classList.add('hidden');
        let activeButton = Array.from(buttons).find(button => button.getAttribute('data-target') === panelId);
        if (activeButton) {
            activeButton.classList.remove('active-button');
        }
    }

    // Rückgabe, ob ein Panel offen ist
    return isAnyPanelOpen || !currentPanel.classList.contains('hidden');
}

// Funktion zum Umschalten der Collection Links
function toggleCollectionLinks() {
    const links = document.querySelector('.collection-links');
    const toggler = document.getElementById('collectionToggler');

    if (links.classList.contains('hidden')) {
        links.classList.remove('hidden');
        links.style.display = 'flex'; // Links anzeigen

        // Position der Links anpassen
        const togglerRect = toggler.getBoundingClientRect();
        links.style.top = `${togglerRect.top - links.offsetHeight}px`; // Links über dem Toggler positionieren
    } else {
        links.classList.add('hidden');
        links.style.display = 'none'; // Links ausblenden
    }
}

// Klick außerhalb des Panels zum Schließen
document.addEventListener('click', function(event) {
    let panels = document.querySelectorAll('.glass-panel');
    let buttons = document.querySelectorAll('.glass-button');
    let links = document.querySelector('.collection-links');

    let clickedInsidePanel = false;
    let isAnyPanelOpen = false;

    panels.forEach(panel => {
        if (!panel.classList.contains('hidden')) {
            isAnyPanelOpen = true; // Ein Panel ist offen
        }
        if (panel.contains(event.target)) {
            clickedInsidePanel = true;
        }
    });

    buttons.forEach(button => {
        if (button.contains(event.target)) {
            clickedInsidePanel = true;
        }
    });

    // Schließen der Panels nur, wenn ein Panel geöffnet ist und nicht innerhalb eines Panels geklickt wurde
    if (!clickedInsidePanel && isAnyPanelOpen) {
        panels.forEach(panel => panel.classList.add('hidden'));
        buttons.forEach(button => button.classList.remove('active-button'));
        links.classList.add('hidden'); // Links ausblenden
        links.style.display = 'none'; // Links ausblenden
    }
});

// Event Listener für alle Buttons
document.querySelectorAll('.glass-button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.stopPropagation(); // Verhindert, dass das Event auch das document erreicht

        // Hole das Ziel-Panel von der data-target des Buttons
        let targetPanel = button.getAttribute('data-target');
        if (button.id === 'collectionToggler') {
            toggleCollectionLinks(); // Spezielle Funktion für den Toggler
        } else {
            togglePanel(targetPanel);
        }
    });
});
