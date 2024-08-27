window.addEventListener('scroll', function() {
    const footer = document.querySelector('footer');
    const logo = document.querySelector('.logo');
    const distanceFromBottom = footer.getBoundingClientRect().top - window.innerHeight;
  
    if (distanceFromBottom < 0) {
      const scaleValue = Math.max(0.5, 1 + distanceFromBottom / 200);
      document.documentElement.style.setProperty('--logo-scale', scaleValue);
      logo.style.marginBottom = `${-distanceFromBottom * 0.5}px`;
    } else {
      document.documentElement.style.setProperty('--logo-scale', 1);
      logo.style.marginBottom = '0px';
    }
  });

    // Verhindert Rechtsklick
    document.addEventListener('contextmenu', function(e) {
        if (e.target.closest('.logo')) {
          e.preventDefault();
        }
      });
    
      // Verhindert Drag-and-Drop (z.B. zum Kopieren des Bildes)
      document.addEventListener('dragstart', function(e) {
        if (e.target.closest('.logo img')) {
          e.preventDefault();
        }
      });
    
      // Verhindert das Kopieren über das Kontextmenü
      document.addEventListener('copy', function(e) {
        if (e.target.closest('.logo')) {
          e.preventDefault();
        }
      });