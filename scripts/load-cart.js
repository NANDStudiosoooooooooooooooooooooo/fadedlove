
document.addEventListener('DOMContentLoaded', function () {
    let checkoutId = null;

    const client = ShopifyBuy.buildClient({
        domain: 'zkwisj-0b.myshopify.com',
        storefrontAccessToken: 'ed72f09d8742f37356305b6e49310909'
    });

    // Create checkout and store checkoutId
    client.checkout.create().then((checkout) => {
        checkoutId = checkout.id;
        console.log("Checkout created:", checkout);  // Log checkout creation
        updateCartUI(checkout);
    }).catch((error) => {
        console.error('Error creating checkout:', error);
    });

    // Create Cart Button and Cart Container
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
        console.log("Updating cart UI with checkout:", checkout); // Debugging the checkout object

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
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                `;
                cartItemsContainer.appendChild(cartItem);

                cartItem.querySelector('.remove-item').addEventListener('click', function () {
                    removeItemFromCart(item.id);
                });
            });
        }
    }

    function updateCartUI(checkout) {
        // Update der Anzahl der Artikel im Warenkorb
        const cartItemCount = document.getElementById('cart-item-count'); // Ersetze mit der tatsächlichen ID deines Cart-Elements
        if (cartItemCount) {
            const itemCount = checkout.lineItems.length; // Anzahl der Artikel im Warenkorb
            cartItemCount.innerText = itemCount > 0 ? itemCount : '0'; // Setze die Anzahl oder zeige '0' an
        } else {
            console.warn('Cart item count element not found');
        }
    
        // Update der Gesamtsumme
        const cartTotal = document.getElementById('cart-total'); // Ersetze mit der ID deines Gesamtpreise-Elements
        if (cartTotal) {
            const totalPrice = checkout.subtotalPrice.amount; // Gesamtpreis
            cartTotal.innerText = `Total: ${totalPrice} ${checkout.currencyCode}`; // Setze den Gesamtpreis
        } else {
            console.warn('Cart total element not found');
        }
    
        // Update der Artikel im Warenkorb
        const cartItemsContainer = document.getElementById('cart-items-container'); // Ersetze mit der ID des Containers für die Artikel
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = ''; // Leere den Container zuerst
    
            // Füge die Artikel im Warenkorb hinzu
            checkout.lineItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item'; // Klasse für die Artikel
    
                // Füge Informationen über den Artikel hinzu
                itemElement.innerHTML = `
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-quantity">Quantity: ${item.quantity}</div>
                    <div class="cart-item-price">${item.variant.price.amount} ${item.variant.price.currencyCode}</div>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                `;
    
                // Füge den Artikel dem Container hinzu
                cartItemsContainer.appendChild(itemElement);
            });
    
            // Füge Event-Listener für den Entfernen-Button hinzu
            const removeButtons = cartItemsContainer.querySelectorAll('.remove-item');
            removeButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const itemId = event.target.getAttribute('data-id');
                    handleRemoveFromCart(itemId);
                });
            });
        } else {
            console.warn('Cart items container not found');
        }
    }
    
    // Funktion zum Entfernen eines Artikels aus dem Warenkorb
    function handleRemoveFromCart(itemId) {
        client.checkout.removeLineItems(checkoutId, [itemId]).then((checkout) => {
            console.log('Item removed from cart:', checkout);
            updateCartUI(checkout); // Aktualisiere die UI nach dem Entfernen
        }).catch((error) => {
            console.error('Error removing item from cart:', error);
        });
    }
    

    function addItemToCart(variantId, quantity = 1) {
        const lineItemsToAdd = [{ variantId, quantity }];

        client.checkout.addLineItems(checkoutId, lineItemsToAdd).then((checkout) => {
            console.log('Item added to cart:', checkout);
            return client.checkout.fetch(checkoutId);  // Fetch latest checkout data
        }).then((updatedCheckout) => {
            console.log("Fetched updated checkout:", updatedCheckout);  // Log the updated checkout
            updateCartUI(updatedCheckout); // Update the UI after adding the item
        }).catch((error) => {
            console.error('Error adding item to cart:', error);
        });
    }

    function removeItemFromCart(itemId) {
        client.checkout.removeLineItems(checkoutId, [itemId]).then((checkout) => {
            console.log('Item removed from cart:', checkout);
            return client.checkout.fetch(checkoutId);  // Fetch latest checkout data
        }).then((updatedCheckout) => {
            console.log("Fetched updated checkout after removal:", updatedCheckout);  // Log the updated checkout
            updateCartUI(updatedCheckout);
        }).catch((error) => {
            console.error('Error removing item from cart:', error);
        });
    }

    document.getElementById('checkout-button').addEventListener('click', function () {
        if (checkoutId) {
            client.checkout.fetch(checkoutId).then((checkout) => {
                window.location.href = checkout.webUrl; // Redirect to Shopify checkout
            }).catch((error) => {
                console.error('Error during checkout:', error);
            });
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
    `;
    document.head.appendChild(style);
});
