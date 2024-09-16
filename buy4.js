(function () {
  var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  
  if (window.ShopifyBuy) {
    if (window.ShopifyBuy.UI) {
      ShopifyBuyInit();
    } else {
      loadScript();
    }
  } else {
    loadScript();
  }
  
  function loadScript() {
    var script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    script.onload = ShopifyBuyInit;
  }

  function ShopifyBuyInit() {
    // Get product ID from the URL parameter
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get('item'); // Dynamic item ID from URL

    var client = ShopifyBuy.buildClient({
      domain: '2ac76d-c9.myshopify.com',
      storefrontAccessToken: '06b5b9648d9f85d28896c7f620ea40fb',
    });

    ShopifyBuy.UI.onReady(client).then(function (ui) {
      ui.createComponent('product', {
        id: itemId, // Use dynamic product ID from URL
        node: document.getElementById('product-component-1726427104181'),
        moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
        options: {
          "product": {
            "styles": {
              "product": {
                "text-align": "center",
                "max-width": "100%",
                "background-color": "black",
              },
              "button": {
                "background-color": "transparent",
                "color": "#d5d5d5",
                "border": "1px solid #000",
                "padding": "10px 20px",
                "text-transform": "uppercase",
                "font-size": "16px",
                "font-family": "IBM Plex Sans",
                "transition": "0.3s",
                "margin-top": "20px",
                "text-decoration": "none", // Ensure no underline by default
              },
              "button:hover": {
                "background-color": "transparent", // Keep background color the same
                "color": "#d5d5d5", // Keep text color the same
                "text-decoration": "underline", // Add underline on hover
                "cursor": "pointer",
              },
            },
            "text": {
              "button": "ADD",
            },
            "contents": {
              "img": false,
              "title": false,
              "price": false,
            }
          },
          "cart": {
            "styles": {
                "button": {
                    "background-color": "white",
                    "color": "black",
                    "border": "none",
                    "padding": "10px 20px",
                    "text-transform": "uppercase",
                    "font-family": "IBM Plex Sans",
                    "border-radius": "5px",
                    "cursor": "pointer",
                    "box-shadow": "0 0 10px rgba(255, 255, 255, 0.5)",
                    "transition": "box-shadow 0.3s ease"
                },
                "button:hover": {
                    "box-shadow": "0 0 15px rgba(255, 255, 255, 0.7)"
                },
                "title": {
                    "color": "white",
                    "font-family": "IBM Plex Sans"
                },
                "price": {
                    "color": "white",
                    "font-family": "IBM Plex Sans"
                },
                "total": {
                    "color": "white",
                    "font-family": "IBM Plex Sans"
                },
                "footer": {
                    "background-color": "black"
                },
                "item": {
                    "border-bottom": "1px solid white",
                    "padding": "10px 0"
                },
                "item-details": {
                    "color": "white",
                    "font-family": "IBM Plex Sans"
                },
                "item-quantity": {
                    "color": "white",
                    "font-family": "IBM Plex Sans"
                }
            },
            "text": {
                "total": "Subtotal",
                "button": "Checkout"
            },
            "popup": false // Disable cart popup
        },
        "toggle": {
            "styles": {
                "toggle": {
                    "background-color": "black",
                    "color": "white",
                    "font-family": "IBM Plex Sans"
                },
                "toggle:hover": {
                    "background-color": "white",
                    "color": "black"
                }
            }
          }
        }
      });
    });
  }
})();
