document.addEventListener("DOMContentLoaded", () => {
    const queryParams = new URLSearchParams(window.location.search);
    const contentId = queryParams.get('id') || 'terms-of-service'; // Fallback auf 'terms-of-service'

    // Funktion zum Laden der Markdown-Datei
    function loadMarkdown(contentId) {
        const filePath = `legal/terms-of-service.md`; // Pfad zu den Markdown-Dateien
        
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
            })
            .catch(error => {
                document.getElementById('text-content').innerHTML = '<p>Inhalt konnte nicht geladen werden.</p>';
                console.error('Fehler beim Laden:', error);
            });
    }

    loadMarkdown(contentId); // Lade die Markdown-Datei beim Laden der Seite
});
