// Hier wird die Shopify-Clientinitialisierung gemacht
const client = ShopifyBuy.buildClient({
    domain: '8d16c7-e5.myshopify.com',
    storefrontAccessToken: '906f6d35af6057d33826372f56504a5b'
});

// Funktion zum Aktualisieren der Anzahl im Warenkorb
function updateCartCount() {
    const checkoutId = localStorage.getItem('checkoutId');
    if (checkoutId) {
        client.checkout.fetch(checkoutId).then((checkout) => {
            const cartCount = checkout.lineItems.reduce((total, item) => total + item.quantity, 0);
            document.getElementById('cart-count').textContent = cartCount;
        }).catch((error) => {
            console.error("Error fetching checkout:", error);
        });
    } else {
        document.getElementById('cart-count').textContent = 0;
    }
}

// Ereignis-Listener, der beim Laden der Seite die Anzahl im Warenkorb aktualisiert
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount(); // Zähle die Artikel im Warenkorb
});

// Funktion zum Hinzufügen eines Artikels zum Warenkorb
function addToCart(variantId, quantity) {
    client.checkout.create().then((checkout) => {
        localStorage.setItem('checkoutId', checkout.id); // Speichere die checkoutId im localStorage
        return client.checkout.addLineItems(checkout.id, [{ variantId, quantity }]);
    }).then((checkout) => {
        alert('Item added to cart!');
        console.log('Checkout URL:', checkout.webUrl); // Checkout-URL für externen Checkout
        updateCartCount(); // Aktualisiere die Anzahl im Warenkorb
    }).catch((error) => {
        console.error("Error adding item to cart:", error);
    });
}

// Stelle sicher, dass die `addToCart`-Funktion bei Bedarf aufgerufen wird
