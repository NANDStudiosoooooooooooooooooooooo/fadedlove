// Funktion zum Öffnen und Schließen der Panels
function togglePanel(panelId) {
    // Alle Panels und Buttons auswählen
    let panels = document.querySelectorAll('.glass-panel');
    let buttons = document.querySelectorAll('.glass-button');

    // Panels durchgehen und Sichtbarkeit zurücksetzen
    panels.forEach(panel => {
        if (panel.id === panelId) {
            // Panel anzeigen, wenn es nicht sichtbar ist
            if (panel.style.visibility === 'visible') {
                panel.style.visibility = 'hidden'; // Schließe das Panel, wenn es bereits offen ist
            } else {
                panel.style.visibility = 'visible'; // Öffne das Panel
            }
        } else {
            // Alle anderen Panels schließen
            panel.style.visibility = 'hidden';
        }
    });

    // Button-Status aktualisieren
    buttons.forEach(button => {
        let targetPanel = button.getAttribute('data-target');
        if (targetPanel === panelId) {
            // Aktuellen Button hervorheben
            button.classList.toggle('active-button');
        } else {
            // Hervorhebung bei den anderen Buttons entfernen
            button.classList.remove('active-button');
        }
    });
}

// Klick außerhalb des Panels zum Schließen
document.addEventListener('click', function(event) {
    let panels = document.querySelectorAll('.glass-panel');
    let buttons = document.querySelectorAll('.glass-button');

    let clickedInsidePanel = false;

    // Prüfen, ob der Klick in einem der Panels oder Buttons war
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

    // Wenn außerhalb geklickt wurde, alle Panels schließen
    if (!clickedInsidePanel) {
        panels.forEach(panel => panel.style.visibility = 'hidden');
        buttons.forEach(button => button.classList.remove('active-button'));
    }
});

// Event Listener für alle Buttons
document.querySelectorAll('.glass-button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.stopPropagation(); // Verhindert, dass das Event auch das document erreicht

        // Hole das Ziel-Panel von der data-target-Attribut des Buttons
        let targetPanel = button.getAttribute('data-target');
        togglePanel(targetPanel); // Panel ein/ausblenden
    });
});
