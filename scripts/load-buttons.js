// Funktion zum Öffnen und Schließen der Panels
function togglePanel(panelId) {
    // Alle Panels und Buttons auswählen
    let panels = document.querySelectorAll('.glass-panel');
    let buttons = document.querySelectorAll('.glass-button');
    let currentPanel = document.getElementById(panelId);

    // Überprüfen, ob das aktuelle Panel bereits sichtbar ist
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
}

// Funktion zum Umschalten der Collection Links
function toggleCollectionLinks() {
    const links = document.querySelector('.collection-links');
    const isHidden = links.classList.contains('hidden');
    
    if (isHidden) {
        links.classList.remove('hidden');
        links.style.display = 'flex'; // Links anzeigen
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

    panels.forEach(panel => {
        if (panel.contains(event.target)) {
            clickedInsidePanel = true;
        }
    });

    buttons.forEach(button => {
        if (button.contains(event.target)) {
            clickedInsidePanel = true;
        }
    });

    if (!clickedInsidePanel) {
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
