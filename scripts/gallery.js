import '../styles/gallery.scss'

document.addEventListener('DOMContentLoaded', async () => { 
    const imageContainer = document.querySelector('.gallery-image-container');
    const headlineContainer = document.querySelector('.gallery-headline');
    const buttonContainer = document.querySelector('.gallery-imagebutton-container');

    let currentImageIndex = 0;

    // Funktion zum Aktualisieren der Galerie
    function updateGallery(index, posts) {
        const selectedPost = posts[index];
        const imageUrl = selectedPost.image;
        const postTitle = selectedPost.title;
        const postLink = selectedPost.link;

        // Update image
        imageContainer.innerHTML = `<img src="${imageUrl}" class="fade-in">`;

        // Remove and re-add fade-in class
        const imageElement = imageContainer.querySelector('img');
        imageElement.classList.remove('fade-in');
        void imageElement.offsetWidth; // Force reflow for animation reset
        imageElement.classList.add('fade-in');

        // Update headline
        headlineContainer.innerHTML = postLink
            ? `<a href="${postLink}" class="headline">${postTitle}</a>`
            : `<span class="headline">${postTitle}</span>`;

        // Update button class
        document.querySelectorAll('.gallery-imagebutton-container button').forEach((btn, idx) => {
            btn.classList.toggle('soft-shake', idx === index);
            btn.classList.toggle('active-image-button', idx === index);
        });

        // Scroll to button if necessary
        const selectedButton = buttonContainer.children[index];
        selectedButton.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }

    // Funktion zum Laden der Blog-Daten aus Shopify
    async function loadGalleryData() {
        const query = `{
            blog(handle: "gallery") {
                articles(first: 100) {
                    edges {
                        node {
                            title
                            image {
                                src
                            }
                            metafields(identifiers: [
                                {namespace: "gallery", key: "product"},
                                {namespace: "gallery", key: "collection"}
                            ]) {
                                namespace
                                key
                                value
                            }
                        }
                    }
                }
            }
        }`;

        try {
            const response = await fetch("https://checkout.fadedcloth.de/api/2023-07/graphql.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Storefront-Access-Token": "ed72f09d8742f37356305b6e49310909"
                },
                body: JSON.stringify({ query })
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            let posts = data.data.blog.articles.edges.map(edge => {
                const article = edge.node;
                const image = article.image?.src || '';
                const metafields = article.metafields || [];

                // Sicherstellen, dass die Metafelder vorhanden sind und nicht leer
                const productId = metafields?.find(
                    metafield => metafield?.namespace === "gallery" && metafield?.key === "product"
                )?.value?.match(/gid:\/\/shopify\/Product\/(\d+)/)?.[1] || null;

                const collectionId = metafields?.find(
                    metafield => metafield?.namespace === "gallery" && metafield?.key === "collection"
                )?.value?.match(/gid:\/\/shopify\/Collection\/(\d+)/)?.[1] || null;

                // Bestimmen des Links basierend auf den Metafeldern
                let link = null;
                if (productId) {
                    link = `https://fadedcloth.de/item?item_id=${productId}`;
                } else if (collectionId) {
                    link = `https://fadedcloth.de/shop?collection_id=${collectionId}&hide=TRUE`;
                }

                // Rückgabe des Posts mit Link
                return {
                    title: article.title,
                    image: image,
                    link: link
                };
            });

            // Posts umdrehen, damit der neueste Post am Anfang kommt
            posts.reverse();

            // Buttons dynamisch laden
            posts.forEach((post, index) => {
                const button = document.createElement('button');
                button.innerHTML = `<img src="${post.image}" alt="${post.title}">`;
                button.addEventListener('click', () => {
                    currentImageIndex = index;
                    updateGallery(index, posts);
                });
                buttonContainer.appendChild(button);
            });

            // Initial mit dem ersten Post starten
            if (posts.length > 0) {
                updateGallery(0, posts);
            }

            // Swipe events für mobile
            let touchStartX = 0;
            imageContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            });

            imageContainer.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                if (touchEndX < touchStartX - 50) {
                    currentImageIndex = (currentImageIndex + 1) % posts.length;
                    updateGallery(currentImageIndex, posts);
                } else if (touchEndX > touchStartX + 50) {
                    currentImageIndex = (currentImageIndex - 1 + posts.length) % posts.length;
                    updateGallery(currentImageIndex, posts);
                }
            });

            // Scroll event für PC
            imageContainer.addEventListener('wheel', (e) => {
                if (e.deltaY > 0) {
                    currentImageIndex = (currentImageIndex + 1) % posts.length;
                } else {
                    currentImageIndex = (currentImageIndex - 1 + posts.length) % posts.length;
                }
                updateGallery(currentImageIndex, posts);
            });
        } catch (error) {
            console.error("Error loading gallery data:", error);
        }
    }

    // Galerie-Daten laden
    await loadGalleryData();
});