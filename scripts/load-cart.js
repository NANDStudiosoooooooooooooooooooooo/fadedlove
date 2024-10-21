// Shopify API Setup
const shopifyClient = ShopifyBuy.buildClient({
    domain: 'zkwisj-0b.myshopify.com',
    storefrontAccessToken: 'ed72f09d8742f37356305b6e49310909'
});

let checkoutId = localStorage.getItem('checkoutId');

if (!checkoutId) {
    shopifyClient.checkout.create().then((checkout) => {
        checkoutId = checkout.id;
        localStorage.setItem('checkoutId', checkoutId);
    });
}

// Create Cart Button
const cartButton = document.createElement('button');
cartButton.id = 'cart-button';
cartButton.innerHTML = `CART (0)`;
cartButton.style.position = 'fixed';
cartButton.style.top = '10px';
cartButton.style.right = '10px';
document.body.appendChild(cartButton);

// Create Cart Container
const cartContainer = document.createElement('div');
cartContainer.id = 'cart-container';
cartContainer.style.display = 'none';
cartContainer.style.position = 'fixed';
cartContainer.style.top = '50px';
cartContainer.style.right = '10px';
cartContainer.style.backgroundColor = 'white';
cartContainer.style.border = '1px solid #ccc';
cartContainer.style.padding = '10px';
document.body.appendChild(cartContainer);

// Toggle Cart Visibility
cartButton.addEventListener('click', () => {
    cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
});

// Update Cart UI
function updateCartUI(checkout) {
    cartButton.innerHTML = `CART (${checkout.lineItems.length})`;
    cartContainer.innerHTML = '';

    checkout.lineItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <img src="${item.variant.image.src}" alt="${item.title}" width="50">
            <span>${item.title} - ${item.variant.title}</span>
            <span>${item.quantity} x ${item.variant.price}</span>
            <button class="remove-item" data-id="${item.id}">X</button>
        `;
        cartContainer.appendChild(itemElement);
    });

    if (checkout.lineItems.length > 0) {
        const checkoutButton = document.createElement('button');
        checkoutButton.innerHTML = `CHECKOUT - ${checkout.totalPrice}`;
        checkoutButton.addEventListener('click', () => {
            window.location.href = checkout.webUrl;
        });
        cartContainer.appendChild(checkoutButton);
    }
}

// Handle Add to Cart
function handleAddToCart(selectedVariant) {
    if (!selectedVariant) {
        console.warn('No variant selected.');
        return;
    }

    shopifyClient.checkout.addLineItems(checkoutId, [{
        variantId: selectedVariant.id,
        quantity: 1,
    }]).then((checkout) => {
        console.log('Item added to cart:', checkout);
        updateCartUI(checkout);
    }).catch((error) => {
        console.error('Error adding item to cart:', error);
    });
}

// Handle Remove from Cart
cartContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item')) {
        const lineItemId = event.target.getAttribute('data-id');
        shopifyClient.checkout.removeLineItems(checkoutId, [lineItemId]).then((checkout) => {
            updateCartUI(checkout);
        }).catch((error) => {
            console.error('Error removing item from cart:', error);
        });
    }
});

// Load Cart on Page Load
window.addEventListener('load', () => {
    if (checkoutId) {
        shopifyClient.checkout.fetch(checkoutId).then((checkout) => {
            updateCartUI(checkout);
        }).catch((error) => {
            console.error('Error fetching checkout:', error);
        });
    }
});
