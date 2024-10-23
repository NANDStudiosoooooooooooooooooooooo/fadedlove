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
        console.log('Neuer Checkout in cart erstellt:', checkoutId);
    });
} else {
    // Benutze vorhandenen Checkout
    console.log('Vorhandener Checkout geladen:', checkoutId);
}

const cartButtonContainer = document.getElementById('cart-button-container');
cartButtonContainer.innerHTML = ''; // Vorhandene Buttons leeren
const cartButton = document.createElement('button');
cartButton.innerText = 'CART';
cartButton.id = 'cart-button';
cartButton.classList.add('glass-button');
cartButton.addEventListener('click', function () {
    let NewCheckoutId = localStorage.getItem('checkoutId');
    if (NewCheckoutId) {
        window.location.href = `https://checkout.fadedcloth.de/cart?id=${NewCheckoutId}`;
        console.log(`https://checkout.fadedcloth.de/cart?id=${NewCheckoutId}`);
    } else {
        console.error('Checkout ID fehlt.');
    }
});
cartButtonContainer.appendChild(cartButton);
