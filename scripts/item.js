// Shopify Client initialisieren
const client = ShopifyBuy.buildClient({
    domain: '8d16c7-e5.myshopify.com', // Ersetze mit deinem Shopify-Shop-Domainnamen
    storefrontAccessToken: '4c5fbcdc72435c7a75e2d99c337f5ed0' // Ersetze mit deinem API Access Token
});

// Fetch the item ID from the query parameter
const params = new URLSearchParams(window.location.search);
const itemId = params.get('item');

// Fetch item data from external JSON file
fetch('https://fadedcloth.de/JSON/items.json')
    .then(response => response.json())
    .then(data => {
        const item = data.find(i => i.id === itemId);
        if (item) {
            displayItem(item);
        } else {
            document.getElementById('itemDetails').innerHTML = '<p>ITEM NOT FOUND.</p>';
        }
    });

// Function to display the item details and add Shopify "Add to Cart" button
function displayItem(item) {
    const itemDetails = document.getElementById('itemDetails');
    const imagesContainer = document.querySelector('.item-images-container');

    // Fetch the Shopify product and display the Shopify price
    client.product.fetch(item.shopifyId).then((product) => {
        const variant = product.variants[0]; // Assuming you're using the default variant
        const price = variant.price;

        // Display item name, description, and Shopify price
        itemDetails.innerHTML = `
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <p><strong>PRICE: ${price} USD</strong></p>
            <p>${item.description2}</p>
            <div id="shopify-cart-button"></div> <!-- Hier wird der Button platziert -->
        `;

        // Shopify "Add to Cart" Button generieren
        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.classList.add('add-to-cart-button');

        // Event-Listener hinzufügen für den "Add to Cart" Button
        addToCartButton.addEventListener('click', () => {
            const quantity = 1;
            client.checkout.create().then((checkout) => {
                client.checkout.addLineItems(checkout.id, [
                    {
                        variantId: variant.id,
                        quantity: quantity
                    }
                ]).then((checkout) => {
                    alert('Item added to cart!');
                    console.log('Checkout URL:', checkout.webUrl); // Checkout URL für externen Checkout
                });
            });
        });

        // Button zum Container hinzufügen
        document.getElementById('shopify-cart-button').appendChild(addToCartButton);
    });

    // Loop through images and add to the images container
    item.images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = item.name;
        imagesContainer.appendChild(imgElement);
    });
}