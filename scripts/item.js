document.addEventListener('DOMContentLoaded', function () {
    const client = ShopifyBuy.buildClient({
        domain: 'r1xgis-xf.myshopify.com',
        storefrontAccessToken: '335b548326a3c899c7918fa32ac9a13e'
    });

    const params = new URLSearchParams(window.location.search);
    const itemId = params.get('item'); // Produkt-ID aus der URL holen

    // Produktdaten abrufen
    client.product.fetch(itemId).then((product) => {
        displayItem(product);

        // Die Produkt-GID (Global ID) für GraphQL anpassen (id muss in base64-Format konvertiert werden)
        const productGID = btoa(`gid://shopify/Product/${itemId}`);

        // Metafelder mit GraphQL abrufen
        client.graphQLClient.send({
            query: `
                query {
                    product(id: "${productGID}") {
                        metafields(first: 10) {
                            edges {
                                node {
                                    key
                                    value
                                }
                            }
                        }
                        images(first: 10) {
                            edges {
                                node {
                                    src
                                }
                            }
                        }
                        variants(first: 10) {
                            edges {
                                node {
                                    id
                                    title
                                    price {
                                        amount
                                    }
                                    selectedOptions {
                                        name
                                        value
                                    }
                                }
                            }
                        }
                    }
                }
            `
        }).then(response => {
            const metafields = response.data.product.metafields.edges;
            let fit, material, country, color, shipping, description2;

            // Metafeld-Werte extrahieren
            metafields.forEach(metafield => {
                switch (metafield.node.key) {
                    case 'fit':
                        fit = metafield.node.value;
                        break;
                    case 'material':
                        material = metafield.node.value;
                        break;
                    case 'country':
                        country = metafield.node.value;
                        break;
                    case 'color':
                        color = metafield.node.value;
                        break;
                    case 'shipping':
                        shipping = metafield.node.value;
                        break;
                    case 'info':
                        description2 = metafield.node.value;
                        break;
                }
            });

            // Versandinformationen anzeigen
            if (shipping) {
                document.getElementById('item-shipping').innerText = `Shipping: ${shipping}`;
            }

            // Info (description2) anzeigen
            if (description2) {
                document.getElementById('item-description2').innerText = description2;
            }

            // Description (mit Material, Country, Color, Fit) anzeigen
            const description = `${material ? material + ' | ' : ''}MADE IN ${country ? country : 'Unknown'} | COLOR: ${color ? color : 'Unknown'} | ${fit ? fit : ''}`;
            document.getElementById('item-description').innerText = description;

        }).catch(error => {
            console.error("Error fetching metafields:", error);
        });

    }).catch((error) => {
        console.error("Error fetching Shopify product:", error);
        document.getElementById('itemDetails').innerHTML = '<p>Failed to fetch product details.</p>';
    });

    // Funktion zum Anzeigen des Produkts
    function displayItem(product) {
        const itemDetails = document.getElementById('itemDetails');
    
        // Überprüfen, ob das Produkt korrekt abgerufen wurde
        if (!product) {
            console.error('Product is undefined or null');
            itemDetails.innerHTML = '<p>Produkt nicht gefunden.</p>';
            return;
        }
    
        // Überprüfen, ob Produktbilder vorhanden sind
        let mainImage = 'fallback-image.jpg'; // Fallback-Bild
        if (product.images && product.images.edges && product.images.edges.length > 0) {
            mainImage = product.images.edges[0].node.src;
        } else {
            console.error('No images found for product');
        }
    
        // Überprüfen, ob Varianten vorhanden sind
        let price = 'N/A';
        if (product.variants && product.variants.edges && product.variants.edges.length > 0) {
            price = product.variants.edges[0].node.price.amount;
        } else {
            console.error('No variants found for product');
        }
    
        // Produktdetails rendern
        itemDetails.innerHTML = `
            <h2>${product.title}</h2>
            <img src="${mainImage}" alt="${product.title}" />
            <p><strong>PRICE: <span id="item-price">${price} EUR</span></strong></p>
            <p id="item-description"></p>
            <p id="item-description2"></p>
            <p id="item-shipping"></p>
            <label for="size-select">SIZE:</label>
            <select id="size-select"></select>
            <div id="buy-now-button"></div>
        `;
    
        const sizeSelect = document.getElementById('size-select');
    
        // Dropdown mit Größen befüllen (Überprüfung auf Varianten)
        if (product.variants && product.variants.edges && product.variants.edges.length > 0) {
            product.variants.edges.forEach(variant => {
                if (variant.node) {
                    const sizeOption = variant.node.selectedOptions.find(option => option.name.toLowerCase() === 'size');
                    if (sizeOption) {
                        const option = document.createElement('option');
                        option.value = variant.node.id; // ID der Variante verwenden
                        option.textContent = sizeOption.value; // Größe anzeigen
                        sizeSelect.appendChild(option);
                    }
                }
            });
        } else {
            console.error('No variants found for product');
        }
    
        // Event Listener für den Dropdown
        sizeSelect.addEventListener('change', function () {
            const selectedVariantId = this.value;
            const selectedVariant = product.variants.edges.find(v => v.node.id === selectedVariantId);
            
            if (selectedVariant) {
                document.getElementById('item-price').innerText = `${selectedVariant.node.price.amount} EUR`;
            } else {
                console.error('Selected variant not found:', selectedVariantId);
            }
        });
    
        // "Buy Now"-Button
        const buyNowButton = document.createElement('button');
        buyNowButton.textContent = "BUY";
        buyNowButton.classList.add('buy-now-button');
        buyNowButton.addEventListener('click', () => {
            const selectedVariantId = sizeSelect.value;
            const quantity = 1;
            buyNow(selectedVariantId, quantity);
        });
        document.getElementById('buy-now-button').appendChild(buyNowButton);
    }

    // Sofortkauf-Button Funktionalität
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
