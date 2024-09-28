fetch('buttons.html')
            .then(response => response.text())
            .then(data => {
                document.body.insertAdjacentHTML('beforeend', data);
                // Hier kannst du auch die Event Listener hinzufügen
                addButtonEventListeners(); // Funktion um Event Listener hinzuzufügen
            })
            .catch(error => console.error('Error loading buttons:', error));

        function addButtonEventListeners() {
            const buttons = document.querySelectorAll('.glass-button');
            buttons.forEach(button => {
                button.addEventListener('click', function() {
                    const targetPanel = this.getAttribute('data-target');
                    togglePanel(targetPanel);
                });
            });
        }