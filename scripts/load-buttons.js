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

// Rufe die Funktion zum Laden der Buttons auf
document.addEventListener('DOMContentLoaded', loadButtons);