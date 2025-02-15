<template>
    <div class="buttons-container">
      <button id="button1" class="glass-button" @click="togglePanel('panel1')">COLLECTION</button>
      <button id="button2" class="glass-button" @click="togglePanel('panel2')">INFO</button>
      <button id="button3" class="glass-button" @click="togglePanel('panel3')">NEWSLETTER</button>
      <!--<button id="button4" class="glass-button" @click="togglePanel('panel4')">SMS</button>-->
    
      <!-- Panel für Button 1 -->
      <div id="panel1" class="glass-panel hidden">
        <button class="close-btn" @click="togglePanel('panel1')">X</button>
        <a href="https://fadedcloth.de/lookbook" class="panel-link">GALLERY</a>
        <a href="https://fadedcloth.de/" class="panel-link">MAINPAGE</a>
      </div>
  
      <!-- Panel für Button 2 -->
      <div id="panel2" class="glass-panel hidden">
        <button class="close-btn" @click="togglePanel('panel2')">X</button>
        <div class="social-container">
          <select title="SOCIAL" id="social-select" @change="updateSocialLink">
            <option value="instagram">INSTAGRAM</option>
            <option value="tiktok">TIKTOK</option>
            <option value="twitter">TWITTER</option>
          </select>
          <a class="underlineonhover" id="social-select-link" href="https://instagram.com/fadedcloth.de">fadedcloth.de</a>
        </div>
        <a href="mailto:help@fadedcloth.de" class="panel-link">CONTACT</a>
        <a href="/legal?id=privacy-policy" class="panel-link">PRIVACY POLICY</a>
        <a href="/legal?id=terms-of-service" class="panel-link">TERMS OF SERVICE</a>
        <div class="copyright">&copy; FADEDCLOTH 2024</div>
      </div>
  
      <!-- Panel für Button 3 (Subscribe Panel) -->
      <div id="panel3" class="glass-panel hidden">
        <button class="close-btn" @click="togglePanel('panel3')">X</button>
        <div class="headline">SUBSCRIBE FOR UPDATES</div>
        <form id="emailForm" @submit.prevent="submitForm">
          <input 
            type="email" 
            id="email" 
            placeholder="ENTER YOUR EMAIL" 
            class="email-input"
            required 
          />
          <div class="checkbox-container">
            <input type="checkbox" id="termsCheckbox" class="custom-checkbox" required>
            <label for="termsCheckbox" class="checkbox-label">
              I ACCEPT THE <a class="href" href="/legal?id=terms-of-service">TERMS</a>
            </label>
          </div>
          <div class="form-buttons">
            <button id="subscribeButton" class="email-button small-button" type="submit">
            SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
  name: 'FooterButtons',
  mounted() {
    document.addEventListener('DOMContentLoaded', this.loadShopifyCollections);
    document.getElementById('social-select').addEventListener('change', this.updateSocialLink);
    document.addEventListener('click', this.handleDocumentClick);
  },
  methods: {
    togglePanel(panelId) {
        const panels = document.querySelectorAll('.glass-panel');
    const buttons = document.querySelectorAll('.glass-button');
    const currentPanel = document.getElementById(panelId);
    let isAnyPanelOpen = false;

    // Überprüfen, ob das aktuelle Panel bereits sichtbar ist
    panels.forEach(panel => {
        if (!panel.classList.contains('hidden')) {
            isAnyPanelOpen = true; // Ein Panel ist offen
        }
    });

    if (currentPanel.classList.contains('hidden')) {
        // Alle Panels schließen
        panels.forEach(panel => panel.classList.add('hidden'));

        // Aktuelles Panel öffnen
        currentPanel.classList.remove('hidden');

        // Button-Status aktualisieren
        buttons.forEach(button => {
            button.classList.remove('active-button');
        });
        const activeButton = Array.from(buttons).find(button => button.getAttribute('data-target') === panelId);
        if (activeButton) {
            activeButton.classList.add('active-button');
        }
    } else {
        // Wenn das Panel bereits offen ist, schließe es
        currentPanel.classList.add('hidden');
        const activeButton = Array.from(buttons).find(button => button.getAttribute('data-target') === panelId);
        if (activeButton) {
            activeButton.classList.remove('active-button');
        }
    }

    // Rückgabe, ob ein Panel offen ist
    return isAnyPanelOpen || !currentPanel.classList.contains('hidden');
    },
    updateSocialLink() {
      const linkElement = document.getElementById('social-select-link');
      const platform = document.getElementById('social-select').value;

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

      linkElement.href = href;
      linkElement.classList.add('jump');
      linkElement.addEventListener('animationend', function() {
        linkElement.classList.remove('jump');
      });
    },
    handleDocumentClick(event) {
      const panels = document.querySelectorAll('.glass-panel');
      const buttons = document.querySelectorAll('.glass-button');
      const links = document.querySelector('.collection-links');

      let clickedInsidePanel = false;
      let isAnyPanelOpen = false;

      panels.forEach(panel => {
        if (!panel.classList.contains('hidden')) {
          isAnyPanelOpen = true;
        }
        if (panel.contains(event.target)) {
          clickedInsidePanel = true;
        }
      });

      buttons.forEach(button => {
        if (button.contains(event.target)) {
          clickedInsidePanel = true;
        }
      });

      if (!clickedInsidePanel && isAnyPanelOpen) {
        panels.forEach(panel => panel.classList.add('hidden'));
        buttons.forEach(button => button.classList.remove('active-button'));
        if (links) {
          links.classList.add('hidden');
          links.style.display = 'none';
        }
      }
    },
    loadShopifyCollections() {
      const query = `
      {
        collections(first: 100) {
          edges {
            node {
              handle
              title
              metafields(identifiers: [
                {namespace: "custom", key: "isdrop"}
              ]) {
                key
                value
              }
            }
          }
        }
      }`;

      fetch('https://zkwisj-0b.myshopify.com/api/2023-10/graphql.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': 'ed72f09d8742f37356305b6e49310909'
        },
        body: JSON.stringify({ query })
      })
      .then(response => response.json())
      .then(json => {
        if (!json.data || !json.data.collections) {
          console.error('Fehlende oder ungültige Daten in der Antwort');
          return;
        }

        const collections = json.data.collections.edges.map(edge => edge.node);
        const panel1 = document.getElementById('panel1');
        if (!panel1) {
          console.error('Element mit ID "panel1" wurde nicht gefunden');
          return;
        }

        collections.forEach(collection => {
          const isDrop = collection.metafields && collection.metafields.length > 0
            ? collection.metafields.find(field => field.key === 'isdrop')?.value === 'false'
            : false;

          if (isDrop) {
            const collectionLink = document.createElement('a');
            collectionLink.href = `https://fadedcloth.de/shop/?collection=${collection.handle}&hide=TRUE`;
            collectionLink.classList.add('panel-link');
            collectionLink.textContent = collection.handle.toUpperCase();

            panel1.insertBefore(collectionLink, panel1.firstChild);
          }
        });
      })
      .catch(error => {
        console.error('Fehler beim Laden der Kollektionen:', error);
      });
    },
    submitForm() {
        document.getElementById("subscribeButton").addEventListener("click", function(event) {
    event.preventDefault();
    const emailInput = document.getElementById("email");
    const email = emailInput.value;
    const termsCheckbox = document.getElementById("termsCheckbox");
    const checkboxContainer = document.querySelector('.checkbox-container');

    // Zuerst die E-Mail validieren
    if (!isValidEmail(email)) {
        shakeElement(emailInput); // Nur das E-Mail-Feld wackelt
    } else {
        // E-Mail ist gültig, dann prüfen, ob die Checkbox angeklickt ist
        if (!termsCheckbox.checked) {
            shakeElement(checkboxContainer); // Jetzt nur die Checkbox und der Text wackeln
        } else {
            // Wenn beides korrekt ist, den normalen Submit-Prozess starten
            fetch("https://subscribe.fadedcloth.de/sub", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: email })
            })
            .then(response => response.json())
            .then(data => {
                const currentUrl = encodeURIComponent(window.location.href);
                window.location.href = `https://subscribe.fadedcloth.de/success?SUBSCRIBED&referrer=${currentUrl}`;
            })
            .catch(error => {
                alert("An error occurred: " + error.message);
            });
        }
    }
});

function shakeElement(element) {
  element.classList.add("shake");
  setTimeout(() => {
      element.classList.remove("shake");
  }, 500); // Remove shake effect after 500ms
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
    }
  }
}
</script>