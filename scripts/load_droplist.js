//LOAD DROP LIST --BEGIN--
document.addEventListener('DOMContentLoaded', () => {
    fetchShopifyDrops();

    async function fetchShopifyDrops() {
const container = document.getElementById('drops-container');
const now = new Date();

const query = `
    {
        collections(first: 200) {
            edges {
                node {
                    title
                    handle
                    metafields(identifiers: [
                        {namespace: "custom", key: "drop"}, 
                        {namespace: "custom", key: "dropend"}, 
                        {namespace: "custom", key: "isdrop"}, 
                        {namespace: "custom", key: "dropinfo"},
                        {namespace: "custom", key: "link"}
                    ]) {
                        key
                        value
                    }
                    products(first: 5) {
                        edges {
                            node {
                                images(first: 1) {
                                    edges {
                                        node {
                                            src
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

try {
    const response = await fetch("https://checkout.fadedcloth.de/api/2023-07/graphql.json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": "26ddd765a66157f6946c55e9dded479a"
        },
        body: JSON.stringify({ query })
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    if (!data.data || !data.data.collections || !data.data.collections.edges) {
        throw new Error("No collections found in the response.");
    }

    const collections = data.data.collections.edges
        .map(edge => {
            const collectionNode = edge.node;

            // Ensure metafields are available
            const metafields = Array.isArray(collectionNode.metafields) ? collectionNode.metafields : [];

            // Convert metafields array to an object
            const metafieldsObj = metafields.reduce((acc, metafield) => {
                if (metafield && metafield.key) {
                    acc[metafield.key] = metafield.value;
                }
                return acc;
            }, {});

            if (metafieldsObj['isdrop'] !== 'true') {
                return null;
            }

            const drop = metafieldsObj['drop'] ? new Date(metafieldsObj['drop']) : null;
            const dropend = metafieldsObj['dropend'] ? new Date(metafieldsObj['dropend']) : null;

            if (!drop || !dropend) {
                return null;
            }

            // Get first product image
            const productImage = collectionNode.products.edges[0]?.node.images.edges[0]?.node.src || null;

            return {
                title: collectionNode.title,
                handle: collectionNode.handle,
                drop: drop,
                dropend: dropend,
                dropinfo: metafieldsObj['dropinfo'] || null,
                link: metafieldsObj['link'] || null,
                productImage: productImage
            };
        })
        .filter(collection => collection !== null)
        .sort((a, b) => a.drop - b.drop);

    const upcomingDrops = [];
    const droppedItems = [];
    let firstUpcomingDrop = true;
    let latestActiveDrop = null;

    collections.forEach((collection, index) => {
const isUpcoming = collection.drop > now;
const dropElement = document.createElement('div');
dropElement.className = 'drop_item';
dropElement.setAttribute('data-drop-date', collection.drop ? collection.drop.toISOString() : "");

const dropNumberContainer = document.createElement('div');
dropNumberContainer.className = 'drop_number_container';
const dropNumberHash = document.createElement('div');
dropNumberHash.textContent = '#';
const dropNumber = document.createElement('div');
dropNumber.textContent = String(index + 1).padStart(2, '0');
dropNumberContainer.appendChild(dropNumberHash);
dropNumberContainer.appendChild(dropNumber);
dropElement.appendChild(dropNumberContainer);

const dropLink = document.createElement(isUpcoming ? 'span' : 'a');
dropLink.className = 'drop_link';

if (isUpcoming) {
    handleCountdown(
        dropLink,
        collection.drop,
        collection.title,
        formatUpcomingDate(collection.drop),
        collection.dropinfo,
        collection.handle
    );
    upcomingDrops.push(dropElement);
    dropLink.classList.add('drop_upcoming');
    dropElement.appendChild(dropLink);

} else {
    const dropinfoText = collection.dropinfo ? ` - ${collection.dropinfo}` : '';

    // Den Titel in ein <span> setzen
    const titleSpan = document.createElement('span');
    titleSpan.textContent = `${collection.title}${dropinfoText}`;

    dropLink.appendChild(titleSpan); // Titel in das Link-Element einfügen
    dropLink.title = `${collection.title}`;

    // Use custom link if it exists and is valid
    const customLink = collection.link ? collection.link : `https://shop.fadedcloth.de?collection=${collection.handle}`;
    dropLink.href = customLink;
    //dropLink.classList.add(`marquee`);
    titleSpan.classList.add(`marquee`);
    titleSpan.classList.add(`span-text`);

    if (collection.productImage) {
        // Create an image element and append it inside the titleSpan
        const productImageElement = document.createElement('img');
        productImageElement.src = collection.productImage;
        productImageElement.alt = `${collection.title} product image`;
        productImageElement.className = 'product-image';
        productImageElement.classList.add(`floating`);
        titleSpan.appendChild(productImageElement); // Bild im <span> platzieren
    }

    droppedItems.push(dropElement);
    checkMarquee();
}

if (!latestActiveDrop) {
    latestActiveDrop = dropLink;
    dropElement.appendChild(dropLink);
} else {
    dropElement.appendChild(dropLink);
}

container.appendChild(dropElement);

if (collection.dropend && collection.dropend < now) {
    dropLink.classList.add('ended');
} else if (!isUpcoming) {
    dropLink.classList.add('active');
}
});



    createSection('Dropped Drops', droppedItems);
    addNewsletterInput('>>>');
    addCollectionButton('///');
    createSection('Upcoming Drops', upcomingDrops);
    createSection('Navigation', nav);

    } catch (error) {
    console.error("Error fetching Shopify drops:", error);
    }
}

    const nav = [
        createLinkElement('GALLERY', 'https://fadedcloth.de/gallery'),
        createLinkElement('UPDATES', 'https://fadedcloth.de/updates'),
        createLinkElement('TERMS OF SERVICE', 'https://fadedcloth.de/legal?id=terms-of-service'),
        createLinkElement('PRIVACY POLICY', 'https://fadedcloth.de/legal?id=privacy-policy')
    ];

    function checkMarquee() {
document.querySelectorAll(".marquee").forEach(el => {
//el.classList.remove("marquee");
el.style.animation = "";

// Finde den direkten Container, der den Text enthält
const container = el.parentElement;
if (!container) return;
container.style.overflow = "hidden";

// Prüfe das span-Element, das den Text enthält
const textElement = el; 
if (!textElement) return;

const diff = textElement.scrollWidth - container.offsetWidth;

// Wenn der Text breiter ist als der Container, berechne den Marquee-Effekt
if (diff > 0) {
  const overflowAmount = Math.ceil(diff / parseFloat(window.getComputedStyle(document.documentElement).fontSize));

  // Setze den Wert für 'overflow-amount' als CSS-Variable
  el.style.setProperty("--overflow-amount", overflowAmount);

  // Berechne die Anzahl der Schritte (für die steps()-Funktion)
  const stepsExact = Math.ceil(diff / parseFloat(window.getComputedStyle(document.documentElement).fontSize));

  el.style.setProperty("--steps", stepsExact);
  el.style.setProperty("--animation-duration", (stepsExact * 1.1) + "s");
  el.classList.add("marquee");
}
});
}


window.addEventListener("resize", () => setTimeout(checkMarquee, 200));

function createLinkElement(text, url) {
        const dropElement = document.createElement('div');
        dropElement.className = 'drop_item';
        const dropNumberContainer = document.createElement('div');
        dropNumberContainer.className = 'drop_number_container';
        const placeholderTag = document.createElement('a');
        dropNumberContainer.appendChild(placeholderTag);
        const link = document.createElement('a');
        placeholderTag.textContent = '///';
        link.className = 'drop_link';
        link.href = url;
        link.title = text;
        link.textContent = text;
        
        dropElement.appendChild(dropNumberContainer);
        dropElement.appendChild(link);
        return dropElement;
    }



    const allowedTitles = ['Navigation']; //add all section-titels for ↗ at hover

    function createSection(title, items) {
        const container = document.getElementById('drops-container');
        const section = document.createElement('div');
        section.className = 'drop_section';

        section.dataset.title = title;

        items.forEach(item => section.appendChild(item));
        container.appendChild(section);
        addHoverEffectToLinksForTitles(container, allowedTitles);
    }

    function addHoverEffectToLinksForTitles(container, allowedTitles) {
        // Event-Listener für Mouseover und Mouseout auf dem Container
        container.addEventListener('mouseover', (event) => {
            if (event.target.classList.contains('drop_link')) {
                const section = event.target.closest('.drop_section'); // Finde die übergeordnete Section
                const title = section ? section.dataset.title : null; // Hole den Titel der Section

                // Prüfe, ob der Titel in der Liste erlaubt ist
                if (allowedTitles.includes(title)) {
                    if (!event.target.classList.contains('hovered')) {
                        event.target.innerHTML += '↗';
                        event.target.classList.add('hovered');
                    }
                }
            }
        });

        container.addEventListener('mouseout', (event) => {
            if (event.target.classList.contains('drop_link')) {
                const section = event.target.closest('.drop_section'); // Finde die übergeordnete Section
                const title = section ? section.dataset.title : null; // Hole den Titel der Section

                // Prüfe, ob der Titel in der Liste erlaubt ist
                if (allowedTitles.includes(title)) {
                    if (event.target.classList.contains('hovered')) {
                        event.target.innerHTML = event.target.innerHTML.replace('↗', '');
                        event.target.classList.remove('hovered');
                    }
                }
            }
        });
    }

    // Function to handle the countdown and update on expiry
    function handleCountdown(dropLink, endTime, title, formattedDate, dropinfo, handle) {
    // Erstelle separate Elemente für die Anzeige
    const dropnameElement = document.createElement("span");
    const countdownElement = document.createElement("span");
    const dateElement = document.createElement("span");
    const utcElement = document.createElement("span");
    const dropInfoElement = document.createElement("span");

    dropnameElement.classList.add("dropname");
    countdownElement.classList.add("countdown");
    dateElement.classList.add("date");
    utcElement.classList.add("utc");
    dropInfoElement.classList.add("drop-info");

    // Set initial display content
    dateElement.textContent = formattedDate; // Originaldatum
    utcElement.textContent = " MEZ";
    
    // Fügt alle Elemente zum Link hinzu
    dropLink.appendChild(dropnameElement);
    dropLink.appendChild(countdownElement);
    dropLink.appendChild(dateElement);
    dropLink.appendChild(utcElement);
    dropLink.appendChild(dropInfoElement);

    // Intervall für das Countdown-Update
    const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = endTime - now;

    // Countdown-Format aktualisieren
    countdownElement.textContent = `${getExtendedCountdown(endTime)}`;

    dropnameElement.textContent = ``; //${title} 
    
    // Bildschirmabhängige Anzeige anpassen
    if (window.innerWidth < 501) {
        const dropDate = new Date(endTime);
        const month = String(dropDate.getMonth() + 1).padStart(2, '0');
        const day = String(dropDate.getDate()).padStart(2, '0');
        
        // Nur Countdown und Datum anzeigen
        dateElement.textContent = ` ${month}/${day}`;
        utcElement.style.display = "none";
    } else {
        dateElement.textContent = ` ${formattedDate}`;
        utcElement.style.display = "inline";
    }

    // Bei Ablauf des Countdowns aktualisieren
    if (distance < 0) {
        clearInterval(countdownInterval);
        // dropLink.textContent = dropinfo ? `${title} - ${dropinfo}` : title;
        dropLink.textContent = title;
        dropLink.href = `https://shop.fadedcloth.de?collection=${handle}`;
        dropLink.style.pointerEvents = 'auto';
        dropLink.onclick = () => {
            window.location.href = dropLink.href;
        };
    } else {
        dropLink.style.pointerEvents = 'none';
    }
}, 1000);
}

        function formatUpcomingDate(date) {
            const options = {
                weekday: 'short',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                hour12: true
            };
            return new Intl.DateTimeFormat('en-US', options).format(date).replace(/,\s/g, ' ').replace(/ (\w{2})$/, '$1').trim();
        }

        function getExtendedCountdown(date) {
            const now = new Date();
            const diff = date - now;
            const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
            const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            return `${String(weeks).padStart(2, '0')}:${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }

        function addNewsletterInput(nextDropNumber) {
            nextDropNumber = String(nextDropNumber); // Wandelt nextDropNumber in einen String um

            const container = document.getElementById('drops-container');
            const newsletterContainer = document.createElement('div');
            newsletterContainer.className = 'drop_item';
            newsletterContainer.classList.add('active-drop');

            const dropNumberContainer = document.createElement('div');
            dropNumberContainer.className = 'drop_number_container';
            dropNumberContainer.classList.add('newsletter_number_container')

            if (nextDropNumber.includes('/') || nextDropNumber.includes('>')) {
                // Fügt nur den //-Link ein, wenn nextDropNumber das Zeichen '/' enthält
                const dropNumberLink = document.createElement('a');
                dropNumberLink.textContent = nextDropNumber;
                dropNumberContainer.appendChild(dropNumberLink);
            } else {
                // Standardanzeige mit # und Drop-Nummer
                const dropNumberHash = document.createElement('div');
                dropNumberHash.textContent = '#';
                const dropNumber = document.createElement('div');
                dropNumber.textContent = nextDropNumber.padStart(2, '0');

                dropNumberContainer.appendChild(dropNumberHash);
                dropNumberContainer.appendChild(dropNumber);
            }

            newsletterContainer.appendChild(dropNumberContainer);

            const newsletterLabel = document.createElement('div');
            newsletterLabel.className = 'drop_link';
            newsletterLabel.textContent = 'ENTER EMAIL:';

            const emailInput = document.createElement('input');
            emailInput.id = 'email';
            emailInput.className = 'drop_link';
            emailInput.setAttribute('type', 'email');
            emailInput.setAttribute('placeholder', '');

            const submitButton = document.createElement('div');
            submitButton.className = 'submit_button hidden';
            submitButton.textContent = '>';

            //const customCursor = document.createElement('div'); customCursor.id = 'customCursor'; customCursor.className = 'custom-cursor';

            const inputWrapper = document.createElement('div'); 
            inputWrapper.className = 'input_wrapper'; 
            inputWrapper.appendChild(emailInput); inputWrapper.appendChild(submitButton); //inputWrapper.appendChild(customCursor);

            const newsletterForm = document.createElement('div');
            newsletterForm.className = 'newsletter_form';
            newsletterForm.appendChild(newsletterLabel);
            newsletterForm.appendChild(inputWrapper);

            newsletterContainer.appendChild(newsletterForm);
            container.appendChild(newsletterContainer);

            emailInput.addEventListener('input', function () { if (emailInput.value.trim() === '') { submitButton.classList.add('hidden'); } else { submitButton.classList.remove('hidden'); } 
            //updateCursor(); 
        });

            emailInput.addEventListener('keypress', function (event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    processSubscription(emailInput.value, newsletterLabel, emailInput);
                }
            });

            submitButton.addEventListener('click', function () {
                processSubscription(emailInput.value, newsletterLabel, emailInput);
            });
        }




    async function getCollections() {
const query = `
    {
        collections(first: 50) {
            edges {
                node {
                    title
                    handle
                }
            }
        }
    }
`;

try {
    const response = await fetch("https://checkout.fadedcloth.de/api/2023-07/graphql.json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": "ed72f09d8742f37356305b6e49310909"
        },
        body: JSON.stringify({ query })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.collections.edges.map(edge => edge.node); // Gibt die Collections zurück
} catch (error) {
    console.error("Fehler beim Abrufen der Collections:", error);
    return []; // Gibt ein leeres Array zurück bei einem Fehler
}
}


async function addCollectionButton(dropCount) {
dropCount = String(dropCount); // Wandelt dropCount in einen String um

const container = document.getElementById('drops-container');

// Erstelle einen Button-Container für die COLLECTION
const buttonContainer = document.createElement('div');
buttonContainer.className = 'drop_item';
buttonContainer.classList.add('active-drop');

// Drop-Nummer für den COLLECTION-Button
const collectionNumberContainer = document.createElement('div');
collectionNumberContainer.className = 'drop_number_container';

if (dropCount.includes('/')) {
    // Falls dropCount '/' enthält, wird nur ein //-Link eingefügt
    const collectionNumberLink = document.createElement('a');
    collectionNumberLink.textContent = dropCount;
    collectionNumberContainer.appendChild(collectionNumberLink);
} else {
    const collectionNumberHash = document.createElement('div');
    collectionNumberHash.textContent = '#';
    const collectionNumber = document.createElement('div');
    collectionNumber.textContent = String(parseInt(dropCount) + 1).padStart(2, '0');
    collectionNumberContainer.appendChild(collectionNumberHash);
    collectionNumberContainer.appendChild(collectionNumber);
}

buttonContainer.appendChild(collectionNumberContainer);

// COLLECTION-Button
const collectionButton = document.createElement('div');
collectionButton.className = 'drop_link';
collectionButton.classList.add('collection-button');
collectionButton.textContent = '+ COLLECTION';
collectionButton.style.cursor = 'pointer';

buttonContainer.appendChild(collectionButton);
container.appendChild(buttonContainer);

// Container für die Collections
const collectionsContainer = document.createElement('div');
collectionsContainer.className = 'collections_container';
collectionsContainer.style.display = 'none'; // Unsichtbar beim Laden
container.appendChild(collectionsContainer);

// Lade die Collections von Shopify
const collections = await getCollections(); // Implementiere diese Funktion

// Erstelle Links für jede Collection
collections.forEach((collection) => {
    // Überprüfen, ob 'drop' nicht im Handle enthalten ist
    if (!collection.handle.includes('drop')) {
        const collectionLink = document.createElement('a');
        collectionLink.className = 'drop_link';
        collectionLink.href = `https://shop.fadedcloth.de/?collection=${collection.handle}&hide=TRUE`;
        collectionLink.textContent = collection.title; // Titel der Collection als Linktext
        collectionLink.title = collection.title; // Titel der Collection als Tooltip
        collectionLink.target = '';

        // Container für den Collection-Link (mit Platzhalter für die Nummer)
        const collectionContainer = document.createElement('div');
        collectionContainer.className = 'drop_item';
        collectionContainer.classList.add('collection_container');

        // Platzhalter für die Nummer (00, unsichtbar)
        const placeholderNumberContainer = document.createElement('div');
        placeholderNumberContainer.className = 'drop_number_container';
        placeholderNumberContainer.style.visibility = 'hidden'; // Unsichtbar
        const placeholderNumberHash = document.createElement('div');
        placeholderNumberHash.textContent = '#';
        const placeholderNumber = document.createElement('div');
        placeholderNumber.textContent = '00'; // Platzhalter-Nummer

        placeholderNumberContainer.appendChild(placeholderNumberHash);
        placeholderNumberContainer.appendChild(placeholderNumber);
        collectionContainer.appendChild(placeholderNumberContainer);

        collectionContainer.appendChild(collectionLink);
        collectionsContainer.appendChild(collectionContainer);
    }
});

// Event-Listener für den Button
collectionButton.addEventListener('click', () => {
    const isHidden = collectionsContainer.style.display === 'none';
    collectionsContainer.style.display = isHidden ? 'flex' : 'none';
    collectionButton.textContent = isHidden ? '- COLLECTION' : '+ COLLECTION';
});
}

    // Function to process email validation and submission
    function processSubscription(email, newsletterLabel, emailInput) {
        if (isValidEmail(email)) {
            fetch("https://subscribe.fadedcloth.de/sub", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: email })
            })
            .then(response => response.json())
            .then(data => {
                newsletterLabel.textContent = "THANK YOU!";
                emailInput.value = '';
                emailInput.disabled = true;
                submitButton.classList.add('hidden');
            })
            .catch(error => {
                console.error("Error:", error);
            });
        } else {
            shakeElement(emailInput);
        }
    }
    });
//LOAD DROP LIST --END--