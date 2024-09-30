document.addEventListener('DOMContentLoaded', function () {
    const client = ShopifyBuy.buildClient({
        domain: '8d16c7-e5.myshopify.com',
        storefrontAccessToken: '4c5fbcdc72435c7a75e2d99c337f5ed0'
    });

    function updateCartCount() {
        const checkoutId = localStorage.getItem('checkoutId');
        if (checkoutId) {
            client.checkout.fetch(checkoutId).then((checkout) => {
                const itemCount = checkout.lineItems.reduce((count, lineItem) => count + lineItem.quantity, 0);
                document.getElementById('cart-count').textContent = itemCount; // Hier sollte die ID des Cart-Counts sein
            }).catch((error) => {
                console.error("Error fetching checkout:", error);
            });
        } else {
            document.getElementById('cart-count').textContent = '0'; // Setze auf 0, wenn kein Checkout vorhanden ist
        }
    }

    // Event Listener für den Cart Button
    const cartButton = document.getElementById('cart-button'); // Hier sollte die ID des Cart-Buttons sein
    if (cartButton) {
        cartButton.addEventListener('click', () => {
            const checkoutId = localStorage.getItem('checkoutId');
            if (checkoutId) {
                window.location.href = `https://8d16c7-e5.myshopify.com/cart/${checkoutId}`;
            } else {
                alert('Cart is empty!');
            }
        });
    }

    // Initiale Aktualisierung der Warenkorbanzeige
    updateCartCount();
});
