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

// Funktion zum Hinzufügen von Event Listenern für die Buttons
function addButtonEventListeners() {
    document.querySelectorAll('.glass-button').forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation(); // Verhindert, dass das Event auch das document erreicht

            // Hole das Ziel-Panel von der data-target des Buttons
            let targetPanel = button.getAttribute('data-target');
            togglePanel(targetPanel);
        });
    });
}

// Funktion, um die Buttons zu laden
function loadButtons() {
    fetch('buttons.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
            addButtonEventListeners(); // Füge Event-Listener hinzu
        })
        .catch(error => console.error('Error loading buttons:', error));
}

// Rufe die Funktion zum Laden der Buttons auf, wenn das DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', loadButtons);