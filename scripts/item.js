document.addEventListener('DOMContentLoaded', function() {
    // Shopify Client initialisieren
    const client = ShopifyBuy.buildClient({
        domain: '8d16c7-e5.myshopify.com',
        storefrontAccessToken: '906f6d35af6057d33826372f56504a5b'
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
            const price = (variant.price / 100).toFixed(2); // Preis in Euro umwandeln (in Cent)

            // Anzeige des Artikels
            itemDetails.innerHTML = `
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <p><strong>PRICE: ${price} EUR</strong></p>
                <p>${item.description2}</p>
                <div id="shopify-cart-button"></div> <!-- Hier wird der Button platziert -->
                <label for="size-select">Select Size:</label>
                <select id="size-select"></select> <!-- Dropdown für Größen -->
            `;

            // Shopify "Add to Cart" Button generieren
            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = "Add to Cart";
            addToCartButton.classList.add('add-to-cart-button');

            // Event-Listener hinzufügen für den "Add to Cart" Button
            addToCartButton.addEventListener('click', () => {
                const sizeSelect = document.getElementById('size-select');
                const selectedVariantId = sizeSelect.value; // Die ID der ausgewählten Variante

                const quantity = 1;
                client.checkout.create().then((checkout) => {
                    client.checkout.addLineItems(checkout.id, [
                        {
                            variantId: selectedVariantId,
                            quantity: quantity
                        }
                    ]).then((checkout) => {
                        alert('Item added to cart!');
                        console.log('Checkout URL:', checkout.webUrl); // Checkout URL für externen Checkout
                    });
                });
            });

            // Button zum Container hinzufügen
            document.getElementById('shopify-cart-button').appendChild(addToCartButton);

            // Bilder zur Container hinzufügen
            item.images.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image;
                imgElement.alt = item.name;
                imagesContainer.appendChild(imgElement);
            });

            // Größenauswahl laden
            loadSizes(product.variants);
        }).catch((error) => {
            console.error("Error fetching Shopify product:", error); // Fehler ausgeben
            itemDetails.innerHTML = '<p>Failed to fetch product details.</p>';
        });
    }

    // Funktion zum Laden der Größen in das Dropdown
    function loadSizes(variants) {
        const sizeSelect = document.getElementById('size-select');
        variants.forEach(variant => {
            const option = document.createElement('option');
            option.value = variant.id; // Hier wird die ID des Varianten-Items gesetzt
            option.textContent = variant.title; // Hier wird der Titel der Variante (Größe) gesetzt
            sizeSelect.appendChild(option);
        });
    }
});
