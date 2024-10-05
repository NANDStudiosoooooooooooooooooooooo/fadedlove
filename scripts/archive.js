document.addEventListener("DOMContentLoaded", function () {
    const archiveContainer = document.getElementById('archive-container');
    const loading = document.getElementById('loading');
  
    // Fetch archive items from archive.json
    fetch('/JSON/archive.json')
      .then(response => response.json())
      .then(data => {
        loading.style.display = 'none'; // Hide loader once data is ready
        spawnItems(data);
      })
      .catch(error => console.error('Error loading archive items:', error));
  
    function spawnItems(items) {
      items.forEach(item => createFloatingItem(item));
      // Repeatedly spawn new items
      setInterval(() => {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        createFloatingItem(randomItem);
      }, 2000); // Adjust the interval for infinite spawning
    }
  
    function createFloatingItem(item) {
      const imgElement = document.createElement('img');
      imgElement.src = item.image; // Image from JSON
      imgElement.alt = item.name;
      imgElement.classList.add('floating-item');
      imgElement.style.position = 'absolute';
  
      const startPos = randomStartPosition();
      imgElement.style.left = `${startPos.x}px`;
      imgElement.style.top = `${startPos.y}px`;
  
      const itemDetails = document.createElement('div');
      itemDetails.classList.add('item-details');
      itemDetails.innerHTML = `<p>${item.name}</p><p>${item.price} EUR</p>`;
  
      imgElement.addEventListener('mouseover', () => {
        imgElement.style.animationPlayState = 'paused'; // Stop movement
        archiveContainer.appendChild(itemDetails);
      });
  
      imgElement.addEventListener('mouseout', () => {
        imgElement.style.animationPlayState = 'running'; // Resume movement
        itemDetails.remove();
      });
  
      imgElement.addEventListener('click', (event) => handleItemClick(event, item));
  
      archiveContainer.appendChild(imgElement);
      moveItem(imgElement);
    }
  
    function handleItemClick(event, item) {
      if (event.detail === 1) {
        // First click: Show details
      } else if (event.detail === 2) {
        // Second click: Open link
        window.location.href = `/item?item=${item.shopify_id}`;
      }
    }
  
    function moveItem(item) {
      const duration = Math.random() * 10 + 5; // Varying speeds
      item.style.animation = `floatItem ${duration}s linear infinite`;
    }
  
    function randomStartPosition() {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      return { x, y };
    }
  });
  