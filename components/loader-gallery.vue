<template>
    <div class="gallery-container fade-in">
      <div class="gallery-headline"></div>
      <div class="gallery-image-container" data-tilt></div>
      <div class="gallery-imagebutton-container"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoaderGallery',
    mounted() {
      this.loadGalleryData();
    },
    methods: {
      updateGallery(index, posts) {
        const imageContainer = document.querySelector('.gallery-image-container');
        const headlineContainer = document.querySelector('.gallery-headline');
        const buttonContainer = document.querySelector('.gallery-imagebutton-container');
  
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
      },
  
      async loadGalleryData() {
        const imageContainer = document.querySelector('.gallery-image-container');
        const headlineContainer = document.querySelector('.gallery-headline');
        const buttonContainer = document.querySelector('.gallery-imagebutton-container');
  
        let currentImageIndex = 0;
  
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
              this.updateGallery(index, posts);
            });
            buttonContainer.appendChild(button);
          });
  
          // Initial mit dem ersten Post starten
          if (posts.length > 0) {
            this.updateGallery(0, posts);
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
              this.updateGallery(currentImageIndex, posts);
            } else if (touchEndX > touchStartX + 50) {
              currentImageIndex = (currentImageIndex - 1 + posts.length) % posts.length;
              this.updateGallery(currentImageIndex, posts);
            }
          });
  
          // Scroll event für PC
          imageContainer.addEventListener('wheel', (e) => {
            if (e.deltaY > 0) {
              currentImageIndex = (currentImageIndex + 1) % posts.length;
            } else {
              currentImageIndex = (currentImageIndex - 1 + posts.length) % posts.length;
            }
            this.updateGallery(currentImageIndex, posts);
          });
        } catch (error) {
          console.error("Error loading gallery data:", error);
        }
      }
    }
  }
  </script>
  
  

<style scoped>
/* Deaktiviere das Überschreiben von Stilen aus main.css */
.gallery-container {
  width: 100% !important;
  max-width: 450px !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  z-index: 6900 !important;
}

.gallery-headline {
  text-align: center !important;
  font-size: 2rem !important;
  margin-bottom: 10px !important;
  color: white !important;
}

.gallery-headline a {
  text-decoration: none !important;
  color: inherit !important;
}

.gallery-image-container {
  width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  overflow: visible !important;
  position: relative !important;
  margin-bottom: 10px !important;
}

@media (max-width: 500px) {
  .gallery-container {
    max-width: 100% !important;
  }

  @media (max-height: 780px) {
    .gallery-container {
      max-width: auto !important;
      max-height: calc(100% - 150px) !important;
    }
  }
}

@media (max-height: 780px) {
  .gallery-container {
    max-width: auto !important;
    max-height: calc(100% - 150px) !important;
  }
}

.gallery-image-container img {
  width: 100% !important;
  height: auto !important;
  object-fit: cover !important;
  transition: opacity 0.5s ease !important;
}

.gallery-imagebutton-container {
  display: flex !important;
  max-width: 100% !important;
  overflow: hidden !important;
  scrollbar-width: none !important;
  scrollbar-color: rgb(255 255 255 / 20%) transparent !important;
  scroll-snap-type: x mandatory !important; /* Buttons will snap into view when scrolling */
}

.gallery-imagebutton-container::-webkit-scrollbar-track {
  background: transparent !important; /* Transparent scrollbar track */
}

/* Ensures the active button is always visible */
.gallery-imagebutton-container button.active-image-button {
  scroll-margin-left: 10px !important; /* Ensures active button is smoothly scrolled into view */
}

.gallery-imagebutton-container button {
  border: none !important;
  background: none !important;
  margin-right: 10px !important;
  cursor: pointer !important;
  transition: transform 0.3s !important;
}

.gallery-imagebutton-container button img {
  width: 50px !important;
  height: 50px !important;
  object-fit: cover !important;
}

.gallery-imagebutton-container::-webkit-scrollbar {
  height: 5px;
}

.gallery-imagebutton-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.gallery-imagebutton-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}

  </style>
  