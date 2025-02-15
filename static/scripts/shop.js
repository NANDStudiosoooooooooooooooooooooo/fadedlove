//import '../styles/shop.scss';

function toggleInfoDisplay() {
    const checkbox = document.getElementById('label-toggle');
    const infoElements = document.querySelectorAll('.info');
    infoElements.forEach(info => {if (checkbox.checked) {info.classList.remove('hidden');} else {info.classList.add('hidden');}});
}
function setupCheckboxToggle() {
    const checkbox = document.getElementById('label-toggle');
    checkbox.addEventListener('change', toggleInfoDisplay);
}
function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    const collection = params.get('collection') ? params.get('collection').toLowerCase() : 'all';
    const drop = params.get('drop') ? params.get('drop').toLowerCase() : 'all';
    const hide = params.get('hide') === 'TRUE';
    return { collection, hide, drop };
}

function loadShopifyProducts(collection = 'all', drop = 'all') {

    const apiKey = (collection === 'all' && drop === 'all') 
    ? 'ed72f09d8742f37356305b6e49310909' 
    : '26ddd765a66157f6946c55e9dded479a';

const query = `
{
    products(first: 100) {
        edges {
            node {
                id
                title
                handle
                images(first: 1) {
                    edges {
                        node {
                            src
                        }
                    }
                }
                variants(first: 1) {
                    edges {
                        node {
                            price {
                                amount
                            }
                            metafields(identifiers: [
                                {namespace: "custom", key: "colorhex"}
                            ]) {
                                key
                                value
                            }
                        }
                    }
                }
                tags
            }
        }
    }
}`;

fetch('https://zkwisj-0b.myshopify.com/api/2023-10/graphql.json', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': apiKey
    },
    body: JSON.stringify({ query })
})
.then(response => response.json())
.then(json => {

    if (!json.data || !json.data.products) {
        console.error('API ERROR');
        return;
    }

    const products = json.data.products.edges.map(edge => edge.node);
    const container = document.getElementById('shop-container');
    const itemsContainer = document.createElement('div');
    itemsContainer.classList.add('mainshop-items');

    let foundItems = false;

    products.forEach(product => {
        const productTags = product.tags.map(tag => tag.toLowerCase());
        if (!productTags.includes('hide')) {
            const matchesCollection = collection === 'all' || productTags.includes(collection.toLowerCase());
            const matchesDrop = drop === 'all' || productTags.includes(drop.toLowerCase());

            if (matchesCollection && matchesDrop) {
                foundItems = true;
                const itemElement = document.createElement('div');
                itemElement.classList.add('mainshop-item');
                const productHandle = product.handle;
                itemElement.onclick = () => window.location.href = `https://fadedcloth.de/item?item=${productHandle}`;

                const imageUrl = product.images.edges.length > 0 ? product.images.edges[0].node.src : 'fallback-image.jpg';
                const price = product.variants.edges[0].node.price.amount;

                const metafields = product.variants.edges[0].node.metafields;
                const colorHexField = metafields.find(field => field.key === 'colorhex');
                const colorHex = colorHexField ? colorHexField.value : '#ffffff';

                const isValidColor = /^#[0-9A-Fa-f]{6}$/.test(colorHex);
                const backgroundColor = isValidColor ? colorHex : '#ffffff';

                itemElement.innerHTML = `
                    <div style="height: 100%;">
                        <div style="background-color: ${backgroundColor};" class="blurred-eclipse-background"></div>
                        <img src="${imageUrl}" class="floating" alt="${product.title}">
                    </div>
                    <div class="info">
                        <div class="name">${product.title}</div>
                        <div class="price">${price} EUR</div>
                    </div>
                `;
                itemsContainer.appendChild(itemElement);
            }
        }
    });

    container.innerHTML = '';

    if (foundItems) {
        container.appendChild(itemsContainer);
    } else {
        const errorMessage = document.createElement('a');
        errorMessage.classList.add('headline');
        errorMessage.textContent = 'NO ITEMS FOUND.';
        container.appendChild(errorMessage);
    }

    toggleInfoDisplay();
})
.catch(error => {
    console.error('ERROR (LOADING PRODUCTS):', error);
});
}



function loadCollectionMetafields(collection) {
const query = `
{
    collectionByHandle(handle: "${collection}") {
        id
        title
        image {
            src
        }
        metafields(identifiers: [
            {namespace: "custom", key: "dropend"},
            {namespace: "custom", key: "isdrop"}
        ]) {
            namespace
            key
            value
            type
        }
    }
}`;

console.log(`Lade Collection: ${collection}`);

fetch('https://zkwisj-0b.myshopify.com/api/2024-10/graphql.json', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': 'ed72f09d8742f37356305b6e49310909'
    },
    body: JSON.stringify({ query })
})
.then(response => response.json())
.then(json => {
    const collectionData = json.data?.collectionByHandle;

    if (collectionData) {
        const collectionImage = collectionData.image?.src;
        const collectionImgElement = document.getElementById('collection-img');
        if (collectionImgElement && collectionImage) {
            collectionImgElement.src = collectionImage;
            collectionImgElement.classList.remove('hidden');
        }

        const metafields = collectionData.metafields;
        if (metafields && Array.isArray(metafields)) {
            const dropendMetafield = metafields.find(edge => edge.key === 'dropend')?.value;
            if (dropendMetafield) {
                displayCountdown(dropendMetafield);
            }

            const collectionNameElement = document.getElementById('collection-name');
            if (collectionNameElement) {
                collectionNameElement.textContent = collectionData.title;
                collectionNameElement.classList.remove('hidden');
            }

            const isDropMetafield = metafields.find(edge => edge.key === 'isdrop')?.value;
            if (isDropMetafield === 'true') { // Shopify-Boolean = String
                const buttonElement = document.getElementById('button5');
                if (buttonElement) {
                    buttonElement.classList.remove('hidden');
                }
            }
        }
    } else {
        console.error('NO COLLECTION / DROP');
    }
})
.catch(error => console.error('ERROR (LOADING COLLECTION-DATA):', error));
}





document.addEventListener('DOMContentLoaded', function() {
const { collection, hide, drop } = getURLParams();
if (hide) {
    document.getElementById('label-toggle').checked = false;
} else {
    document.getElementById('label-toggle').checked = true;
}
setupCheckboxToggle();

loadShopifyProducts(collection, drop);
loadCollectionMetafields(collection); 
});


function displayCountdown(dropendTime) {
const countdownElement = document.getElementById('countdown');
const endTime = new Date(dropendTime).getTime();
if (isNaN(endTime)) {
    return;
}

countdownElement.classList.remove("hidden");
const countdownInterval = setInterval(function() {
    const now = new Date().getTime();
    const timeRemaining = endTime - now;

    if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        countdownElement.textContent = "DROP EXPIRED";
    } else {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        countdownElement.textContent = `${days < 10 ? '0' : ''}${days}:${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}, 1000);
}