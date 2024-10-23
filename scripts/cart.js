function createCartButton() {
    const cartButtonContainer = document.getElementById('cart-button-container');
    cartButtonContainer.innerHTML = ''; // Clear existing buttons

    const cartButton = document.createElement('button');
    cartButton.innerText = 'CART';
    cartButton.id = 'cart-button';
    cartButton.classList.add('glass-button');
    cartButton.addEventListener('click', function () {
        if (checkoutId) {
            window.location.href = `https://checkout.fadedcloth.de/cart?id=${checkoutId}`;
        } else {
            console.error('Checkout ID is missing.');
        }
    });

    cartButtonContainer.appendChild(cartButton);
}

// Call the function to create the button after checkout ID is set
client.checkout.create().then((checkout) => {
    checkoutId = checkout.id; // Store the checkout ID
    createCartButton(); // Create the cart button after checkout ID is available
});
