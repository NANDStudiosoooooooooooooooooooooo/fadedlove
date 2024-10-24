const client = ShopifyBuy.buildClient({
    domain: 'checkout.fadedcloth.de',
    storefrontAccessToken: 'ed72f09d8742f37356305b6e49310909'
});

let checkoutId = localStorage.getItem('checkoutId');
console.log(checkoutId);

if (!checkoutId) {
    // Erstelle neuen Checkout, falls keiner existiert
    client.checkout.create().then((checkout) => {
        checkoutId = checkout.id;
        localStorage.setItem('checkoutId', checkoutId);
        console.log('Neuer Checkout erstellt:', checkoutId);
    }).catch((error) => {
        console.error('Fehler beim Erstellen des Checkouts:', error);
    });
} else {
    console.log('Vorhandener Checkout geladen:', checkoutId);
}

const cartButtonContainer = document.getElementById('cart-button-container');
cartButtonContainer.innerHTML = ''; // Vorhandene Buttons leeren

const cartButton = document.createElement('button');
cartButton.innerText = 'CART';
cartButton.id = 'cart-button';
cartButton.classList.add('glass-button');

cartButton.addEventListener('click', function () {
    let currentCheckoutId = localStorage.getItem('checkoutId');
    
    if (currentCheckoutId) {
        // GraphQL Abfrage zur Abrufung der Checkout-URL
        fetch('https://checkout.fadedcloth.de/api/2023-07/graphql.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': 'ed72f09d8742f37356305b6e49310909',
            },
            body: JSON.stringify({
                query: `
                query {
                  cart(id: "${currentCheckoutId}") {
                    checkoutUrl
                  }
                }
                `
            })
        })
        .then(response => response.json())
        .then(data => {
            const checkoutUrl = data.data.cart.checkoutUrl;
            if (checkoutUrl) {
                // Leite den Benutzer zum Checkout weiter
                window.location.href = checkoutUrl;
                console.log(`Redirecting to: ${checkoutUrl}`);
            } else {
                console.error('Checkout URL konnte nicht abgerufen werden.');
            }
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Checkout-URL:', error);
        });
    } else {
        console.error('Checkout ID fehlt.');
    }
});

cartButtonContainer.appendChild(cartButton);
