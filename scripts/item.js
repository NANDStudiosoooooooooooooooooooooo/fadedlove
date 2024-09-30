document.addEventListener('DOMContentLoaded', function() {
    // Shopify Client initialisieren
    const client = ShopifyBuy.buildClient({
        domain: '8d16c7-e5.myshopify.com',
        storefrontAccessToken: '906f6d35af6057d33826372f56504a5b'
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
        })
        .catch(error => {
            console.error("Error fetching items JSON:", error);
        });

    // Function to display the item details and add Shopify "Add to Cart" button
    function displayItem(item) {
        const itemDetails = document.getElementById('itemDetails');
        const imagesContainer = document.querySelector('.item-images-container');

        // Fetch the Shopify product and display the Shopify price
        client.product.fetch(item.shopifyId).then((product) => {
            console.log(product); // Debugging: Check if the product is fetched correctly
            const variant = product.variants[0]; // Default variant
            const price = variant.price;

            // Display item name, description, and Shopify price
            itemDetails.innerHTML = `
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <p><strong>PRICE: ${price} USD</strong></p>
                <p>${item.description2}</p>
                <div id="shopify-cart-button"></div>
            `;

            // Generate Shopify "Add to Cart" button
            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = "Add to Cart";
            addToCartButton.classList.add('add-to-cart-button');

            // Event listener for "Add to Cart" button
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
                        console.log('Checkout URL:', checkout.webUrl); // External checkout link
                    });
                });
            });

            // Add button to the container
            document.getElementById('shopify-cart-button').appendChild(addToCartButton);
        }).catch((error) => {
            console.error("Error fetching Shopify product:", error);
        });

        // Loop through images and add to the images container
        item.images?.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image;
            imgElement.alt = item.name;
            imagesContainer.appendChild(imgElement);
        });
    }
});