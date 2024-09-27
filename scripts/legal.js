document.addEventListener("DOMContentLoaded", () => {
    const queryParams = new URLSearchParams(window.location.search);
    const contentId = queryParams.get('id') || 'default'; // Fallback falls kein id vorhanden ist
    
    // Container-Elemente
    const contentTitle = document.getElementById('content-title');
    const contentBody = document.getElementById('content-body');
    
    // Lade die Inhalte von der externen JSON-Datei
    fetch('/json/legal.json')
        .then(response => response.json())
        .then(data => {
            const content = data[contentId];
            if (content) {
                contentTitle.textContent = content.title;
                contentBody.innerHTML = content.body; // Übernimmt HTML für formatierte Inhalte
            } else {
                contentTitle.textContent = '404 - Not Found';
                contentBody.textContent = 'The requested content could not be found.';
            }
        })
        .catch(error => {
            contentTitle.textContent = 'Error';
            contentBody.textContent = 'An error occurred while loading the content.';
            console.error('Error loading content:', error);
        });
});
