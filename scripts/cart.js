document.addEventListener('DOMContentLoaded', function() {
    const client = ShopifyBuy.buildClient({
        domain: '8d16c7-e5.myshopify.com',
        storefrontAccessToken: '4c5fbcdc72435c7a75e2d99c337f5ed0'
    });

    const cartButton = document.getElementById('custom-cart-button');
    cartButton.addEventListener('click', () => {
        openCart();
    });

    function openCart() {
        client.checkout.create().then((checkout) => {
            window.open(checkout.webUrl, '_blank'); // Öffnet den Shopify-Cart in einem neuen Tab
        }).catch((error) => {
            console.error("Error opening cart:", error);
        });
    }

    function updateCartCount() {
        client.checkout.getCurrent().then((checkout) => {
            const itemCount = checkout.lineItems.reduce((total, lineItem) => total + lineItem.quantity, 0);
            document.getElementById('cart-count').textContent = itemCount;
        }).catch((error) => {
            console.error("Error fetching cart:", error);
        });
    }

    // Initialisiere die Anzahl der Artikel im Cart
    updateCartCount();
});
