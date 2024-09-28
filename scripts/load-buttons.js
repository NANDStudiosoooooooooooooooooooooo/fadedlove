
fetch('buttons.html')
.then(response => response.text())
.then(data => {
    document.body.insertAdjacentHTML('beforeend', data);
})
.catch(error => console.error('Error loading buttons:', error));

