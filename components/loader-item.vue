<template>
    <div>
      <div class="headline error-message" id="error-message"></div>
      <div style="display: flex; flex-direction: column;">
        <div class="item-container">
          <div class="item-images-container fade-in" id="ItemImages">
            <!-- Images will be dynamically inserted here -->
          </div>
          <div class="item-details fade-in" id="itemDetails">
            <!-- Item details will be displayed here -->
          </div>
        </div>
        <loader-moreitems/>
      </div>
    </div>
  </template>
  
  <script>
  import LoaderMoreitems from '~/components/loader-moreitems.vue';
  import ShopifyBuy from 'shopify-buy';
  
  export default {
    components: {
      LoaderMoreitems,
    },
    name: 'LoaderItem',
    data() {
      return {
        selectedVariant: null,
        metafieldsMap: {},
        client: null,
        checkoutId: null
      };
    },
    mounted() {
      this.loadProduct();
    },
    methods: {
      async loadProduct() {
        this.client = ShopifyBuy.buildClient({
          domain: 'checkout.fadedcloth.de',
          storefrontAccessToken: 'ed72f09d8742f37356305b6e49310909'
        });
  
        try {
          const checkout = await this.client.checkout.create();
          this.checkoutId = checkout.id;
        } catch (error) {
          console.error('Error creating checkout:', error);
        }
  
        const params = new URLSearchParams(window.location.search);
        const itemHandle = params.get('item');
        const itemId = params.get('item_id');
        console.log("Item Handle from URL:", itemHandle);
        console.log("Item ID from URL:", itemId);
  
        const variants = await this.fetchMetafields(itemHandle, itemId);
        variants.forEach(variant => {
          this.metafieldsMap[variant.node.id] = variant.node.metafields;
        });
  
        try {
          const product = await this.client.product.fetchByHandle(itemHandle);
          this.displayMetafields(product, this.metafieldsMap[product.variants[0].id]);
          this.setupEventListeners(product);
          this.displayProductDetails(product, product.variants[0]);
          this.displayImages(product);
          this.createSizeButtons(product.variants);
          this.createAddToCartButton();
          this.createBuyNowButton();
        } catch (error) {
          console.error("Error fetching Shopify product:", error);
          document.querySelector('.error-message').innerHTML = '<a class="headline" href="https://fadedcloth.de/shop/">Item is no longer available.</a>';
        }
      },
      async fetchMetafields(handle, id) {
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
                      {namespace: "custom", key: "shippingdetails"}
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
                      {namespace: "custom", key: "shippingdetails"}
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
  
        const response = await fetch('https://checkout.fadedcloth.de/api/2023-04/graphql.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': 'ed72f09d8742f37356305b6e49310909'
          },
          body: JSON.stringify({ query })
        });
  
        const result = await response.json();
        const product = id ? result.data.product : result.data.productByHandle;
        const variants = product?.variants?.edges || [];
  
        let colorHex = "#ffffff";
        const metafields = variants[0]?.node?.metafields || [];
        const colorHexField = metafields.find(field => field.key === 'colorhex');
        if (colorHexField) {
          colorHex = colorHexField.value;
        }
  
        const finalColor = /^#[0-9A-Fa-f]{6}$/.test(colorHex) && colorHex !== '#ffffff' ? colorHex : '#ffffff';
        const backgroundWrapper = document.getElementById('background_wrapper');
        if (backgroundWrapper) {
          backgroundWrapper.style.setProperty('--color-two', finalColor);
          backgroundWrapper.style.setProperty('--color-three', finalColor);
          backgroundWrapper.style.setProperty('--color-four', finalColor);
          backgroundWrapper.style.setProperty('--color-five', '#ffffff');
        } else {
          console.warn("⚠️ Warnung: Element #background_wrapper nicht gefunden.");
        }
  
        return variants;
      },
      displayMetafields(product, metafields) {
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
  
        this.updateMetafields(metafields);
      },
      updateMetafields(metafields) {
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
      },
      displayImages(product) {
        const itemImagesContainer = document.getElementById('ItemImages');
        const imageButtonContainer = document.getElementById('image-button-container');
        itemImagesContainer.innerHTML = '';
        imageButtonContainer.innerHTML = '';
  
        if (product.images && Array.isArray(product.images) && product.images.length > 0) {
          const mainImage = document.createElement('img');
          const img1 = document.createElement('div');
          mainImage.src = product.images[0].src;
          mainImage.alt = product.title || 'Product Image';
          mainImage.classList.add('fade-in');
          img1.setAttribute('data-tilt', '')
          img1.appendChild(mainImage);
          itemImagesContainer.appendChild(img1);
  
          product.images.forEach((image, index) => {
            const thumbButton = document.createElement('button');
            thumbButton.classList.add('thumbnail-button');
  
            const blurBackground = document.createElement('div');
            blurBackground.classList.add('blurred-eclipse-background');
            thumbButton.appendChild(blurBackground);
  
            const thumbImg = document.createElement('img');
            thumbImg.src = image.src;
            thumbImg.alt = `${product.title} Thumbnail ${index + 1}`;
            thumbImg.classList.add('thumbnail-image');
            thumbButton.appendChild(thumbImg);
  
            thumbButton.addEventListener('click', () => {
              mainImage.src = image.src;
              this.triggerFadeInAnimation(itemImagesContainer);
              this.updateActiveThumbnail(thumbButton);
            });
  
            imageButtonContainer.appendChild(thumbButton);
          });
  
          this.updateActiveThumbnail(imageButtonContainer.firstChild);
          itemImagesContainer.appendChild(mainImage);
        } else {
          console.error('ERROR');
          itemImagesContainer.innerHTML = '<p>No images available for this product.</p>';
        }
      },
      updateActiveThumbnail(activeButton) {
        const buttons = document.querySelectorAll('.thumbnail-button');
  
        buttons.forEach(button => {
          button.classList.remove('active-image-button');
          button.classList.remove('soft-shake');
        });
  
        activeButton.classList.add('active-image-button');
        activeButton.classList.add('soft-shake');
      },
      triggerFadeInAnimation(container) {
        container.classList.remove('fade-in');
  
        setTimeout(() => {
          container.classList.add('fade-in');
        }, 10);
      },
      displayProductDetails(product, variant) {
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
      },
      updatePrice(selectedVariant) {
        const priceElement = document.getElementById('item-price');
        if (priceElement) {
          const price = selectedVariant.priceV2.amount;
          priceElement.innerText = `${parseFloat(price).toFixed(2)} EUR`;
        } else {
          console.error("Price element not found");
        }
      },
      createAddToCartButton() {
        const addToCartButtonContainer = document.getElementById('add-to-cart-button-container');
        addToCartButtonContainer.innerHTML = '';
  
        const addToCartButton = document.createElement('button');
        addToCartButton.innerText = 'ADD TO CART';
        addToCartButton.id = 'add-to-cart-button';
        addToCartButton.classList.add('add-to-cart');
        addToCartButton.classList.add('glass-button');
        addToCartButton.style.display = 'none';
        addToCartButton.addEventListener('click', this.handleAddToCart);
        addToCartButtonContainer.appendChild(addToCartButton);
      },
      createBuyNowButton() {
        const buyNowButtonContainer = document.getElementById('buy-now-button-container');
        buyNowButtonContainer.innerHTML = '';
  
        const buyNowButton = document.createElement('button');
        buyNowButton.innerText = 'SELECT SIZE';
        buyNowButton.id = 'buy-now-button';
        buyNowButton.classList.add('buy-now');
        buyNowButton.classList.add('glass-button');
        buyNowButton.disabled = true;
        buyNowButton.addEventListener('click', this.handleBuyNow);
        buyNowButtonContainer.appendChild(buyNowButton);
      },
      createSizeButtons(variants) {
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
  
          sizeButton.addEventListener('click', () => {
            this.handleSizeSelection(variant);
            this.selectedVariant = variant;
          });
          sizeContainer.appendChild(sizeButton);
        });
      },
      handleSizeSelection(variant) {
        this.selectedVariant = variant;
  
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
        }
  
        buyNowButton.innerText = 'BUY NOW';
  
        if (!variant.available) {
          buyNowButton.disabled = true;
          buyNowButton.innerText = 'SOLD OUT';
  
          if (addToCartButton) {
            addToCartButton.style.display = 'none';
          }
        }
  
        this.updatePrice(variant);
        this.updateMetafields(this.metafieldsMap[variant.id]);
      },
      handleAddToCart() {
        if (!this.selectedVariant) {
          return;
        }
  
        const addButton = document.getElementById('add-to-cart-button');
        addButton.disabled = true;
        addButton.textContent = 'REDIRECTING...';
  
        const variantId = this.selectedVariant.id.split('/').pop();
        const itemHandle = new URLSearchParams(window.location.search).get('item');
        const shopifyUrl = `https://checkout.fadedcloth.de/products/${itemHandle}?variant=${variantId}`;
  
        setTimeout(() => {
          window.location.href = shopifyUrl;
        }, 200);
      },
      handleBuyNow() {
        if (!this.selectedVariant) {
          console.error('No variant selected.');
          return;
        }
  
        this.client.checkout.create().then((checkout) => {
          this.client.checkout.addLineItems(checkout.id, [{
            variantId: this.selectedVariant.id,
            quantity: 1,
          }]).then((checkout) => {
            window.location.href = checkout.webUrl;
          }).catch((error) => {
            console.error('Error adding item to checkout:', error);
          });
        }).catch((error) => {
          console.error('Error creating checkout:', error);
        });
      },
      setupEventListeners(product) {
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
  
        productDetailsHeader.addEventListener('click', () => {
          if (productDetailsList.style.display === 'none') {
            productDetailsList.style.display = 'block';
            productDetailsHeader.innerText = 'PRODUCT DETAILS -';
          } else {
            productDetailsList.style.display = 'none';
            productDetailsHeader.innerText = 'PRODUCT DETAILS +';
          }
        });
  
        shippingDetailsHeader.addEventListener('click', () => {
          if (shippingDetailsList.style.display === 'none') {
            shippingDetailsList.style.display = 'block';
            shippingDetailsHeader.innerText = 'SHIPPING DETAILS -';
          } else {
            shippingDetailsList.style.display = 'none';
            shippingDetailsHeader.innerText = 'SHIPPING DETAILS +';
          }
        });
  
        sizeDetailsHeader.addEventListener('click', () => {
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
  
        document.getElementById('view-other-products').addEventListener('click', () => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        });
      }
    }
  };
  </script>
  
  <style scoped>
  </style>