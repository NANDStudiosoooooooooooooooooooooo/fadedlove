document.addEventListener('DOMContentLoaded', function () {
    const client = ShopifyBuy.buildClient({
        domain: 'r1xgis-xf.myshopify.com',
        storefrontAccessToken: '335b548326a3c899c7918fa32ac9a13e'
    });

    const params = new URLSearchParams(window.location.search);
    const itemId = params.get('item'); // Die Produkt-ID aus der URL holen

    // Produktdaten abrufen
    const productId = `gid://shopify/Product/${itemId}`;

    // Hauptfunktion, um das Produkt über die API zu laden
    client.product.fetch(productId).then((product) => {
        // Anzeige des Produkts starten
        displayItem(product);

        // GraphQL-Abfrage für die Metafelder (material, country, color, fit, shipping, info)
        client.graphQLClient.send({
            query: `
              query {
                product(id: "${productId}") {
                  metafields(first: 10) {
                    edges {
                      node {
                        key
                        value
                      }
                    }
                  }
                }
              }
            `
        }).then(response => {
            const metafields = response.data.product.metafields.edges;
            let material, country, color, fit, shipping, description2;

            // Durch die Metafelder loopen und Werte zuweisen
            metafields.forEach(metafield => {
                switch(metafield.node.key) {
                    case 'material':
                        material = metafield.node.value;
                        break;
                    case 'country':
                        country = metafield.node.value;
                        break;
                    case 'color':
                        color = metafield.node.value;
                        break;
                    case 'fit':
                        fit = metafield.node.value;
                        break;
                    case 'shipping':
                        shipping = metafield.node.value;
                        break;
                    case 'info':
                        description2 = metafield.node.value;
                        break;
                }
            });

            // Beschreibung formatieren und anzeigen
            const description = `${material} | MADE IN ${country} | COLOR: ${color} | ${fit}`;
            document.getElementById('item-description').innerText = description;

            // Versandinformationen anzeigen
            if (shipping) {
                document.getElementById('item-shipping').innerText = `Shipping: ${shipping}`;
            }

            // Description2 (info Metafeld) anzeigen
            if (description2) {
                document.getElementById('item-description2').innerText = description2;
            }
        }).catch(error => {
            console.error("Error fetching metafields:", error);
        });

    }).catch((error) => {
        console.error("Error fetching Shopify product:", error);
        document.getElementById('itemDetails').innerHTML = '<p>Failed to fetch product details.</p>';
    });

    function displayItem(product) {
        const itemDetails = document.getElementById('itemDetails');

        // Standardvariante setzen
        let currentVariant = product.variants[0];
        updatePriceDisplay(currentVariant); // Preis initial setzen

        // HTML für die Produktanzeige
        itemDetails.innerHTML = `
            <h2>${product.title}</h2>
            <div class="item-images-container"></div>
            <p><strong>PRICE: <span id="item-price">${currentVariant.price.amount} EUR</span></strong></p>
            <p id="item-description"></p>
            <p id="item-description2"></p>
            <p id="item-shipping"></p>
            <label for="size-select">SIZE:</label>
            <select id="size-select"></select>
            <div id="buy-now-button"></div>
        `;

        // Dropdown mit Größen befüllen
        const sizeSelect = document.getElementById('size-select');
        product.variants.forEach(variant => {
            const option = document.createElement('option');
            option.value = variant.id; // ID der Variante verwenden
            option.textContent = variant.title; // Titel der Variante anzeigen
            sizeSelect.appendChild(option);
        });

        // Event Listener für den Dropdown
        sizeSelect.addEventListener('change', function () {
            const selectedVariantId = this.value;
            currentVariant = product.variants.find(v => v.id === selectedVariantId);
            updatePriceDisplay(currentVariant);
        });

        // "Buy Now" Button generieren
        const buyNowButton = document.createElement('button');
        buyNowButton.textContent = "BUY";
        buyNowButton.classList.add('buy-now-button');
        buyNowButton.addEventListener('click', () => {
            const selectedVariantId = sizeSelect.value;
            const quantity = 1;
            buyNow(selectedVariantId, quantity);
        });
        document.getElementById('buy-now-button').appendChild(buyNowButton);

        // Bilder zur Container hinzufügen
        const imagesContainer = document.querySelector('.item-images-container');
        product.images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.alt = product.title;
            imagesContainer.appendChild(imgElement);
        });
    }

    function updatePriceDisplay(variant) {
        const priceElement = document.getElementById('item-price');
        if (priceElement) {
            priceElement.textContent = `${(variant.price.amount).toFixed(2)} EUR`;
        } else {
            console.error("Price element not found");
        }
    }

    // Sofortiger Kauf-Button-Funktionalität
    function buyNow(variantId, quantity) {
        client.checkout.create().then((checkout) => {
            return client.checkout.addLineItems(checkout.id, [{
                variantId: variantId,
                quantity: quantity
            }]);
        }).then((checkout) => {
            // Weiterleitung zum Shopify Checkout
            window.location.href = checkout.webUrl;
        }).catch((error) => {
            console.error("Error during buy now:", error);
        });
    }
});
