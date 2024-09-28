// scripts/load-buttons.js

// Funktion zum Öffnen und Schließen der Panels
function togglePanel(panelId) {
    let panels = document.querySelectorAll('.glass-panel');
    let buttons = document.querySelectorAll('.glass-button');
    let currentPanel = document.getElementById(panelId);

    if (currentPanel.classList.contains('hidden')) {
        panels.forEach(panel => panel.classList.add('hidden'));
        currentPanel.classList.remove('hidden');

        buttons.forEach(button => {
            button.classList.remove('active-button');
        });
        let activeButton = Array.from(buttons).find(button => button.getAttribute('data-target') === panelId);
        if (activeButton) {
            activeButton.classList.add('active-button');
        }
    } else {
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
    // Abonnieren-Button
    const subscribeButton = document.getElementById("subscribeButton");
    if (subscribeButton) {
        subscribeButton.addEventListener("click", function(event) {
            event.preventDefault();
            const email = document.getElementById("email").value;
            if (email) {
                loadScripts(['https://subscribe.fadedcloth.de/scripts/fadedsub.js']);
            } else {
                alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
            }
        });
    }

    // Abbestellen-Button
    const unsubscribeButton = document.getElementById("UnsubscribeSendButton");
    if (unsubscribeButton) {
        unsubscribeButton.addEventListener("click", function(event) {
            event.preventDefault();
            const email = document.getElementById("email").value;
            if (email) {
                loadScripts(['https://subscribe.fadedcloth.de/scripts/fadedsendunsub.js']);
            } else {
                alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
            }
        });
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
