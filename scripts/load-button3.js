// scripts/load-buttons.js

// Funktion zum Laden von Skripten
function loadScripts(scripts) {
    scripts.forEach(script => {
        const scriptElement = document.createElement('script');
        scriptElement.src = script;
        scriptElement.async = false; // Sicherstellen, dass die Skripte in der Reihenfolge geladen werden
        document.body.appendChild(scriptElement);
    });
}

// Funktion zum Öffnen und Schließen der Panels
function togglePanel(panelId) {
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

    // Füge Event Listener für den Subscribe-Button hinzu
    const subscribeButton = document.getElementById("subscribeButton");
    if (subscribeButton) {
        subscribeButton.addEventListener("click", function(event) {
            event.preventDefault();
            const email = document.getElementById("email").value;
            if (email) {
                // Lade die Skripte für die Abonnierung und weitere Funktionen
                loadScripts(['scripts/subscribe.js', 'scripts/anotherScript.js', 'scripts/yetAnotherScript.js']);
            } else {
                alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
            }
        });
    } else {
        console.error("Subscribe button not found.");
    }
}

// Funktion, um die Buttons zu laden
function loadButtons() {
    fetch('components/buttons.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            // Füge die Buttons direkt in den Body ein
            document.body.insertAdjacentHTML('beforeend', data);
            addButtonEventListeners(); // Füge Event-Listener hinzu
        })
        .catch(error => console.error('Error loading buttons:', error));
}

// Rufe die Funktion zum Laden der Buttons auf, wenn das DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', loadButtons);
