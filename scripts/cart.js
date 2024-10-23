// Shopify Client initialisieren
const client = ShopifyBuy.buildClient({
    domain: 'checkout.fadedcloth.de',
    storefrontAccessToken: 'ed72f09d8742f37356305b6e49310909' // Deinen tatsächlichen Token verwenden
});

let checkoutId = localStorage.getItem('checkoutId');

if (!checkoutId) {
    // Erstelle neuen Checkout, falls keiner existiert
    client.checkout.create().then((checkout) => {
        checkoutId = checkout.id;
        localStorage.setItem('checkoutId', checkoutId);
        console.log('Neuer Checkout in  cart erstellt:', checkoutId);
    });
} else {
    // Benutze vorhandenen Checkout
    console.log('Vorhandener VON CART GELADEN Checkout:', checkoutId);
}
let selectedVariant = null; // Variante wird z. B. durch ein Dropdown gesetzt.

// Neuen Checkout erstellen
client.checkout.create().then((checkout) => {
    checkoutId = checkout.id; // Speichere die Checkout ID
    createCartButton(); // Erstelle den Warenkorb-Button, nachdem die Checkout ID verfügbar ist
}).catch((error) => {
    console.error('Fehler beim Erstellen des Checkouts:', error);
});

// Funktion zur Erstellung des Cart-Buttons
function createCartButton() {
    const cartButtonContainer = document.getElementById('cart-button-container');
    cartButtonContainer.innerHTML = ''; // Vorhandene Buttons leeren

    const cartButton = document.createElement('button');
    cartButton.innerText = 'CART';
    cartButton.id = 'cart-button';
    cartButton.classList.add('glass-button');
    cartButton.addEventListener('click', function () {
        if (checkoutId) {
            window.location.href = `https://checkout.fadedcloth.de/cart?id=${checkoutId}`;
        } else {
            console.error('Checkout ID fehlt.');
        }
    });

    cartButtonContainer.appendChild(cartButton);
}

// Warte, bis der DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', function () {
    const addToCartButton = document.getElementById('add-to-cart-button');

    if (addToCartButton) {
        addToCartButton.addEventListener('click', function () {
            if (!checkoutId || !selectedVariant) {
                console.error('Checkout ID or Variante fehlt.');
                return;
            }

            addToCartButton.innerText = 'ADDED'; // Button temporär deaktivieren
            addToCartButton.disabled = true;

            client.checkout.addLineItems(checkoutId, [{
                variantId: selectedVariant.id, // Die gewählte Variant-ID
                quantity: 1,
            }]).then(() => {
                setTimeout(() => {
                    addToCartButton.innerText = 'ADD TO CART';
                    addToCartButton.disabled = false; // Nach 3 Sekunden reaktivieren
                }, 3000); // 3 Sekunden Verzögerung
            }).catch((error) => {
                console.error('ERROR ADD TO CART:', error);
            });
        });
    }
});
