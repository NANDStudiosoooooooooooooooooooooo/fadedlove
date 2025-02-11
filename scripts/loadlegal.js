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