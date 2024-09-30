document.addEventListener('DOMContentLoaded', function() {
    const client = ShopifyBuy.buildClient({
        domain: '8d16c7-e5.myshopify.com',
        storefrontAccessToken: '4c5fbcdc72435c7a75e2d99c337f5ed0'
    });

    // Function to update cart count
    function updateCartCount() {
        client.checkout.create().then((checkout) => {
            const itemCount = checkout.lineItems.reduce((total, lineItem) => total + lineItem.quantity, 0);
            document.getElementById('cart-count').textContent = itemCount;
        }).catch((error) => {
            console.error("Error fetching cart:", error);
        });
    }

    // Event listener for the cart button
    const cartButton = document.getElementById('custom-cart-button');
    cartButton.addEventListener('click', () => {
        // Open the cart (you can implement your own cart display logic here)
        console.log("Cart button clicked");
        updateCartCount();
    });

    // Initial cart count update
    updateCartCount();
});
