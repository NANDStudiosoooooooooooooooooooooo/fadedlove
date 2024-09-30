document.addEventListener('DOMContentLoaded', function () {
    const client = ShopifyBuy.buildClient({
        domain: '8d16c7-e5.myshopify.com',
        storefrontAccessToken: '4c5fbcdc72435c7a75e2d99c337f5ed0'
    });

    const params = new URLSearchParams(window.location.search);
    const itemId = params.get('item');

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
        const productId = `gid://shopify/Product/${item.id}`;

        client.product.fetch(productId).then((product) => {
            // Standardvariante setzen
            let currentVariant = product.variants[0];
            updatePriceDisplay(currentVariant); // Preis initial setzen

            // Anzeige des Artikels
            itemDetails.innerHTML = `
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <p><strong>PRICE: <span id="item-price">${(currentVariant.price / 100).toFixed(2)} EUR</span></strong></p>
                <p>${item.shipping}</p>
                <p>${item.description2}</p>
                <label for="size-select">Select Size:</label>
                <select id="size-select"></select>
                <div id="shopify-cart-button"></div>
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

            // Shopify "Add to Cart" Button generieren
            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = "Add to Cart";
            addToCartButton.classList.add('add-to-cart-button');
            addToCartButton.addEventListener('click', () => {
                const selectedVariantId = sizeSelect.value;
                const quantity = 1;
                addToCart(selectedVariantId, quantity);
            });
            document.getElementById('shopify-cart-button').appendChild(addToCartButton);

            // Bilder zur Container hinzufügen
            const imagesContainer = document.querySelector('.item-images-container');
            if (imagesContainer) {
                item.images.forEach(image => {
                    const imgElement = document.createElement('img');
                    imgElement.src = image;
                    imgElement.alt = item.name;
                    imagesContainer.appendChild(imgElement);
                });
            }
        }).catch((error) => {
            console.error("Error fetching Shopify product:", error);
            itemDetails.innerHTML = '<p>Failed to fetch product details.</p>';
        });
    }

    function updatePriceDisplay(variant) {
        const priceElement = document.getElementById('item-price');
        if (priceElement) { // Überprüfen, ob priceElement existiert
            priceElement.textContent = `${(variant.price / 100).toFixed(2)} EUR`;
        } else {
            console.error("Price element not found");
        }
    }

    function addToCart(variantId, quantity) {
        client.checkout.create().then((checkout) => {
            localStorage.setItem('checkoutId', checkout.id);
            return client.checkout.addLineItems(checkout.id, [{
                variantId: variantId,
                quantity: quantity
            }]);
        }).then((checkout) => {
            alert('Item added to cart!');
            updateCartCount(); // Diese Funktion muss in cart.js definiert sein
        }).catch((error) => {
            console.error("Error adding item to cart:", error);
        });
    }
});
