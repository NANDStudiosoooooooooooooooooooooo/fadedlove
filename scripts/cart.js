const storefrontAccessToken = 'ed72f09d8742f37356305b6e49310909';
const apiUrl = 'https://checkout.fadedcloth.de/api/2023-07/graphql.json';

// Hole die Cart-ID aus dem LocalStorage oder erstelle eine neue Cart
let cartId = localStorage.getItem('cartId');
console.log(cartId);

if (!cartId) {
    // Erstelle eine neue Cart über eine GraphQL-Anfrage
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
        },
        body: JSON.stringify({
            query: `
            mutation {
              cartCreate {
                cart {
                  id
                }
              }
            }
            `
        })
    })
    .then(response => response.json())
    .then(data => {
        cartId = data?.data?.cartCreate?.cart?.id;
        if (cartId) {
            localStorage.setItem('cartId', cartId);
            console.log('Neuer Cart erstellt:', cartId);
        } else {
            console.error('Fehler beim Erstellen des Carts.');
        }
    })
    .catch(error => {
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
        // GraphQL-Abfrage zur Abrufung der Checkout-URL
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
            },
            body: JSON.stringify({
                query: `
                query {
                  cart(id: "${currentCartId}") {
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

document.getElementById('cart-button').addEventListener('click', function(event) {
    // Optionally, you could prevent the default behavior here if you're doing something else
    // event.preventDefault();
    
    // Optionally, you can handle opening a cart drawer or similar functionality here
    window.location.href = 'https://checkout.fadedcloth.de/cart';  // Navigate to the cart page
});
