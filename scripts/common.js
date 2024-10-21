function updateCartUI(checkout) {
    const cartButton = document.getElementById('cart-button');
    cartButton.innerText = `Cart (${checkout.lineItems.length})`;

    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (checkout.lineItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        checkout.lineItems.forEach(item => {
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

function removeItemFromCart(client, checkoutId, itemId) {
    client.checkout.removeLineItems(checkoutId, [itemId]).then((checkout) => {
        updateCartUI(checkout); // Update UI after removal
    }).catch((error) => {
        console.error('Error removing item from cart:', error);
    });
}
