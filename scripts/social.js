document.getElementById('social-select').addEventListener('change', function() {
    const linkElement = document.getElementById('social-select-link');
    const platform = this.value;

    // Links je nach ausgewählter Plattform anpassen
    let href;
    switch (platform) {
        case 'tiktok':
            href = 'https://tiktok.com/@fadedcloth.de';
            break;
        case 'twitter':
            href = 'https://x.com/fadedcloth';
            break;
        case 'instagram':
        default:
            href = 'https://instagram.com/fadedcloth.de';
            break;
    }

    // Link aktualisieren
    linkElement.href = href;

    // Animation hinzufügen und nach Ende entfernen
    linkElement.classList.add('jump');
    linkElement.addEventListener('animationend', function() {
        linkElement.classList.remove('jump');
    });
});
