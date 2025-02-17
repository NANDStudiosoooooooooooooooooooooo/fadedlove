<template>
  <div class="featured-items-container fade-in">
    <div class="featured-items-inner" id="featured-items">
      <!-- Featured items werden hier dynamisch eingefügt -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoaderMoreItems',
  props: {
    maxItems: {
      type: Number,
      default: 9,
    }
  },
  data() {
    return {
      itemsData: []
    };
  },
  async mounted() {
    await this.main();
    this.setupHoverListeners();
  },
  methods: {
    async fetchFeaturedItems() {
      const query = `
        {
          products(first: 100) {
            edges {
              node {
                handle
                title
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
                      metafields(identifiers: [
                        {namespace: "custom", key: "colorhex"}
                      ]) {
                        key
                        value
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const response = await fetch('https://checkout.fadedcloth.de/api/2023-04/graphql.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': 'ed72f09d8742f37356305b6e49310909'
        },
        body: JSON.stringify({ query })
      });

      const data = await response.json();
      return data.data.products.edges.map(product => {
        const metafields = product.node.variants.edges[0]?.node.metafields || [];
        const colorHexField = metafields.find(field => field.key === 'colorhex');
        const colorHex = colorHexField ? colorHexField.value : 'var(--color-white)';

        return {
          handle: product.node.handle,
          title: product.node.title,
          imageSrc: product.node.images.edges[0]?.node.src || '',
          color: /^#[0-9A-Fa-f]{6}$/.test(colorHex) ? colorHex : 'var(--color-white)'
        };
      });
    },
    createItem(data) {
      const item = document.createElement('div');
      item.classList.add('featured-item');
      item.classList.add('floating');

      const eclipse = document.createElement('div');
      eclipse.classList.add('blurred-eclipse-background');
      eclipse.style.backgroundColor = data.color;

      const img = document.createElement('img');
      img.src = data.imageSrc;

      item.addEventListener('click', () => {
        window.location.href = `https://fadedcloth.de/item/?item=${data.handle}`;
      });

      item.appendChild(eclipse);
      item.appendChild(img);
      return item;
    },
    initializeItems() {
      const featuredItemsInner = document.getElementById('featured-items');
      const maxItems = this.maxItems;
      const selectedItems = [];
      const totalItems = this.itemsData.length;

      for (let i = 0; i < maxItems; i++) {
        const randomItem = this.itemsData[i % totalItems];
        selectedItems.push(randomItem);
      }

      const loopItems = [...selectedItems, ...selectedItems];
      loopItems.push(selectedItems[0], selectedItems[1]);

      loopItems.forEach(itemData => {
        const item = this.createItem(itemData);
        featuredItemsInner.appendChild(item);
      });

      const totalWidth = this.maxItems * 130;
      console.log('max:', maxItems);
      console.log('Total width:', totalWidth);
      featuredItemsInner.style.width = `${totalWidth}px`;
    },
    setupHoverListeners() {
      const featuredItemsInner = document.getElementById('featured-items');

      featuredItemsInner.addEventListener('mouseover', () => {
        featuredItemsInner.style.animationPlayState = 'paused';
      });

      featuredItemsInner.addEventListener('mouseout', () => {
        featuredItemsInner.style.animationPlayState = 'running';
      });
    },
    async main() {
      this.itemsData = await this.fetchFeaturedItems();
      const minItems = 28;

      let totalItemsCount = 0;

      while (totalItemsCount < minItems + this.maxItems) {
        totalItemsCount += this.maxItems;
      }

      this.itemsData = this.itemsData.sort(() => Math.random() - 0.5).slice(0, totalItemsCount);
      console.log('Items:', totalItemsCount);
      
      this.initializeItems();
    }
  }
};
</script>
  
  <style scoped>
  </style>