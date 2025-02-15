function initializeScripts() {
    console.log("{initializeScripts}: Execution started");
    if (process.client) {
        console.log("{initializeScripts}: Client-side detected");
        document.addEventListener('DOMContentLoaded', async function() {
        console.log("{initializeScripts}: Window loaded");
  
        // SCROLL TO NEXT DROP BUTTON --BEGIN--
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const element = document.querySelector('.scroll-text');
            console.log(scrollPosition);
            if (scrollPosition > 0) {
              element.classList.replace('fade-in', 'fade-out');
              console.log('fade-out');
              element.style.userSelect = 'none';
              element.style.pointerEvents = 'none';
            } else {
              element.classList.replace('fade-out', 'fade-in');
              element.style.userSelect = '';
              element.style.pointerEvents = '';
            }
          });
    
          // BACKGROUND BLUR ON SCROLL --BEGIN--
          const blurOverlay = document.getElementById('blurOverlay');
          const maxBlur = 15; // setting
    
          window.addEventListener('scroll', () => {
              console.log('scrolling');
            const scrollPosition = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const blurValue = (scrollPosition / documentHeight) * maxBlur;
    
            blurOverlay.style.backdropFilter = `blur(${blurValue}px)`;
            blurOverlay.style.webkitBackdropFilter = `blur(${blurValue}px)`;
          });
        // BACKGROUND BLUR ON SCROLL --END--
  
        // LOAD NEWSTAB --BEGIN--
        const newsTab = document.getElementById("news-tab");
        const newsHeader = document.getElementById("news-header");
        const newsMedia = document.getElementById("news-media");
        const headline = document.getElementById("news-headline");
  
        let currentHeightState = "collapsed";
        let lastScrollY = window.scrollY;
        let lastShownScrollY = window.scrollY;
  
        async function fetchLatestBlogPost() {
          const API_URL = "https://checkout.fadedcloth.de/api/2023-04/graphql.json";
          const STOREFRONT_TOKEN = "ed72f09d8742f37356305b6e49310909";
  
          const query = `
          {
            blog(handle: "announcement") {
              articles(first: 1) {
                edges {
                  node {
                    title
                    onlineStoreUrl
                    image {
                      originalSrc
                      altText
                    }
                    metafields(identifiers: [
                      { namespace: "announcement", key: "link" }
                    ]) {
                      key
                      value
                    }
                  }
                }
              }
            }
          }`;
  
          const response = await fetch(API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
            },
            body: JSON.stringify({ query }),
          });
  
          const result = await response.json();
  
          if (result.data.blog && result.data.blog.articles.edges.length > 0) {
            return result.data.blog.articles.edges[0].node;
          } else {
            console.error("No articles found in the announcement blog.");
            return null;
          }
        }
  
        try {
          const latestBlogPost = await fetchLatestBlogPost();
  
          if (latestBlogPost) {
            headline.textContent = latestBlogPost.title;
            const img = document.createElement("img");
            img.src = latestBlogPost.image.originalSrc;
            img.alt = latestBlogPost.image.altText || "Blog Image";
            img.id = "media";
            img.classList.add("media");
            img.setAttribute("data-tilt", "");
            newsMedia.appendChild(img);
  
            const blogLink =
              latestBlogPost.metafields[0]?.value || latestBlogPost.onlineStoreUrl;
  
            newsMedia.addEventListener("click", () => {
              window.open(blogLink, "_blank");
            });
            newsTab.classList.remove("hidden");
          } else {
            newsTab.classList.add("hidden");
          }
        } catch (error) {
          console.error("Error loading blog post:", error);
          newsTab.classList.add("hidden");
        }
  
        newsHeader?.addEventListener("click", () => {
          if (currentHeightState === "collapsed") {
            newsTab.classList.remove("collapsed");
            newsTab.classList.add("half-height");
            currentHeightState = "half-height";
          } else if (currentHeightState === "half-height") {
            newsTab.classList.remove("half-height");
            newsTab.classList.add("full-height");
            currentHeightState = "full-height";
          } else if (currentHeightState === "full-height") {
            newsTab.classList.remove("full-height");
            newsTab.classList.add("collapsed");
            currentHeightState = "collapsed";
          }
        });
  
        window.addEventListener("scroll", () => {
          const currentScrollY = window.scrollY;
  
          if (currentScrollY > lastScrollY && currentHeightState === "collapsed") {
            newsTab.classList.add("news-hidden");
          } else if (
            currentScrollY < lastScrollY &&
            currentScrollY < lastShownScrollY - 30 // setting
          ) {
            newsTab.classList.remove("news-hidden");
          }
  
          lastScrollY = currentScrollY;
  
          if (newsTab.classList.contains("news-hidden")) {
            lastShownScrollY = currentScrollY;
          }
        });
        // LOAD NEWSTAB --END--
  
        console.log("{initializeScripts}: Execution completed with 0 errors");
      }
    )}
  }
  
  export default initializeScripts;
  