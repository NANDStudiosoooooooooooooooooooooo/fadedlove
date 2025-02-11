import '../styles/index_site.scss'

async function loadBlogPosts() {
    const queryParams = new URLSearchParams(window.location.search);
    const blogHandle = queryParams.get('blog') || 'main-blog'; // Standard: "main-blog"

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
        const response = await fetch('https://checkout.fadedcloth.de/api/2023-04/graphql.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': 'ed72f09d8742f37356305b6e49310909'
            },
            body: JSON.stringify({ query })
        });

        const json = await response.json();

        // Falls der Blog nicht existiert oder keine Posts hat
        if (!json.data.blogByHandle || !json.data.blogByHandle.articles.edges.length) {
            document.getElementById('drops-container').innerHTML = '<div class="headline">NO POSTS FOUND.</div>';
            return;
        }

        const articles = json.data.blogByHandle.articles.edges.map(edge => edge.node);
        const container = document.getElementById('drops-container');
        container.innerHTML = '';

        articles.forEach((article, index) => {
            const formattedIndex = String(index + 1).padStart(2, '0'); // 2-stellige Zahl

            const blogElement = document.createElement('div');
            blogElement.classList.add('drop_item');

            blogElement.innerHTML = `
                <div class="drop_number_container">
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

document.addEventListener("DOMContentLoaded", loadBlogPosts);