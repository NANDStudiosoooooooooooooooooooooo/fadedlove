fetch('https://fadedcloth.de/JSON/items.json')
  .then(response => response.json())
  .then(items => {
    const shopContainer = document.querySelector('.shop-container'); // Using class selector for 'shop-container'

    items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('shop-item');

      const itemImage = document.createElement('img');
      itemImage.src = item.images[0];  // Set first image
      itemImage.alt = item.name;

      // Change to second image on hover
      itemDiv.addEventListener('mouseenter', () => {
        itemImage.src = item.images[1];  // Switch to second image
      });
      itemDiv.addEventListener('mouseleave', () => {
        itemImage.src = item.images[0];  // Switch back to first image
      });

      // Add the item name and price
      const itemInfo = document.createElement('div');
      itemInfo.classList.add('item-info'); // Using 'item-info' class for hover effect
      itemInfo.innerHTML = `<h3>${item.name}</h3><p>${item.price}</p>`;

      // Add the link to the item page
      const itemLink = document.createElement('a');
      itemLink.href = `/item?item=${item.id}`;
      itemLink.appendChild(itemImage);
      
      // Append everything to the itemDiv
      itemDiv.appendChild(itemLink);
      itemDiv.appendChild(itemInfo);
      
      // Append to the container
      shopContainer.appendChild(itemDiv);
    });
  })
  .catch(error => console.error('Error fetching items:', error));
