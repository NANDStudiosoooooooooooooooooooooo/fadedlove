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
            const sizeSelect = document.getElementById('size-select');

            // Initialisiere den Preis mit der Standard-Variante
            const variant = product.variants[0];
            const price = (variant.price / 100).toFixed(2); // Preis umrechnen, da Shopify Preis in Cent gibt

            // Anzeige des Artikels
            itemDetails.innerHTML = `
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <p><strong>PRICE: <span id="current-price">${price} EUR</span></strong></p>
                <p>${item.shipping}</p>
                <p>${item.description2}</p>
                <label for="size-select">Select Size:</label>
                <select id="size-select"></select>
                <div id="shopify-cart-button"></div>
            `;

            // Dropdown mit Größen befüllen
            product.variants.forEach(variant => {
                const option = document.createElement('option');
                option.value = variant.id;
                option.textContent = variant.title;
                sizeSelect.appendChild(option);
            });

            // Preis aktualisieren bei Auswahl der Variante
            sizeSelect.addEventListener('change', (event) => {
                const selectedVariant = product.variants.find(v => v.id === event.target.value);
                const selectedPrice = (selectedVariant.price / 100).toFixed(2);
                document.getElementById('current-price').textContent = `${selectedPrice} EUR`;
            });

            // Shopify "Add to Cart" Button generieren
            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = "Add to Cart";
            addToCartButton.classList.add('add-to-cart-button');

            // Event-Listener für den "Add to Cart" Button
            addToCartButton.addEventListener('click', () => {
                const selectedVariantId = sizeSelect.value;
                const quantity = 1;
                addToCart(selectedVariantId, quantity);
            });

            // Button zum Container hinzufügen
            document.getElementById('shopify-cart-button').appendChild(addToCartButton);
        }).catch((error) => {
            console.error("Error fetching Shopify product:", error);
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

    function addToCart(variantId, quantity) {
        client.checkout.create().then((checkout) => {
            return client.checkout.addLineItems(checkout.id, [{
                variantId: variantId,
                quantity: quantity
            }]);
        }).then((checkout) => {
            alert('Item added to cart!');
            console.log('Checkout URL:', checkout.webUrl);
            updateCartCount();
        }).catch((error) => {
            console.error("Error adding item to cart:", error);
        });
    }
});
