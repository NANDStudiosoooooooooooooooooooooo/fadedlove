document.addEventListener("DOMContentLoaded", () => {
    loadBlogPost();
    const queryParams = new URLSearchParams(window.location.search);
    const contentId = queryParams.get('id');

    if (!contentId) {
        return; // Beende das Script, wenn kein 'id'-Parameter vorhanden ist
    }

    // Funktion zum Laden der Markdown-Datei
    function loadMarkdown(contentId) {
        const filePath = `https://cdn.shopify.com/s/files/1/0905/8592/3907/files/${contentId}.md`; // Pfad zu den Markdown-Dateien
        
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Datei nicht gefunden'); // Fehler, wenn die Datei nicht geladen werden kann
                }
                return response.text();
            })
            .then(text => {
                const html = marked(text); // Umwandlung von Markdown in HTML
                document.getElementById('text-content').innerHTML = html; // Anzeige des Inhalts
                document.getElementById('content-title').textContent = contentId.replace(/-/g, ' ').toUpperCase(); // Setze den Titel dynamisch
            })
            .catch(error => {
                document.getElementById('text-content').innerHTML = '<a href="https://fadedcloth.de">404 NOT FOUND.</a>';
                document.getElementById('content-title').textContent ="404";
                console.error('Fehler beim Laden:', error);
            });
    }

    loadMarkdown(contentId); // Lade die Markdown-Datei beim Laden der Seite
});

async function loadBlogPost() {
    const params = new URLSearchParams(window.location.search);
    const blogHandle = params.get('bloghandle') || 'main-blog'; // Standard ist "main-blog"
    const blogPostHandle = params.get('blog'); // Blogpost-Handle

    if (!blogPostHandle) {
        return;
    }

    const query = `
    {
        blogByHandle(handle: "${blogHandle}") {
            articles(first: 50) {
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
        const response = await fetch('https://fadedcloth-dev.myshopify.com/api/2023-04/graphql.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': '164c16be080cbc521c378eb87142486d'
            },
            body: JSON.stringify({ query })
        });

        const json = await response.json();
        
        // Prüfen, ob der Blog existiert
        if (!json.data.blogByHandle) {
            console.error("Der Blog wurde nicht gefunden.");
            document.querySelector('.headline').textContent = "Blog not found";
            document.querySelector('.text').innerHTML = "";
            return;
        }

        const articles = json.data.blogByHandle.articles.edges.map(edge => edge.node);
        const blogPost = articles.find(article => article.handle === blogPostHandle);

        if (blogPost) {
            document.querySelector('.headline').textContent = blogPost.title;
            document.querySelector('.text').innerHTML = blogPost.contentHtml;
        } else {
            document.querySelector('.headline').textContent = "Blog post not found";
            document.querySelector('.text').innerHTML = "";
        }
    } catch (error) {
        console.error("Error loading blog:", error);
        document.querySelector('.headline').textContent = "Error loading blog";
    }
}

document.addEventListener("DOMContentLoaded", loadBlogPost);