<template>
    <div class="fade-in">
      <div class="headline" id="content-title" style="margin-top: 140px;"></div>
      <div class="main-body">
        <div class="text" id="text-content">WAIT FOR THE CONTENT TO LOAD</div>
      </div>
    </div>
  </template>
  
  <script>
  import showdown from 'showdown';
  
  export default {
    name: 'LoaderContent',
    mounted() {
      this.loadBlogPost();
    },
    methods: {
      async loadBlogPost() {
        const params = new URLSearchParams(window.location.search);
        const blogHandle = params.get('bloghandle') || 'main-blog'; // Standard ist "main-blog"
        const blogPostHandle = params.get('blog'); // Blogpost-Handle
  
        if (!blogPostHandle) {
          console.error("No blog post handle provided.");
          const queryParams = new URLSearchParams(window.location.search);
          const contentId = queryParams.get('id');
          this.loadMarkdown(contentId);
          return;
        }
  
        const query = `
        {
            blogByHandle(handle: "${blogHandle}") {
                articles(first: 100) {
                    edges {
                        node {
                            id
                            handle
                            title
                            contentHtml
                        }
                    }
                }
            }
        }`;
  
        try {
          const response = await fetch('https://checkout.fadedcloth.de/api/2023-04/graphql.json', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Storefront-Access-Token': 'ed72f09d8742f37356305b6e49310909'
            },
            body: JSON.stringify({ query })
          });
  
          const json = await response.json();
          
          // Prüfen, ob der Blog existiert
          if (!json.data.blogByHandle) {
            console.error("Der Blog wurde nicht gefunden.");
            this.setContent("Blog not found", "");
            return;
          }
  
          const articles = json.data.blogByHandle.articles.edges.map(edge => edge.node);
          const blogPost = articles.find(article => article.handle === blogPostHandle);
  
          if (blogPost) {
            this.setContent(blogPost.title, blogPost.contentHtml);
          } else {
            this.setContent("Blog post not found", "");
          }
        } catch (error) {
          console.error("Error loading blog:", error);
          this.setContent("Error loading blog", "");
        }
      },
      setContent(title, content) {
        document.getElementById('content-title').textContent = title;
        document.querySelector('.text').innerHTML = content;
      },
      loadMarkdown(contentId) {
         const converter = new showdown.Converter();
        const filePath = `https://cdn.shopify.com/s/files/1/0892/0445/7817/files/${contentId}.md`; // Pfad zu den Markdown-Dateien
        
        fetch(filePath)
          .then(response => {
            if (!response.ok) {
              throw new Error('Datei nicht gefunden'); // Fehler, wenn die Datei nicht geladen werden kann
            }
            return response.text();
          })
          .then(text => {
            const html = converter.makeHtml(text); // Umwandlung von Markdown in HTML
            this.setContent(contentId.replace(/-/g, ' ').toUpperCase(), html);
          })
          .catch(error => {
            this.setContent("404", '<a href="https://fadedcloth.de">404 NOT FOUND.</a>');
            console.error('Fehler beim Laden:', error);
          });
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  