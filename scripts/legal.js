document.addEventListener("DOMContentLoaded", () => {
    const queryParams = new URLSearchParams(window.location.search);
    const contentId = queryParams.get('id') || 'default'; // Fallback falls kein id vorhanden ist
    const showType = queryParams.get('show') || 'panel'; // Standard auf "panel"

    // Lade die Inhalte von der externen JSON-Datei
    fetch('/json/legal.json')
        .then(response => response.json())
        .then(data => {
            const content = data[contentId];
            if (content) {
                if (showType === 'page') {
                    // Zeige den Inhalt auf der Seite an
                    document.getElementById('content-container').style.display = 'none'; // Verstecke das Panel
                    document.body.style.backgroundColor = "#000"; // Hintergrundfarbe für die Seitenansicht
                    document.getElementById('content-title').textContent = content.title;
                    document.getElementById('text-content').innerHTML = content.body; // HTML-Inhalt
                } else {
                    // Der Inhalt bleibt im Panel
                    document.getElementById('content-title').textContent = content.title;
                    document.getElementById('text-content').innerHTML = content.body; // HTML-Inhalt
                }
            } else {
                document.getElementById('content-title').textContent = '404 - Not Found';
                document.getElementById('text-content').innerHTML = 'Der angeforderte Inhalt konnte nicht gefunden werden.';
            }
        })
        .catch(error => {
            document.getElementById('content-title').textContent = 'Error';
            document.getElementById('text-content').innerHTML = 'Ein Fehler ist aufgetreten beim Laden des Inhalts.';
            console.error('Error loading content:', error);
        });
});
