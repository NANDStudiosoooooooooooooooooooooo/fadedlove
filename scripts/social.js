document.getElementById('social-select').addEventListener('change', function() {
    const socialLink = document.getElementById('social-select-link');
    const selectedPlatform = this.value;

    switch (selectedPlatform) {
        case 'instagram':
            socialLink.href = 'https://instagram.com/fadedcloth.de';
            break;
        case 'tiktok':
            socialLink.href = 'https://tiktok.com/@fadedcloth.de';
            break;
        case 'twitter':
            socialLink.href = 'https://x.com/fadedcloth';
            break;
    }
});
