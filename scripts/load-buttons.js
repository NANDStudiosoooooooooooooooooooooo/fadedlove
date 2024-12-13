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

document.addEventListener('DOMContentLoaded', () => {
    const collectionButton = document.getElementById('collectionButton');
    const collectionsContainer = document.getElementById('collectionsContainer');

    collectionButton.addEventListener('click', () => {
        const isHidden = collectionsContainer.classList.contains('hidden');
        collectionsContainer.classList.toggle('hidden');
        collectionButton.textContent = isHidden ? '- COLLECTION' : '+ COLLECTION';
        
        if (isHidden) {
            fetchCollections();
        }
    });

    async function fetchCollections() {
        const query = `
            {
                collections(first: 50) {
                    edges {
                        node {
                            title
                            handle
                        }
                    }
                }
            }
        `;

        try {
            const response = await fetch("https://checkout.fadedcloth.de/api/2023-07/graphql.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Storefront-Access-Token": "ed72f09d8742f37356305b6e49310909"
                },
                body: JSON.stringify({ query })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Check if collections exist
            if (!data.data || !data.data.collections) {
                throw new Error("Collections data is undefined");
            }

            // Populate the collections container
            const collections = data.data.collections.edges.filter(edge => !edge.node.handle.includes('drop'));
            collectionsContainer.innerHTML = ''; // Clear previous content

            collections.forEach(edge => {
                const collectionLink = document.createElement('a');
                collectionLink.href = `https://shop.fadedcloth.de?collection=${edge.node.handle}`;
                collectionLink.textContent = edge.node.title;
                collectionLink.className = 'panel-link'; // Same style as other links
                collectionsContainer.appendChild(collectionLink);
            });

        } catch (error) {
            console.error("Error fetching collections:", error);
        }
    }
});

function makeMovable() {
    const movableDivs = document.querySelectorAll('.glass-panel');
    
    movableDivs.forEach(function(movableDiv) {
        let isDragging = false;
        let offsetX = 0, offsetY = 0;

        // Für Desktop (PC) - Mausereignisse
        movableDiv.addEventListener('mousedown', function(e) {
            if (window.innerWidth >= 768) { // Nur auf PC und Tablets, aber nicht auf mobilen Geräten
                isDragging = true;
                offsetX = e.clientX - movableDiv.getBoundingClientRect().left;
                offsetY = e.clientY - movableDiv.getBoundingClientRect().top;
                document.body.style.userSelect = 'none'; // Verhindern, dass der Text markiert wird
            }
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                movableDiv.style.left = (e.clientX - offsetX) + 'px';
                movableDiv.style.top = (e.clientY - offsetY) + 'px';
            }
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
            document.body.style.userSelect = ''; // Wieder erlauben, Text zu markieren
        });

        // Für Mobile - Verhindern, dass das div verschoben wird
        movableDiv.addEventListener('touchstart', function(e) {
            if (window.innerWidth < 768) { // Auf mobilen Geräten bleibt es an der Startposition
                e.preventDefault(); // Verhindert, dass es bewegt wird
            }
        });
    });
}

// Funktion aufrufen, um alle .glass-panel Elemente bewegbar zu machen
makeMovable();

