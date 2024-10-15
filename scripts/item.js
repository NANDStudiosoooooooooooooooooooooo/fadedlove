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

        // Die Produkt-GID (Global ID) für GraphQL anpassen
        const productGID = btoa(`gid://shopify/Product/${itemId}`);

        // Metafelder mit GraphQL abrufen (fit, material, country, color, shipping, info)
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
                                }
                            }
                        }
                    }
                }
            `
        }).then(response => {
            const metafields = response.data.product.metafields.edges || [];
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
    
        if (!product) {
            console.error('Product is undefined or null');
            itemDetails.innerHTML = '<p>Produkt nicht gefunden.</p>';
            return;
        }
    
        // Sicherstellen, dass Bilder vorhanden sind
        const mainImage = product.images && product.images[0] && product.images[0].edges && product.images[0].edges[0] ? product.images[0].edges[0].node.src : 'fallback-image.jpg';
        const price = product.variants && product.variants[0] && product.variants[0].edges && product.variants[0].edges[0] ? product.variants[0].edges[0].node.price.amount : 'N/A';
    
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
    
        // Dropdown mit Größen befüllen
        product.variants.forEach(variant => {
            const option = document.createElement('option');
            option.value = variant.node.id;
            option.textContent = variant.node.title;
            sizeSelect.appendChild(option);
        });
    
        // Event Listener für den Dropdown
        sizeSelect.addEventListener('change', function () {
            const selectedVariantId = this.value;
            const selectedVariant = product.variants.find(v => v.node.id === selectedVariantId);
            
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
    
        // Bilder laden
        const imagesContainer = document.querySelector('.item-images-container');
        if (product.images) {
            product.images.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image.edges[0].node.src;
                imgElement.alt = product.title;
                imagesContainer.appendChild(imgElement);
            });
        }
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
