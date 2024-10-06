// Funktion zur Aktualisierung des Links basierend auf der Auswahl
function updateSocialLink() {
    const selectBox = document.getElementById('social-select');
    const link = document.getElementById('social-select-link');

    // Definieren der URLs für jede Social-Media-Plattform
    const links = {
        instagram: 'https://instagram.com/fadedcloth.de',
        tiktok: 'https://tiktok.com/@fadedcloth.de',
        twitter: 'https://x.com/fadedcloth'
    };

    // Hole den ausgewählten Wert und aktualisiere den href-Link
    const selectedPlatform = selectBox.value;
    link.href = links[selectedPlatform];
}

// Event Listener, um den Link zu aktualisieren, wenn der Benutzer eine Option wählt
document.getElementById('social-select').addEventListener('change', updateSocialLink);

// Standardmäßig Instagram auswählen und den Link setzen
document.addEventListener('DOMContentLoaded', function() {
    updateSocialLink();
});
