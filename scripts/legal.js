document.addEventListener("DOMContentLoaded", () => {
    const queryParams = new URLSearchParams(window.location.search);
    const contentId = queryParams.get('id') || 'default'; // Fallback falls kein id vorhanden ist
    const showType = queryParams.get('show') || 'panel'; // Standard auf "panel"

    // Container-Elemente
    const contentTitle = document.getElementById('content-title');
    const contentBody = document.getElementById('content-body');
    const pageTitle = document.getElementById('page-title');
    const pageTextContent = document.getElementById('page-text-content');

    // Lade die Inhalte von der externen JSON-Datei
    fetch('/json/legal.json')
        .then(response => response.json())
        .then(data => {
            const content = data[contentId];
            if (content) {
                if (showType === 'page') {
                    // Inhalte für die Seitenansicht
                    document.getElementById('page-view').classList.remove('hidden');
                    contentTitle.textContent = ''; // Titel im Panel zurücksetzen
                    pageTitle.textContent = content.title;
                    pageTextContent.innerHTML = content.body; // HTML-Inhalt für die Seitenansicht
                } else {
                    // Inhalte für die Panelansicht
                    document.getElementById('content-container').classList.remove('hidden');
                    contentTitle.textContent = content.title;
                    contentBody.innerHTML = content.body; // HTML-Inhalt für die Panelansicht
                }
            } else {
                // Fehlerfall
                contentTitle.textContent = '404 - Not Found';
                pageTitle.textContent = '404 - Not Found';
                contentBody.innerHTML = 'Der angeforderte Inhalt konnte nicht gefunden werden.';
                pageTextContent.innerHTML = 'Der angeforderte Inhalt konnte nicht gefunden werden.';
            }
        })
        .catch(error => {
            contentTitle.textContent = 'Error';
            pageTitle.textContent = 'Error';
            contentBody.innerHTML = 'Ein Fehler ist aufgetreten beim Laden des Inhalts.';
            pageTextContent.innerHTML = 'Ein Fehler ist aufgetreten beim Laden des Inhalts.';
            console.error('Error loading content:', error);
        });
});
