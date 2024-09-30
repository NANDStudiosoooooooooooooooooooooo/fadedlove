document.addEventListener('DOMContentLoaded', function () {
    // Shopify Client initialisieren
    const client = ShopifyBuy.buildClient({
        domain: '8d16c7-e5.myshopify.com',
        storefrontAccessToken: '906f6d35af6057d33826372f56504a5b'
    });

    const cartButton = document.getElementById('custom-cart-button');
    const cartCountSpan = document.getElementById('cart-count');

    // Funktion zum aktualisieren der Anzahl im Warenkorb
    function updateCartCount() {
        client.checkout.getCurrent().then((checkout) => {
            const itemCount = checkout.lineItems.reduce((total, lineItem) => total + lineItem.quantity, 0);
            cartCountSpan.textContent = itemCount;
        }).catch((error) => {
            console.error("Error fetching checkout:", error);
        });
    }

    // Event-Listener für den Warenkorb-Button
    cartButton.addEventListener('click', () => {
        // Hier kannst du die Logik einfügen, um den Warenkorb anzuzeigen, z.B. ein Modal öffnen
        console.log('Cart button clicked!'); // Hier kannst du den Code hinzufügen, um den Warenkorb anzuzeigen
    });

    // Initiales Update der Anzahl im Warenkorb
    updateCartCount();

    // Optional: Aktualisierung der Anzahl im Warenkorb alle paar Sekunden
    setInterval(updateCartCount, 5000); // Alle 5 Sekunden aktualisieren
});
