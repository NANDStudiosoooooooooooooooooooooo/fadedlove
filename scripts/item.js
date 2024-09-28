 // Fetch the item ID from the query parameter
 const params = new URLSearchParams(window.location.search);
 const itemId = params.get('item');

 // Fetch item data from external JSON file
 fetch('items.json')
     .then(response => response.json())
     .then(data => {
         const item = data.find(i => i.id === itemId);
         if (item) {
             displayItem(item);
         } else {
             document.getElementById('itemDetails').innerHTML = '<p>Item not found.</p>';
         }
     });

 // Function to display the item details
 function displayItem(item) {
     const itemDetails = document.getElementById('itemDetails');
     const itemShipping = document.getElementById('itemShipping');
     const itemId = document.getElementById('itemId');
     const imagesContainer = document.querySelector('.item-images-container');

     // Display item name, description, and price
     itemDetails.innerHTML = `
         <h2>${item.name}</h2>
         <p>${item.description}</p>
         <p>${item.shipping}</p>
         <p><strong>PRICE: ${item.price}</strong></p>
         <p>${item.description2}</p>
         <p><div id="product-component-${item.id}"></div></p>
     `;

     // Loop through images and add to the images container
     item.images.forEach(image => {
         const imgElement = document.createElement('img');
         imgElement.src = image;
         imgElement.alt = item.name;
         imagesContainer.appendChild(imgElement);
     });
 }