document.addEventListener("DOMContentLoaded", () => {
    const queryParams = new URLSearchParams(window.location.search);
    const contentId = queryParams.get('id');

    if (!contentId) {
        return; // Beende das Script, wenn kein 'id'-Parameter vorhanden ist
    }

    // Funktion zum Laden der Markdown-Datei
    function loadMarkdown(contentId) {
        const filePath = `https://fadedcloth.de/text/${contentId}.md`; // Pfad zu den Markdown-Dateien
        
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
