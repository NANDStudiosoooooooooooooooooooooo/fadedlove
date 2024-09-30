document.addEventListener('DOMContentLoaded', function() {
    const client = ShopifyBuy.buildClient({
        domain: '8d16c7-e5.myshopify.com',
        storefrontAccessToken: '4c5fbcdc72435c7a75e2d99c337f5ed0'
    });

    const cartButton = document.getElementById('custom-cart-button');

    // Event Listener für den Cart Button
    cartButton.addEventListener('click', () => {
        openCart();
    });

    // Funktion zum Öffnen des Standard-Cart
    function openCart() {
        // Holen Sie sich den Checkout-ID von der Speicherung (localStorage oder sessionStorage)
        const checkoutId = localStorage.getItem('checkoutId');

        if (checkoutId) {
            // Shopify Checkout öffnen
            const cartUrl = `https://${client.domain}/cart/${checkoutId}`;
            window.open(cartUrl, '_blank'); // Öffnet den Cart in einem neuen Tab
        } else {
            console.warn("No checkout ID found.");
        }
    }

    // Funktion zum Aktualisieren der Artikelanzahl im Cart
    function updateCartCount() {
        const checkoutId = localStorage.getItem('checkoutId');
        if (checkoutId) {
            client.checkout.fetch(checkoutId).then((checkout) => {
                const itemCount = checkout.lineItems.reduce((total, lineItem) => total + lineItem.quantity, 0);
                document.getElementById('cart-count').textContent = itemCount;
            }).catch((error) => {
                console.error("Error fetching cart:", error);
            });
        }
    }

    // Aufruf der updateCartCount-Funktion beim Laden der Seite
    updateCartCount();
});
