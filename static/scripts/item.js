//import '../styles/item.scss';
document.addEventListener('DOMContentLoaded', async () => {
    const featuredItemsInner = document.getElementById('featured-items');
    let itemsData = []; // Speichert die Produktdaten

    // Shopify-Daten abrufen
    async function fetchFeaturedItems() {
        const query = `
            {
                products(first: 100) {
                    edges {
                        node {
                            handle
                            title
                            images(first: 1) {
                                edges {
                                    node {
                                        src
                                    }
                                }
                            }
                            variants(first: 1) {
                                edges {
                                    node {
                                        metafields(identifiers: [
                                            {namespace: "custom", key: "colorhex"}
                                        ]) {
                                            key
                                            value
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;

        const response = await fetch('https://checkout.fadedcloth.de/api/2023-04/graphql.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': 'ed72f09d8742f37356305b6e49310909'
            },
            body: JSON.stringify({ query })
        });

        const data = await response.json();
        return data.data.products.edges.map(product => {
            const metafields = product.node.variants.edges[0]?.node.metafields || [];
            const colorHexField = metafields.find(field => field.key === 'colorhex');
            const colorHex = colorHexField ? colorHexField.value : '#ffffff';

            return {
                handle: product.node.handle,
                title: product.node.title,
                imageSrc: product.node.images.edges[0]?.node.src || '',
                color: /^#[0-9A-Fa-f]{6}$/.test(colorHex) ? colorHex : '#ffffff'
            };
        });
    }

    // Ein Item erstellen
    function createItem(data) {
        const item = document.createElement('div');
        item.classList.add('featured-item');
        item.classList.add('floating');

        const eclipse = document.createElement('div');
        eclipse.classList.add('blurred-eclipse-background');
        eclipse.style.backgroundColor = data.color;

        const img = document.createElement('img');
        img.src = data.imageSrc;

        // Klickereignis für Weiterleitung
        item.addEventListener('click', () => {
            window.location.href = `https://fadedcloth.de/item?item=${data.handle}`;
        });

        item.appendChild(eclipse);
        item.appendChild(img);
        return item;
    }

    // Items hinzufügen (doppelte Anzahl für nahtlose Wiederholung)
function initializeItems() {
    const maxItems = 9; // Anzahl eindeutiger Items
    const selectedItems = [];
    const totalItems = itemsData.length;

    // 12 Items auswählen (ggf. doppelte, wenn zu wenige vorhanden sind)
    for (let i = 0; i < maxItems; i++) {
        const randomItem = itemsData[i % totalItems]; // Bei Bedarf doppelte nehmen
        selectedItems.push(randomItem);
    }

    // Die 12 Items 2x hintereinander hinzufügen
    const loopItems = [...selectedItems, ...selectedItems];

    // Die ersten 2 Items noch einmal ans Ende setzen
    loopItems.push(selectedItems[0], selectedItems[1]);

    // Die Items im Container einfügen
    loopItems.forEach(itemData => {
        const item = createItem(itemData);
        featuredItemsInner.appendChild(item); // Hier fügt das Item wirklich dem DOM hinzu
    });

    // Setze die Breite des Containers basierend auf der Anzahl der Items
    const totalWidth = loopItems.length * 130; // Breite eines Items (100px + 30px Abstand)
    featuredItemsInner.style.width = `780px`;
}

document.addEventListener('DOMContentLoaded', () => {
const featuredItemsInner = document.getElementById('featured-items');

// Event-Listener für Hover hinzufügen
featuredItemsInner.addEventListener('mouseover', () => {
    featuredItemsInner.style.animationPlayState = 'paused'; // Animation stoppen
});

featuredItemsInner.addEventListener('mouseout', () => {
    featuredItemsInner.style.animationPlayState = 'running'; // Animation fortsetzen
});
});



    // Hauptfunktion
    async function main() {
        itemsData = await fetchFeaturedItems();
        itemsData = itemsData.sort(() => Math.random() - 0.5).slice(0, 20); // 20 zufällige Items
        initializeItems();
    }

    main();
});

document.addEventListener('DOMContentLoaded', () => {
    const featuredItemsInner = document.querySelector('.featured-items-inner');
    featuredItemsInner.style.animation = 'none';
    requestAnimationFrame(() => {
        setTimeout(() => {
            featuredItemsInner.style.animation = '';
        }, 140);
    });
});

document.getElementById('view-other-products').addEventListener('click',function(){window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'});});