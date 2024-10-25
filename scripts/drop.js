document.addEventListener('DOMContentLoaded', function () {
    
    const client = ShopifyBuy.buildClient({
        domain: 'checkout.fadedcloth.de',
        storefrontAccessToken: 'ed72f09d8742f37356305b6e49310909'
    });

    async function loadProducts() {
        const query = `{
            products(first: 250) {
                edges {
                    node {
                        title
                        handle
                        metafields(first: 10) {
                            edges {
                                node {
                                    namespace
                                    key
                                    value
                                }
                            }
                        }
                    }
                }
            }
        }`;

        const response = await fetch('https://checkout.fadedcloth.de/api/2023-04/graphql.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': 'ed72f09d8742f37356305b6e49310909'
            },
            body: JSON.stringify({ query })
        });

        const result = await response.json();
        return result.data.products;
    }

    // Fetch product data
    client.product.fetchByHandle(itemHandle).then(async (product) => {
        // Fetch metafields
        const variants = await fetchMetafields(itemHandle);
        variants.forEach(variant => {
            metafieldsMap[variant.node.id] = variant.node.metafields;
        });
        displayMetafields(product, metafieldsMap[product.variants[0].id])

        const productDetailsHeader = document.getElementById('product-details-header');
        const productDetailsList = document.getElementById('product-details-list');
        const shippingDetailsHeader = document.getElementById('shipping-details-header');
        const shippingDetailsList = document.getElementById('shipping-details-list');

        if (!productDetailsHeader || !shippingDetailsHeader) {
            console.error("Headers not found");
            return;
        }

        // Event-Listener für das Klicken auf den Header
        productDetailsHeader.addEventListener('click', function () {
            if (productDetailsList.style.display === 'none') {
                productDetailsList.style.display = 'block';
                productDetailsHeader.innerText = 'PRODUCT DETAILS -';
            } else {
                productDetailsList.style.display = 'none';
                productDetailsHeader.innerText = 'PRODUCT DETAILS +';
            }
        });

        // Event-Listener für das Klicken auf den Header
        shippingDetailsHeader.addEventListener('click', function () {
            if (shippingDetailsList.style.display === 'none') {
                shippingDetailsList.style.display = 'block'; 
                shippingDetailsHeader.innerText = 'SHIPPING DETAILS -';
            } else {
                shippingDetailsList.style.display = 'none';
                shippingDetailsHeader.innerText = 'SHIPPING DETAILS +';
            }
        });

        // Display product details and images
        displayProductDetails(product, product.variants[0]);
        displayImages(product);
        
        // Create size buttons
        createSizeButtons(product.variants);
        createAddToCartButton();

        // Create Buy Now button
        const buyNowButtonContainer = document.getElementById('buy-now-button-container');
        buyNowButtonContainer.innerHTML = ''; // Clear existing buttons if any

        const buyNowButton = document.createElement('button');
        buyNowButton.innerText = 'SELECT SIZE'; // Default text
        buyNowButton.id = 'buy-now-button';
        buyNowButton.classList.add('glass-button');
        buyNowButton.classList.add('buy-button');
        buyNowButton.disabled = true; // Disable until size is selected
        buyNowButtonContainer.appendChild(buyNowButton);

        buyNowButton.addEventListener('click', function () {
            if (!selectedVariant || !selectedVariant.available) {

                buyNowButton.classList.remove('shake');

                setTimeout(() => {
                    buyNowButton.classList.add('shake');
                }, 10);
            } else {
                handleBuyNow(); 
            }
        });
        

    }).catch((error) => {
        console.error("Error fetching Shopify product:", error);
        document.querySelector('.item-images-container').innerHTML = '<a class="headline">Failed to fetch product images.</a>';
    });

    function displayMetafields(product, metafields) {
        const itemDetails = document.getElementById('itemDetails');
        const material = metafields.find(field => field.key === 'material')?.value || '';
        const country = metafields.find(field => field.key === 'country')?.value || '';
        const color = metafields.find(field => field.key === 'color')?.value || '';
        const fit = metafields.find(field => field.key === 'fit')?.value || '';
        const shipping = metafields.find(field => field.key === 'shipping')?.value || '';
        const shipping2 = metafields.find(field => field.key === 'shipping2')?.value || '';
        const info = metafields.find(field => field.key === 'info')?.value || '';

        itemDetails.innerHTML = `
        <div class="main-details">
            <p id="product-title">${product.title}</p>
            <p><span id="item-price">${(product.variants[0].price.amount / 1).toFixed(2)} EUR</span></p>
            <div id="image-button-container"></div>
            <div id="size-button-container"></div>
            <div id="buy-now-button-container"></div>
            <div id="add-to-cart-button-container"></div>
        </div>
        <div class="sub-details">
            <div id="product-details" class="product-details-container">
                <div id="product-details-header" class="product-details-header">PRODUCT DETAILS +</div>
                <ul id="product-details-list" class="product-details-list" style="display: none;">
                    <li>- <span id="material">${material}</span></li>
                    <li>- <span id="country">${country}</span></li>
                    <li>- <span id="color">${color}</span></li>
                    <li>- <span id="fit">${fit}</span></li>
                    <li>- <span id="info">${info}</span></li>
                </ul>
            </div>
            <div id="shipping-details" class="shipping-details-container">
                <div id="shipping-details-header" class="shipping-details-header">SHIPPING DETAILS +</div>
                <ul id="shipping-details-list" class="shipping-details-list" style="display: none;">
                    <li>- <span id="shipping">${shipping}</span></li>
                    <li>- <span id="shipping2">${shipping2}</span></li>
                </ul>
            </div>
        </div>    
        `;
    }

    function displayImages(product) {
        const itemImagesContainer = document.getElementById('ItemImages');
        const imageButtonContainer = document.getElementById('image-button-container'); // Container für Bildbuttons
        itemImagesContainer.innerHTML = ''; // Leere den Container
        imageButtonContainer.innerHTML = ''; // Leere den Container für Bildbuttons
    
        if (product.images && Array.isArray(product.images) && product.images.length > 0) {
            const mainImage = document.createElement('img');
            mainImage.src = product.images[0].src;
            mainImage.alt = product.title || 'Product Image';
            mainImage.classList.add('fade-in');
            itemImagesContainer.setAttribute('data-tilt', '')
            itemImagesContainer.appendChild(mainImage);
    
            // Erstelle die Thumbnail-Buttons
            product.images.forEach((image, index) => {
                const thumbButton = document.createElement('button');
                thumbButton.classList.add('thumbnail-button'); // Optional für Styling
                
                const thumbImg = document.createElement('img');
                thumbImg.src = image.src;
                thumbImg.alt = `${product.title} Thumbnail ${index + 1}`;
                thumbImg.classList.add('thumbnail-image');
                thumbButton.appendChild(thumbImg);
    
                // Hinzufügen eines Event Listeners für das Klicken auf das Bild
                thumbButton.addEventListener('click', function () {
                    mainImage.src = image.src;
                    
                    // Trigger fade-in Animation
                    triggerFadeInAnimation(itemImagesContainer);
    
                    updateActiveThumbnail(thumbButton); // Update active thumbnail effect
                });
    
                imageButtonContainer.appendChild(thumbButton);
            });
    
            // Markiere den ersten Button als aktiv
            updateActiveThumbnail(imageButtonContainer.firstChild); // Setze den ersten Button als aktiv
            itemImagesContainer.appendChild(mainImage);
        } else {
            console.error('ERROR');
            itemImagesContainer.innerHTML = '<p>No images available for this product.</p>';
        }
    }
    
    function updateActiveThumbnail(activeButton) {
        const buttons = document.querySelectorAll('.thumbnail-button');
    
        buttons.forEach(button => {
            button.classList.remove('active-image-button');
            button.classList.remove('soft-shake');
        });
    
        activeButton.classList.add('active-image-button');
        activeButton.classList.add('soft-shake');
    }
    
    // Funktion zum Entfernen und erneuten Hinzufügen der fade-in Klasse
    function triggerFadeInAnimation(container) {
        container.classList.remove('fade-in'); // Entferne die fade-in Klasse
    
        // Verwende setTimeout, um sicherzustellen, dass die Klasse nach einer kurzen Pause wieder hinzugefügt wird
        setTimeout(() => {
            container.classList.add('fade-in');
        }, 10); // Kurzer Delay (10ms) um den Browser die Klasse vollständig entfernen zu lassen, bevor sie wieder hinzugefügt wird
    }
    

    function displayProductDetails(product, variant) {
        const productTitle = document.getElementById('product-title');
        const itemPrice = document.getElementById('item-price');

        if (productTitle) {
            productTitle.innerText = product.title || "Kein Titel verfügbar";
        } else {
            console.error("Product title element not found");
        }

        if (itemPrice) {
            const price = variant ? variant.priceV2.amount : product.variants[0].priceV2.amount;
            itemPrice.innerText = `${parseFloat(price).toFixed(2)} EUR`;
        } else {
            console.error("Product price element not found");
        }
    }

    function updatePrice(selectedVariant) {
        const priceElement = document.getElementById('item-price');
        if (priceElement) {
            const price = selectedVariant.priceV2.amount;
            priceElement.innerText = `${parseFloat(price).toFixed(2)} EUR`;
        } else {
            console.error("Price element not found");
        }
    }

    function createAddToCartButton() {
        const addToCartButtonContainer = document.getElementById('add-to-cart-button-container');
        addToCartButtonContainer.innerHTML = '';
        
        const addToCartButton = document.createElement('button');
        addToCartButton.innerText = 'ADD TO CART';
        addToCartButton.id = 'add-to-cart-button';
        addToCartButton.classList.add('add-to-cart');
        addToCartButton.classList.add('glass-button');
        addToCartButton.style.display = 'none'; // Initially hidden
        addToCartButton.addEventListener('click', handleAddToCart);
        addToCartButtonContainer.appendChild(addToCartButton);
    }

    function createSizeButtons(variants) {
        const sizeContainer = document.getElementById('size-button-container');
        
        if (!sizeContainer) {
            console.error("Size button container not found");
            return;
        }

        sizeContainer.innerHTML = '';

        variants.forEach(variant => {
            const sizeButton = document.createElement('button');
            sizeButton.innerText = variant.title;
            sizeButton.classList.add('size-button');

            if (!variant.available) {
                sizeButton.style.textDecoration = 'line-through';
            }

            sizeButton.addEventListener('click', function () {
                handleSizeSelection(variant);
            });
            sizeContainer.appendChild(sizeButton);
        });
    }
    
    function handleSizeSelection(variant) {
        selectedVariant = variant;
    
        document.querySelectorAll('.size-button').forEach(button => {
            button.classList.remove('selected');
        });

        const selectedButton = [...document.querySelectorAll('.size-button')].find(button => button.innerText === variant.title);
        selectedButton.classList.add('selected');
    
        const buyNowButton = document.getElementById('buy-now-button');
        const addToCartButton = document.getElementById('add-to-cart-button');
        buyNowButton.disabled = false;

        if (addToCartButton) {
            addToCartButton.style.display = 'block';
        } else {
        }

        buyNowButton.innerText = 'BUY NOW';

        if (!variant.available) {
            buyNowButton.disabled = false;
            buyNowButton.innerText = 'SOLD OUT';
            
            if (addToCartButton) {
                addToCartButton.style.display = 'none';
            } else {
            }

        }
    
        updatePrice(variant);
        updateMetafields(metafieldsMap[variant.id]);
    }

    function handleAddToCart() {
        if (!selectedVariant) {
            return;
        }
    
        let checkoutId = localStorage.getItem('checkoutId');
        const addToCartButton = document.getElementById('add-to-cart-button');
        addToCartButton.disabled = true; // Disable button
    
        // Wenn keine Checkout-ID existiert, erstelle einen neuen Checkout
        if (!checkoutId) {
            client.checkout.create().then((checkout) => {
                // Speichere die neue Checkout-ID
                localStorage.setItem('checkoutId', checkout.id);
                checkoutId = checkout.id;
    
                // Jetzt Artikel hinzufügen
                return client.checkout.addLineItems(checkoutId, [{
                    variantId: selectedVariant.id,
                    quantity: 1,
                }]);
            }).then((checkout) => {
                // Aktualisiere den Checkout nach dem Hinzufügen des Artikels
                localStorage.setItem('checkoutId', checkout.id); // Sicherstellen, dass die Checkout-ID gespeichert bleibt
                console.log('Item added to cart:', checkout);
    
                // UI-Anpassungen nach dem Hinzufügen
                addToCartButton.innerText = "ADDED";
                setTimeout(() => {
                    addToCartButton.innerText = "ADD TO CART";
                    addToCartButton.disabled = false; // Enable button again after 3 seconds
                }, 3000);
            }).catch((error) => {
                console.error('Error creating checkout or adding item to cart:', error);
                addToCartButton.disabled = false; // Re-enable button in case of error
            });
        } else {
            // Wenn bereits eine Checkout-ID existiert, Artikel hinzufügen
            client.checkout.addLineItems(checkoutId, [{
                variantId: selectedVariant.id,
                quantity: 1,
            }]).then((checkout) => {
                // Sicherstellen, dass die Checkout-ID immer aktuell bleibt
                localStorage.setItem('checkoutId', checkout.id);
                console.log('Item added to cart:', checkout);
    
                // UI-Anpassungen nach dem Hinzufügen
                addToCartButton.innerText = "ADDED";
                setTimeout(() => {
                    addToCartButton.innerText = "ADD TO CART";
                    addToCartButton.disabled = false; // Enable button again after 3 seconds
                }, 3000);
            }).catch((error) => {
                console.error('Error adding item to cart:', error);
                addToCartButton.disabled = false; // Re-enable button in case of error
            });
        }
    }
    
    
    
    

    function handleBuyNow() {
        if (!selectedVariant) {
            console.error('No variant selected.');
            return;
        }
    
        client.checkout.create().then((checkout) => {
            client.checkout.addLineItems(checkout.id, [{
                variantId: selectedVariant.id,
                quantity: 1,
            }]).then((checkout) => {
                window.location.href = checkout.webUrl; // Redirect to Shopify checkout
            }).catch((error) => {
                console.error('Error adding item to checkout:', error);
            });
        }).catch((error) => {
            console.error('Error creating checkout:', error);
        });
    }
    

    function updateMetafields(metafields) {
        const materialElement = document.getElementById('material');
        const countryElement = document.getElementById('country');
        const colorElement = document.getElementById('color');
        const fitElement = document.getElementById('fit');
        const shippingElement = document.getElementById('item-shipping');
    
        if (metafields) {
            materialElement.innerText = metafields.find(field => field.key === 'material')?.value || '-';
            countryElement.innerText = metafields.find(field => field.key === 'country')?.value || '-';
            colorElement.innerText = metafields.find(field => field.key === 'color')?.value || '-';
            fitElement.innerText = metafields.find(field => field.key === 'fit')?.value || '-';
            shippingElement.innerText = metafields.find(field => field.key === 'shipping')?.value || '-';
        }
    }
});