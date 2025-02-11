//BUTTONS --START
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



let cursor = { x: null, y: null };
let panel = { dom: null, x: null, y: null };

document.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('glass-panel')) {
        cursor = {
            x: event.clientX,
            y: event.clientY
        };
        panel = {
            dom: event.target,
            x: event.target.getBoundingClientRect().left,
            y: event.target.getBoundingClientRect().top
        };
    }
});

document.addEventListener('mousemove', (event) => {
    if (panel.dom == null) return;

    const currentCursor = { x: event.clientX, y: event.clientY };
    const distance = {
        x: currentCursor.x - cursor.x,
        y: currentCursor.y - cursor.y
    };

    panel.dom.style.left = (panel.x + distance.x) + 'px';
    panel.dom.style.top = (panel.y + distance.y) + 'px';
    panel.dom.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', () => {
    if (panel.dom == null) return;
    panel.dom.style.cursor = 'auto';
    panel.dom = null;
});



function loadShopifyCollections() {
    const query = `
    {
        collections(first: 100) {
            edges {
                node {
                    handle
                    title
                    metafields(identifiers: [
                        {namespace: "custom", key: "isdrop"}
                    ]) {
                        key
                        value
                    }
                }
            }
        }
    }`;

    fetch('https://zkwisj-0b.myshopify.com/api/2023-10/graphql.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': 'ed72f09d8742f37356305b6e49310909'
        },
        body: JSON.stringify({ query })
    })
    .then(response => response.json())
    .then(json => {
        // Überprüfen, ob die Daten korrekt sind
        if (!json.data || !json.data.collections) {
            console.error('Fehlende oder ungültige Daten in der Antwort');
            return;
        }

        const collections = json.data.collections.edges.map(edge => edge.node);
        const panel1 = document.getElementById('panel1');
        if (!panel1) {
            console.error('Element mit ID "panel1" wurde nicht gefunden');
            return;
        }

        collections.forEach(collection => {
            const isDrop = collection.metafields && collection.metafields.length > 0
                ? collection.metafields.find(field => field.key === 'isdrop')?.value === 'false'
                : false;

            // Wenn isdrop FALSE ist, füge das <a>-Element hinzu
            if (isDrop) {
                const collectionLink = document.createElement('a');
                collectionLink.href = `https://shop.fadedcloth.de/?collection=${collection.handle}&hide=TRUE`;
                collectionLink.classList.add('panel-link');
                collectionLink.textContent = collection.handle.toUpperCase();

                panel1.insertBefore(collectionLink, panel1.firstChild);
            }
        });
    })
    .catch(error => {
        console.error('Fehler beim Laden der Kollektionen:', error);
    });
}

// Beim Laden der Seite das Skript ausführen
document.addEventListener('DOMContentLoaded', loadShopifyCollections);
//BUTTONS --END

//SOCIAL --START
document.getElementById('social-select').addEventListener('change', function() {
    const linkElement = document.getElementById('social-select-link');
    const platform = this.value;

    // Links je nach ausgewählter Plattform anpassen
    let href;
    switch (platform) {
        case 'tiktok':
            href = 'https://tiktok.com/@fadedcloth.de';
            break;
        case 'twitter':
            href = 'https://x.com/fadedcloth';
            break;
        case 'instagram':
        default:
            href = 'https://instagram.com/fadedcloth.de';
            break;
    }

    // Link aktualisieren
    linkElement.href = href;

    // Animation hinzufügen und nach Ende entfernen
    linkElement.classList.add('jump');
    linkElement.addEventListener('animationend', function() {
        linkElement.classList.remove('jump');
    });
});
//SOCIAL --END



//BACKBUTTON --START
let backButtonLink = "https://fadedcloth.de/";
            let backButtonText = "BACK TO FADEDCLOTH";
            let backButtonShortText = "BACK";

            function setBackButtonLink(newLink) {
                backButtonLink = newLink;
            }
            function setBackButtonText(newText) {
                document.getElementById("back-button-text").textContent = newText;
            }
            function updateBackButtonText() {
                if (window.innerWidth <= 880) {
                    setBackButtonText(backButtonShortText);
                } else {
                    setBackButtonText(backButtonText);
                }
            }
            document.getElementById("back-button").addEventListener("click", function() {
                window.location.href = backButtonLink;
            });
            window.addEventListener("resize", updateBackButtonText);
            document.addEventListener("DOMContentLoaded", updateBackButtonText);
//BACKBUTTON --END