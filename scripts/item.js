document.addEventListener('DOMContentLoaded', function() {
    // Shopify Client initialisieren
    const client = ShopifyBuy.buildClient({
        domain: '8d16c7-e5.myshopify.com',
        storefrontAccessToken: '4c5fbcdc72435c7a75e2d99c337f5ed0'
    });

    // Fetch the item ID from the query parameter
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get('item');

    // Fetch item data from external JSON file
    fetch('https://fadedcloth.de/JSON/items.json')
        .then(response => response.json())
        .then(data => {
            const item = data.find(i => i.id === itemId);
            if (item) {
                displayItem(item);
            } else {
                document.getElementById('itemDetails').innerHTML = '<p>ITEM NOT FOUND.</p>';
            }
        })
        .catch(error => {
            console.error("Error fetching items JSON:", error);
        });

    function displayItem(item) {
        const itemDetails = document.getElementById('itemDetails');
        const imagesContainer = document.querySelector('.item-images-container');

        // Kodierung der Produkt-ID für den API-Aufruf
        const productId = `gid://shopify/Product/${item.id}`;

        // Fetch die Shopify-Produktdaten
        client.product.fetch(productId).then((product) => {
            const variant = product.variants[0]; // Nimm die Standard-Variante an
            const price = (variant.price / 100).toFixed(2); // Preis umrechnen, da Shopify Preis in Cent gibt

            // Anzeige des Artikels
            itemDetails.innerHTML = `
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <p><strong>PRICE: ${price} EUR</strong></p>
                <p>${item.shipping}</p> <!-- Shipping information -->
                <p>${item.description2}</p> <!-- Hier die description2 hinzufügen -->
                <label for="size-select">Select Size:</label>
                <select id="size-select"></select> <!-- Dropdown für die Größen -->
                <div id="shopify-cart-button"></div> <!-- Hier wird der Button platziert -->
            `;

            // Dropdown mit Größen befüllen
            const sizeSelect = document.getElementById('size-select');
            product.variants.forEach(variant => {
                const option = document.createElement('option');
                option.value = variant.id; // Die ID der Variante wird als Wert verwendet
                option.textContent = variant.title; // Der Titel der Variante wird angezeigt
                sizeSelect.appendChild(option);
            });
        }).catch((error) => {
            console.error("Error fetching Shopify product:", error); // Fehler ausgeben
            itemDetails.innerHTML = '<p>Failed to fetch product details.</p>';
        });

        // Bilder zur Container hinzufügen
        item.images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image;
            imgElement.alt = item.name;
            imagesContainer.appendChild(imgElement);
        });
    }
});