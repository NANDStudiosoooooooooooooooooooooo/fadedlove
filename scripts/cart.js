document.addEventListener('DOMContentLoaded', function() {
    const client = ShopifyBuy.buildClient({
        domain: '8d16c7-e5.myshopify.com',
        storefrontAccessToken: '4c5fbcdc72435c7a75e2d99c337f5ed0'
    });

    const cartButton = document.getElementById('custom-cart-button');
    cartButton.addEventListener('click', () => {
        client.checkout.create().then((checkout) => {
            // Hier könnte eine Logik zum Öffnen des Checkouts hinzugefügt werden
            window.location.href = checkout.webUrl; // Leitet den Benutzer zur Checkout-Seite
        });
    });

    function addToCart(variantId, quantity) {
        client.checkout.create().then((checkout) => {
            return client.checkout.addLineItems(checkout.id, [{
                variantId: variantId,
                quantity: quantity
            }]);
        }).then((checkout) => {
            alert('Item added to cart!');
            console.log('Checkout URL:', checkout.webUrl); // Checkout URL für externen Checkout
            updateCartCount();
        }).catch((error) => {
            console.error("Error adding item to cart:", error);
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
});