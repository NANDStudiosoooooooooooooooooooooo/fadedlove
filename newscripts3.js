// Funktion zum Öffnen und Schließen der Panels
function togglePanel(panelId) {
    // Alle Panels und Buttons auswählen
    let panels = document.querySelectorAll('.glass-panel');
    let buttons = document.querySelectorAll('.glass-button');
    let currentPanel = document.getElementById(panelId);

    // Überprüfen, ob das aktuelle Panel bereits sichtbar ist
    if (currentPanel.classList.contains('hidden')) {
        // Panels schließen, außer dem aktuellen
        panels.forEach(panel => {
            panel.classList.add('hidden');
        });
        
        // Aktuelles Panel öffnen
        currentPanel.classList.remove('hidden');
        
        // Button-Status aktualisieren
        buttons.forEach(button => {
            button.classList.remove('active-button');
        });
        let activeButton = Array.from(buttons).find(button => button.id === panelId);
        if (activeButton) {
            activeButton.classList.add('active-button');
        }
    }
}

// Klick außerhalb des Panels zum Schließen
document.addEventListener('click', function(event) {
    let panels = document.querySelectorAll('.glass-panel');
    let buttons = document.querySelectorAll('.glass-button');

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
    }
});

// Event Listener für alle Buttons
document.querySelectorAll('.glass-button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.stopPropagation(); // Verhindert, dass das Event auch das document erreicht

        // Hole das Ziel-Panel von der id des Buttons
        let targetPanel = button.id; // z.B. button1, button2
        togglePanel(targetPanel);
    });
});
