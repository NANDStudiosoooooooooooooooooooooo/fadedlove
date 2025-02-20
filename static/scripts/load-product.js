document.addEventListener('DOMContentLoaded', function () {
    let selectedVariant = null; // Store the selected variant
    const metafieldsMap = {}; // Make metafieldsMap global


    const client = ShopifyBuy.buildClient({
        domain: 'https://fadedcloth-dev.myshopify.com',
        storefrontAccessToken: '164c16be080cbc521c378eb87142486d'
    });
    client.checkout.create().then((checkout) => {
        checkoutId = checkout.id; // Speichere die Checkout-ID
    }).catch((error) => {
        console.error('Error creating checkout:', error);
    });

    const params = new URLSearchParams(window.location.search);
    const itemHandle = params.get('item');
    const itemId = params.get('item_id');
    console.log("Item Handle from URL:", itemHandle);
    console.log("Item ID from URL:", itemId);

    async function fetchMetafields(handle, id) {
        let query = '';
        
        if (id) {
            query = `
            {
                product(id: "gid://shopify/Product/${id}") {
                    variants(first: 12) {
                        edges {
                            node {
                                id
                                title
                                metafields(identifiers: [
                                    {namespace: "custom", key: "size"},
                                    {namespace: "custom", key: "product"},
                                    {namespace: "custom", key: "colorhex"},
                                    {namespace: "custom", key: "shipping"}
                                ]) {
                                    key
                                    value
                                }
                            }
                        }
                    }
                }
            }`;
        } else if (handle) {
            query = `
            {
                productByHandle(handle: "${handle}") {
                    variants(first: 12) {
                        edges {
                            node {
                                id
                                title
                                metafields(identifiers: [
                                    {namespace: "custom", key: "size"},
                                    {namespace: "custom", key: "colorhex"},
                                    {namespace: "custom", key: "product"},
                                    {namespace: "custom", key: "shipping"}
                                ]) {
                                    key
                                    value
                                }
                            }
                        }
                    }
                }
            }`;
        }
    
        const response = await fetch('https://fadedcloth-dev.myshopify.com/api/2023-04/graphql.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': '164c16be080cbc521c378eb87142486d'
            },
            body: JSON.stringify({ query })
        });
    
        const result = await response.json();
        const product = id ? result.data.product : result.data.productByHandle;
        const variants = product?.variants?.edges || [];

    // Farbe nur aus der ersten Variante holen
    let colorHex = "#ffffff"; // Standardfarbe (weiß)

        const metafields = variants[0]?.node?.metafields || [];
        const colorHexField = metafields.find(field => field.key === 'colorhex');
        if (colorHexField) {
            colorHex = colorHexField.value;
        }

        console.log("🎨 Geladene Farbe:", colorHex);

        // Falls die Farbe ungültig ist oder weiß ist, auf Schwarz setzen
        const finalColor = /^#[0-9A-Fa-f]{6}$/.test(colorHex) && colorHex !== '#ffffff' ? colorHex : '#ffffff';


        console.log("🎨 Final genutzte Farbe:", finalColor);

        // Setze die Farbvariablen in `background_wrapper`
        const backgroundWrapper = document.getElementById('background_wrapper');
        if (backgroundWrapper) {
            backgroundWrapper.style.setProperty('--color-two', finalColor);
            backgroundWrapper.style.setProperty('--color-three', finalColor);
            backgroundWrapper.style.setProperty('--color-four', finalColor);
            backgroundWrapper.style.setProperty('--color-five', '#ffffff' );
            console.log("🎨 Farbvariablen gesetzt auf:", finalColor);
        } else {
            console.warn("⚠️ Warnung: Element #background_wrapper nicht gefunden.");
        }

        return variants;
    }

    

    // Fetch product data
    client.product.fetchByHandle(itemHandle).then(async (product) => {
        // Fetch metafields
        const variants = await fetchMetafields(itemHandle, itemId);
        variants.forEach(variant => {
            metafieldsMap[variant.node.id] = variant.node.metafields;
        });
        displayMetafields(product, metafieldsMap[product.variants[0].id])

        const productDetailsHeader = document.getElementById('product-details-header');
        const productDetailsList = document.getElementById('product-details-list');
        const shippingDetailsHeader = document.getElementById('shipping-details-header');
        const shippingDetailsList = document.getElementById('shipping-details-list');
        const sizeDetailsHeader = document.getElementById('size-details-header');
        const sizeDetailsList = document.getElementById('size-details-list');
        const sizeDetailsDiv = document.getElementById('size-details-div');

        if (!productDetailsHeader || !shippingDetailsHeader || !sizeDetailsHeader) {
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

        shippingDetailsHeader.addEventListener('click', function () {
            if (shippingDetailsList.style.display === 'none') {
                shippingDetailsList.style.display = 'block'; 
                shippingDetailsHeader.innerText = 'SHIPPING DETAILS -';
            } else {
                shippingDetailsList.style.display = 'none';
                shippingDetailsHeader.innerText = 'SHIPPING DETAILS +';
            }
        });

        sizeDetailsHeader.addEventListener('click', function () {
            if (sizeDetailsDiv.style.display === 'none') {
                sizeDetailsList.style.display = 'block'; 
                sizeDetailsDiv.style.display = 'block'; 
                sizeDetailsHeader.innerText = 'SIZE DETAILS -';
            } else {
                sizeDetailsList.style.display = 'none';
                sizeDetailsDiv.style.display = 'none'; 
                sizeDetailsHeader.innerText = 'SIZE DETAILS +';
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
        document.querySelector('.error-message').innerHTML = '<a class="headline" href="https://fadedcloth.de/shop/">Item is no longer available.</a>';
    });

    async function displayMetafields(product, metafields) {
        const itemDetails = document.getElementById('itemDetails');
    
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
                        <!-- Details will be populated here -->
                    </ul>
                </div>
                <div id="shipping-details" class="shipping-details-container">
                    <div id="shipping-details-header" class="shipping-details-header">SHIPPING DETAILS +</div>
                    <ul id="shipping-details-list" class="shipping-details-list" style="display: none;">
                        <!-- Details will be populated here -->
                    </ul>
                </div>
                <div id="size-details" class="size-details-container">
                    <div id="size-details-header" class="size-details-header">SIZE DETAILS +</div>
                    <div id="size-details-div" class="size-details-div" style="display: none;">
                        <img src="" alt="no sizechart.">
                        <ul id="size-details-list" class="size-details-list">
                            <!-- Details will be populated here -->
                        </ul>
                    </div>
                </div>
                <div style="margin-top='20px';" id="view-other-products">YOU MIGHT ALSO LIKE ↓</div>
            </div>
        `;
    
        // Initial call to update the metafields
        updateMetafields(metafields);
    }

    
    function updateMetafields(metafields) {
        const productDetailsJSON = JSON.parse(metafields.find(field => field.key === 'product')?.value || '{}');
        const shippingDetailsJSON = JSON.parse(metafields.find(field => field.key === 'shippingdetails')?.value || '{}');
        const sizeDetailsJSON = JSON.parse(metafields.find(field => field.key === 'size')?.value || '{}');
        const sizechartURL = sizeDetailsJSON.sizechartURL || '';
    
        const productDetailsList = document.getElementById('product-details-list');
        productDetailsList.innerHTML = productDetailsJSON.details.map(detail => `
            <li>- <span>${detail}</span></li>
        `).join('');
    
        const shippingDetailsList = document.getElementById('shipping-details-list');
        shippingDetailsList.innerHTML = shippingDetailsJSON.details.map(detail => `
            <li>- <span>${detail}</span></li>
        `).join('');
    
        const sizeDetailsList = document.getElementById('size-details-list');
        sizeDetailsList.innerHTML = sizeDetailsJSON.details.map(detail => `
            <li>${detail.reference}: ${detail.measurement} ${detail.value} ${detail.unit}</li>
        `).join('');
    
        const sizechartImg = document.querySelector('#size-details-div img');
        sizechartImg.src = sizechartURL;
    }
    
    
    

    function displayImages(product) {
        const itemImagesContainer = document.getElementById('ItemImages');
        const imageButtonContainer = document.getElementById('image-button-container'); // Container für Bildbuttons
        itemImagesContainer.innerHTML = ''; // Leere den Container
        imageButtonContainer.innerHTML = ''; // Leere den Container für Bildbuttons
    
        if (product.images && Array.isArray(product.images) && product.images.length > 0) {
            const mainImage = document.createElement('img');
            const img1 = document.createElement('div');
            mainImage.src = product.images[0].src;
            mainImage.alt = product.title || 'Product Image';
            mainImage.classList.add('fade-in');
            img1.setAttribute('data-tilt', '')
            img1.appendChild(mainImage);
            itemImagesContainer.appendChild(img1);
    
            // Erstelle die Thumbnail-Buttons
            product.images.forEach((image, index) => {
                const thumbButton = document.createElement('button');
                thumbButton.classList.add('thumbnail-button'); // Optional für Styling

                const blurBackground = document.createElement('div');
                blurBackground.classList.add('blurred-eclipse-background');
                thumbButton.appendChild(blurBackground);
                
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
            productTitle.innerText = product.title || "N/A";
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
                selectedVariant = variant;
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

   // function handleAddToCart() {
    //    if (!selectedVariant) {
    //        return;
     //   }
//
    //    const addButton = document.getElementById('add-to-cart-button');
     //   addButton.disabled = true;
     //   addButton.textContent = 'ADDED';
    
    //    const variantId = selectedVariant.id.split('/').pop();
    //    const quantity = 1;

     //   let formData = {
    //        'items': [{
     //        'id': variantId,
     //        'quantity': quantity
    //         }]
     //      };

    //    console.log(variantId);
    
    //    fetch('https://fadedcloth.de/add-to-cart', {
     //       method: 'POST',
     //       headers: {
    //            'Content-Type': 'application/json'
     //       },
     //       body: JSON.stringify(formData),
     //       credentials: 'include'
     //   }).then(response => response.json())
      //    .then(data => {
      //        console.log("Item added to cart:", data);
      //        setTimeout(() => {
     //           addButton.disabled = false;
      //          addButton.textContent = 'ADD TO CART';
     //       }, 3000);
     //   })
    //      .catch(error => {
    //        console.error("Error adding to cart:", error);
    //        addButton.disabled = true;  // Re-enable the button in case of error
    //        addButton.textContent = 'ERROR';  // Reset button text
    //        setTimeout(() => {
    //            addButton.disabled = false;
     //           addButton.textContent = 'ADD TO CART';
     //       }, 1000);
    //    });
   // }

   function handleAddToCart() {
    if (!selectedVariant) {
        return;
    }

    const addButton = document.getElementById('add-to-cart-button');
    addButton.disabled = true;
    addButton.textContent = 'REDIRECTING...';

    const variantId = selectedVariant.id.split('/').pop();

    // Weiterleitung zur Shopify-Seite mit Produkt-Handle und Variant-ID
    const shopifyUrl = `https://fadedcloth-dev.myshopify.com/products/${itemHandle}?variant=${variantId}`;
    
    // Weiterleitung
    setTimeout(() => {
        window.location.href = shopifyUrl;
    }, 1000); // 1 Sekunde Verzögerung, um Feedback auf den Button zu geben
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
});

document.getElementById('view-other-products').addEventListener('click',function(){window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'});});