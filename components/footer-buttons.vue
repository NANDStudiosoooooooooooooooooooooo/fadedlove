<template>
  <div>
    <div class="buttons-container">
      <button id="button1" class="glass-button" @click="togglePanel('panel1')">COLLECTION</button>
      <button class="glass-button hidden" id="button5" @click="togglePanel('panel5')">DROP INFO</button>
      <button class="glass-button hidden"><input type="checkbox" class="custom-checkbox" id="label-toggle" checked><label class="underlineonhover clickcursor" for="label-toggle"><a class="checkbox-lable">LABELS</a></label></button>
      <button id="button2" class="glass-button" @click="togglePanel('panel2')">INFO</button>
      <button id="button3" class="glass-button" @click="togglePanel('panel3')">NEWSLETTER</button>
      <!--<button id="button4" class="glass-button" @click="togglePanel('panel4')">SMS</button>-->
    </div>
    <!-- Panel für Button 1 -->
    <div class="glass-panel-container" id="panel1-container">
      <div id="panel1" class="glass-panel hidden">
        <button class="close-btn" @click="togglePanel('panel1')"><svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.69182 5.50037L10.7535 1.43851C11.0822 1.10981 11.0822 0.575445 10.7535 0.247256C10.4243 -0.0824188 9.89034 -0.0824188 9.56164 0.247256L5.4995 4.30862L1.43836 0.247256C1.10964 -0.0824188 0.575731 -0.0824188 0.246537 0.247256C-0.0821789 0.575949 -0.0821789 1.10983 0.246537 1.43851L4.30868 5.50037L0.246537 9.56223C-0.0821789 9.89092 -0.0821789 10.4243 0.246537 10.7535C0.575743 11.0822 1.10966 11.0822 1.43836 10.7535L5.4995 6.69162L9.56164 10.7535C9.89036 11.0822 10.4243 11.0822 10.7535 10.7535C11.0822 10.4243 11.0822 9.89091 10.7535 9.56223L6.69182 5.50037Z" fill="white"></path></svg></button>
        <a href="https://fadedcloth.de/lookbook" class="panel-link">GALLERY</a>
        <a href="https://fadedcloth.de/" class="panel-link">MAINPAGE</a>
      </div>
    </div>

    <!-- Panel für Button 2 -->
    <div class="glass-panel-container" id="panel2-container">
      <div id="panel2" class="glass-panel hidden">
        <button class="close-btn" @click="togglePanel('panel2')"><svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.69182 5.50037L10.7535 1.43851C11.0822 1.10981 11.0822 0.575445 10.7535 0.247256C10.4243 -0.0824188 9.89034 -0.0824188 9.56164 0.247256L5.4995 4.30862L1.43836 0.247256C1.10964 -0.0824188 0.575731 -0.0824188 0.246537 0.247256C-0.0821789 0.575949 -0.0821789 1.10983 0.246537 1.43851L4.30868 5.50037L0.246537 9.56223C-0.0821789 9.89092 -0.0821789 10.4243 0.246537 10.7535C0.575743 11.0822 1.10966 11.0822 1.43836 10.7535L5.4995 6.69162L9.56164 10.7535C9.89036 11.0822 10.4243 11.0822 10.7535 10.7535C11.0822 10.4243 11.0822 9.89091 10.7535 9.56223L6.69182 5.50037Z" fill="white"></path></svg></button>
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
    </div>

    <!-- Panel für Button 3 (Subscribe Panel) -->
    <div class="glass-panel-container" id="panel3-container">
      <div id="panel3" class="glass-panel hidden">
        <button class="close-btn" @click="togglePanel('panel3')"><svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.69182 5.50037L10.7535 1.43851C11.0822 1.10981 11.0822 0.575445 10.7535 0.247256C10.4243 -0.0824188 9.89034 -0.0824188 9.56164 0.247256L5.4995 4.30862L1.43836 0.247256C1.10964 -0.0824188 0.575731 -0.0824188 0.246537 0.247256C-0.0821789 0.575949 -0.0821789 1.10983 0.246537 1.43851L4.30868 5.50037L0.246537 9.56223C-0.0821789 9.89092 -0.0821789 10.4243 0.246537 10.7535C0.575743 11.0822 1.10966 11.0822 1.43836 10.7535L5.4995 6.69162L9.56164 10.7535C9.89036 11.0822 10.4243 11.0822 10.7535 10.7535C11.0822 10.4243 11.0822 9.89091 10.7535 9.56223L6.69182 5.50037Z" fill="white"></path></svg></button>
        <div class="headline">SUBSCRIBE FOR UPDATES</div>
        <form id="emailForm" @submit.prevent="submitForm" novalidate>
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

    <div class="glass-panel-container" id="panel5-container">
      <div id="panel5" class="glass-panel hidden">
        <button class="close-btn" @click="togglePanel('panel5')"><svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.69182 5.50037L10.7535 1.43851C11.0822 1.10981 11.0822 0.575445 10.7535 0.247256C10.4243 -0.0824188 9.89034 -0.0824188 9.56164 0.247256L5.4995 4.30862L1.43836 0.247256C1.10964 -0.0824188 0.575731 -0.0824188 0.246537 0.247256C-0.0821789 0.575949 -0.0821789 1.10983 0.246537 1.43851L4.30868 5.50037L0.246537 9.56223C-0.0821789 9.89092 -0.0821789 10.4243 0.246537 10.7535C0.575743 11.0822 1.10966 11.0822 1.43836 10.7535L5.4995 6.69162L9.56164 10.7535C9.89036 11.0822 10.4243 11.0822 10.7535 10.7535C11.0822 10.4243 11.0822 9.89091 10.7535 9.56223L6.69182 5.50037Z" fill="white"></path></svg></button>
        <div class="headline" id="collection-name"></div>
        <div id="countdown" class="countdown hidden"></div>
        <img title="COLLECTION" class="collection-img hidden" id="collection-img">
      </div>
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

    let cursor = { x: null, y: null };
    let panel = { dom: null, x: null, y: null };

    document.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('glass-panel')) {
        cursor = {
          x: event.clientX,
          y: event.clientY
        };
        panel = {
          dom: event.target,
          x: parseFloat(getComputedStyle(event.target.parentElement).getPropertyValue('--x')) || 0,
          y: parseFloat(getComputedStyle(event.target.parentElement).getPropertyValue('--y')) || 0
        };
        panel.dom.style.cursor = 'grabbing';
      }
    });

    document.addEventListener('mousemove', (event) => {
      if (panel.dom == null) return;

      const currentCursor = { x: event.clientX, y: event.clientY };
      const distance = {
        x: currentCursor.x - cursor.x,
        y: currentCursor.y - cursor.y
      };

      const newX = panel.x + distance.x;
      const newY = panel.y + distance.y;

      panel.dom.parentElement.style.setProperty('--x', `${newX}px`);
      panel.dom.parentElement.style.setProperty('--y', `${newY}px`);
      panel.dom.parentElement.style.transform = `translate(calc(-50% + var(--x)), calc(-50% + var(--y)))`;
    });

    document.addEventListener('mouseup', () => {
      if (panel.dom == null) return;
      panel.dom.style.cursor = 'auto';
      panel.dom = null;
      cursor = { x: null, y: null };
    });
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
        // Alle Panels schließen und Position zurücksetzen
        panels.forEach(panel => {
          panel.classList.add('hidden');
          panel.parentElement.style.setProperty('--x', '0px');
          panel.parentElement.style.setProperty('--y', '0px');
          panel.parentElement.style.transform = 'translate(-50%, -50%)';
        });

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
        // Wenn das Panel bereits offen ist, schließe es und setze die Position zurück
        currentPanel.classList.add('hidden');
        currentPanel.parentElement.style.setProperty('--x', '0px');
        currentPanel.parentElement.style.setProperty('--y', '0px');
        currentPanel.parentElement.style.transform = 'translate(-50%, -50%)';
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
        panels.forEach(panel => {
          panel.classList.add('hidden');
          panel.parentElement.style.setProperty('--x', '0px');
          panel.parentElement.style.setProperty('--y', '0px');
          panel.parentElement.style.transform = 'translate(-50%, -50%)';
        });
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

      fetch('https://fadedcloth-dev.myshopify.com/api/2023-10/graphql.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': '164c16be080cbc521c378eb87142486d'
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
        console.log('collections:', collections);
        const panel1 = document.getElementById('panel1');
        if (!panel1) {
          console.error('Element mit ID "panel1" wurde nicht gefunden');
          return;
        }

        collections.forEach(collection => {
          console.log('Collection:', collection);
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
          console.log("Email is valid");
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

<style scoped>
.glass-panel-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  --x: 0px;
  --y: 0px;
  z-index: 10000;
}

.glass-panel {
  background: linear-gradient(0deg, var(--color-transparent-dark-gray) 0% 100%), linear-gradient(180deg, #1a1a1a80, #33333380);
  padding: 40px 20px;
  border-radius: var(--border-radius-large);
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: auto;
  max-width: calc(100vw - 80px);
  -webkit-backdrop-filter: var(--blur-large);
  backdrop-filter: var(--blur-large);
  cursor: grab;
  transition: box-shadow 0.3s ease, border 0.3s ease;
  box-shadow: 0 0 1px #0009, 0 30px 70px #0000001a !important;
  min-width: min-content;
}

.glass-panel:focus,
.glass-panel:active {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), 0 30px 70px #0000001a !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: grabbing;
}

.glass-panel .panel-link {
  color: var(--color-main);
  text-decoration: none;
  margin-right: 20px;
}

.glass-panel .panel-link:hover {
  text-decoration: underline;
}

.active-button {
  text-decoration: underline;
  box-shadow: var(--box-shadow-hover);
}

#collection-img {
  max-width: 200px;
  width: auto;
}

#countdown {
  color: #ff2500;
  text-align: center;
}

#emailForm {
  min-width: 250px;
}

.glass-panel .close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 25px;
  height: 25px;
  background: var(--color-transparent-dark-gray);
  border-radius: 12px;
  color: var(--color-main);
  font-size: var(--font-size-large);
  cursor: pointer;
  justify-content: center;
  align-items: center;
}

#panel2 .copyright {
  color: var(--color-transparent-light-gray);
  text-align: left;
  margin-top: 20px;
}
</style>