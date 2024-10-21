document.addEventListener('DOMContentLoaded', function () {
    let checkoutId = localStorage.getItem('checkoutId');

    const client = ShopifyBuy.buildClient({
        domain: 'zkwisj-0b.myshopify.com',
        storefrontAccessToken: 'ed72f09d8742f37356305b6e49310909'
    });

    // Hole bestehenden Checkout oder erstelle neuen
    if (!checkoutId) {
        client.checkout.create().then((checkout) => {
            checkoutId = checkout.id;
            localStorage.setItem('checkoutId', checkoutId);
            console.log("Checkout created:", checkout);
            updateCartUI(checkout);
        }).catch((error) => {
            console.error('Error creating checkout:', error);
        });
    } else {
        client.checkout.fetch(checkoutId).then((checkout) => {
            console.log("Fetched existing checkout:", checkout);
            updateCartUI(checkout);
        }).catch((error) => {
            console.error('Error fetching checkout:', error);
        });
    }

    // Funktion zum Hinzufügen von Artikeln
    function addItemToCart(variantId, quantity) {
        if (!variantId || quantity <= 0) {
            console.error('Invalid variantId or quantity.');
            return;
        }

        client.checkout.addLineItems(checkoutId, [{ variantId: variantId, quantity: quantity }])
            .then((checkout) => {
                console.log('Item added to cart:', checkout);
                if (checkout.lineItems.length > 0) {
                    updateCartUI(checkout);
                } else {
                    console.warn('No items in checkout after adding item.');
                }
                localStorage.setItem('checkoutId', checkout.id);
            })
            .catch((error) => {
                console.error('Error adding item to cart:', error);
            });
    }

    // Erstelle den Warenkorb-Button und das Warenkorb-Container
    const cartButton = document.createElement('button');
    cartButton.id = 'cart-button';
    cartButton.innerText = 'Cart (0)';
    cartButton.addEventListener('click', toggleCart);
    document.body.appendChild(cartButton);

    const cartContainer = document.createElement('div');
    cartContainer.id = 'cart-container';
    cartContainer.innerHTML = `
        <div id="cart-header">
            <h2>Your Cart</h2>
            <button id="close-cart">X</button>
        </div>
        <div id="cart-items"></div>
        <div id="cart-footer">
            <button id="checkout-button">Checkout</button>
        </div>
    `;
    document.body.appendChild(cartContainer);
    document.getElementById('close-cart').addEventListener('click', toggleCart);

    function toggleCart() {
        const cart = document.getElementById('cart-container');
        cart.style.display = (cart.style.display === 'none' || cart.style.display === '') ? 'block' : 'none';
    }

    function updateCartUI(checkout) {
        console.log("Updating cart UI with checkout:", checkout); // Debugging-Ausgabe

        const cartButton = document.getElementById('cart-button');
        cartButton.innerText = `Cart (${checkout.lineItems.length})`;

        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        if (checkout.lineItems.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            checkout.lineItems.forEach(item => {
                console.log("Line item found:", item);  // Log each line item for debugging

                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <p>${item.title}</p>
                        <p>Quantity: ${item.quantity}</p>
                        <p>Price: ${(item.variant.priceV2.amount * item.quantity).toFixed(2)} EUR</p>
                    </div>
                    <button class="remove-item glass-button" data-id="${item.id}">Remove</button>
                `;
                cartItemsContainer.appendChild(cartItem);

                cartItem.querySelector('.remove-item').addEventListener('click', function () {
                    removeItemFromCart(item.id);
                });
            });
        }
    }

    function removeItemFromCart(itemId) {
        client.checkout.removeLineItems(checkoutId, [itemId]).then((checkout) => {
            console.log('Item removed from cart:', checkout);
            updateCartUI(checkout); // UI nach der Entfernung aktualisieren
        }).catch((error) => {
            console.error('Error removing item from cart:', error);
        });
    }

    document.getElementById('checkout-button').addEventListener('click', function () {
        if (checkoutId) {
            client.checkout.fetch(checkoutId).then((checkout) => {
                console.log("Checkout fetched:", checkout); // Debugging-Ausgabe

                if (checkout.lineItems.length > 0) {
                    window.location.href = checkout.webUrl; // Weiterleitung zur Shopify-Checkout-Seite
                } else {
                    console.warn('Your cart is empty.'); // Warnung, wenn der Warenkorb leer ist
                }
            }).catch((error) => {
                console.error('Error during checkout:', error);
            });
        } else {
            console.warn('Checkout ID is not defined.'); // Warnung, wenn die Checkout-ID nicht definiert ist
        }
    });

    // Basic CSS for Cart and Button
    const style = document.createElement('style');
    style.innerHTML = `
        #cart-button {
            position: fixed;
            top: 10px;
            right: 10px;
            padding: 10px 20px;
            background-color: #000;
            color: #fff;
            border: none;
            cursor: pointer;
            font-size: 16px;
            z-index: 14000;
        }
        #cart-container {
            display: none;
            position: fixed;
            right: 0;
            top: 0;
            width: 300px;
            height: 100%;
            background-color: white;
            box-shadow: -2px 0 5px rgba(0,0,0,0.5);
            padding: 20px;
            overflow-y: auto;
            z-index: 20000;
        }
        #cart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        #cart-items {
            margin-bottom: 20px;
        }
        .cart-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        .cart-item-info {
            flex-grow: 1;
        }
        .remove-item {
            background-color: red;
            color: white;
            border: none;
            padding: 5px;
            cursor: pointer;
        }
        #checkout-button {
            width: 100%;
            padding: 10px;
            background-color: #000;
            color: #fff;
            border: none;
            cursor: pointer;
        }
        .glass-button {
            background-color: rgba(255, 255, 255, 0.1);
            color: white;
            border: none;
            padding: 5px;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
    `;
    document.head.appendChild(style);
});
