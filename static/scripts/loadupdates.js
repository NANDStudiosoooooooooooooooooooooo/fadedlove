export async function initializeLoadDropList() {
    const queryParams = new URLSearchParams(window.location.search);
    const blogHandle = queryParams.get('blog') || 'main-blog';
  
    const query = `
    {
      blogByHandle(handle: "${blogHandle}") {
        articles(first: 50) {
          edges {
            node {
              id
              handle
              title
              image {
                url
              }
            }
          }
        }
      }
    }`;
  
    try {
      const response = await fetch('https://fadedcloth-dev.myshopify.com/api/2023-04/graphql.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': '164c16be080cbc521c378eb87142486d'
        },
        body: JSON.stringify({ query })
      });
  
      const json = await response.json();
  
      if (!json.data.blogByHandle || !json.data.blogByHandle.articles.edges.length) {
        document.getElementById('drops-container').innerHTML = '<div class="headline">NO POSTS FOUND.</div>';
        return;
      }
  
      const articles = json.data.blogByHandle.articles.edges.map(edge => edge.node);
      const container = document.getElementById('drops-container');
      container.innerHTML = '';
  
      articles.forEach((article, index) => {
        const formattedIndex = String(index + 1).padStart(2, '0');
  
        const blogElement = document.createElement('div');
        blogElement.classList.add('drop-item');
  
        blogElement.innerHTML = `
          <div class="drop-number-container">
            <div>#</div>
            <div>${formattedIndex}</div>
          </div>
          <a class="drop_link active" href="https://fadedcloth.de/legal?blog=${article.handle}&bloghandle=${blogHandle}">
            ${article.title}
            <img src="${article.image ? article.image.url : 'https://fadedcloth.de/default-blog.png'}" alt="" class="product-image floating">
          </a>
        `;
  
        container.appendChild(blogElement);
      });
  
    } catch (error) {
      console.error("Fehler beim Laden der Blogposts:", error);
      document.getElementById('drops-container').innerHTML = '<div class="headline">ERROR LOADING BLOG.</div>';
    }
  }
  
  export function checkMarquee() {
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
  
  document.addEventListener("DOMContentLoaded", () => {
    initializeLoadDropList();
    checkMarquee();
  });
  