const client = ShopifyBuy.buildClient({
    domain: 'checkout.fadedcloth.de',
    storefrontAccessToken: 'ed72f09d8742f37356305b6e49310909'
});

// Hole die Cart-ID aus dem LocalStorage oder erstelle eine neue Cart
let cartId = localStorage.getItem('cartId');
console.log(cartId);

if (!cartId) {
    // Erstelle neuen Cart, falls keiner existiert
    client.cart.create().then((cart) => {
        cartId = cart.id;
        localStorage.setItem('cartId', cartId);
        console.log('Neuer Cart erstellt:', cartId);
    }).catch((error) => {
        console.error('Fehler beim Erstellen des Carts:', error);
    });
} else {
    console.log('Vorhandener Cart geladen:', cartId);
}

const cartButtonContainer = document.getElementById('cart-button-container');
cartButtonContainer.innerHTML = ''; // Vorhandene Buttons leeren

const cartButton = document.createElement('button');
cartButton.innerText = 'CART';
cartButton.id = 'cart-button';
cartButton.classList.add('glass-button');

cartButton.addEventListener('click', function () {
    let currentCartId = localStorage.getItem('cartId');
    
    if (currentCartId) {
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
                  cart(id: "gid://shopify/Cart/${currentCartId}") {
                    checkoutUrl
                  }
                }
                `
            })
        })
        .then(response => response.json())
        .then(data => {
            const checkoutUrl = data?.data?.cart?.checkoutUrl;
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
        console.error('Cart ID fehlt.');
    }
});

cartButtonContainer.appendChild(cartButton);
