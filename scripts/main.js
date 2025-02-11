import '../styles/main.scss'

//ANIMATION -- BEGIN
document.addEventListener("DOMContentLoaded", function() {
    // Function to animate elements based on class
    function animateElements(className, animationName, delay = 0) {
        const elements = document.querySelectorAll(`.${className}`);
        
        elements.forEach((element, index) => {
            // Apply animation with delay
            element.style.animation = `${animationName} 0.5s forwards`;
            element.style.animationDelay = `${delay + index * 100}ms`; // Staggered delay
        });
    }

    // Animate elements with classes
    animateElements('top-left', 'slideInLeft');
    animateElements('top', 'slideInTop');
    animateElements('top-right', 'slideInRight');
});
//ANIMATION -- END

//Email Subscribtion -- BEGIN
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
//Email Subscribtion -- END

//TILT -- BEGIN
var VanillaTilt = (function () {
    'use strict';
    
    class VanillaTilt {
      constructor(element, settings = {}) {
        if (!(element instanceof Node)) {
          throw ("Can't initialize VanillaTilt because " + element + " is not a Node.");
        }
    
        this.width = null;
        this.height = null;
        this.clientWidth = null;
        this.clientHeight = null;
        this.left = null;
        this.top = null;
    
        // for Gyroscope sampling
        this.gammazero = null;
        this.betazero = null;
        this.lastgammazero = null;
        this.lastbetazero = null;
    
        this.transitionTimeout = null;
        this.updateCall = null;
        this.event = null;
    
        this.updateBind = this.update.bind(this);
        this.resetBind = this.reset.bind(this);
    
        this.element = element;
        this.settings = this.extendSettings(settings);
    
        this.reverse = this.settings.reverse ? -1 : 1;
        this.resetToStart = VanillaTilt.isSettingTrue(this.settings["reset-to-start"]);
        this.glare = VanillaTilt.isSettingTrue(this.settings.glare);
        this.glarePrerender = VanillaTilt.isSettingTrue(this.settings["glare-prerender"]);
        this.fullPageListening = VanillaTilt.isSettingTrue(this.settings["full-page-listening"]);
        this.gyroscope = VanillaTilt.isSettingTrue(this.settings.gyroscope);
        this.gyroscopeSamples = this.settings.gyroscopeSamples;
    
        this.elementListener = this.getElementListener();
    
        if (this.glare) {
          this.prepareGlare();
        }
    
        if (this.fullPageListening) {
          this.updateClientSize();
        }
    
        this.addEventListeners();
        this.reset();
    
        if (this.resetToStart === false) {
          this.settings.startX = 0;
          this.settings.startY = 0;
        }
      }
    
      static isSettingTrue(setting) {
        return setting === "" || setting === true || setting === 1;
      }
    
      /**
       * Method returns element what will be listen mouse events
       * @return {Node}
       */
      getElementListener() {
        if (this.fullPageListening) {
          return window.document;
        }
    
        if (typeof this.settings["mouse-event-element"] === "string") {
          const mouseEventElement = document.querySelector(this.settings["mouse-event-element"]);
    
          if (mouseEventElement) {
            return mouseEventElement;
          }
        }
    
        if (this.settings["mouse-event-element"] instanceof Node) {
          return this.settings["mouse-event-element"];
        }
    
        return this.element;
      }
    
      /**
       * Method set listen methods for this.elementListener
       * @return {Node}
       */
      addEventListeners() {
        this.onMouseEnterBind = this.onMouseEnter.bind(this);
        this.onMouseMoveBind = this.onMouseMove.bind(this);
        this.onMouseLeaveBind = this.onMouseLeave.bind(this);
        this.onWindowResizeBind = this.onWindowResize.bind(this);
        this.onDeviceOrientationBind = this.onDeviceOrientation.bind(this);
    
        this.elementListener.addEventListener("mouseenter", this.onMouseEnterBind);
        this.elementListener.addEventListener("mouseleave", this.onMouseLeaveBind);
        this.elementListener.addEventListener("mousemove", this.onMouseMoveBind);
    
        if (this.glare || this.fullPageListening) {
          window.addEventListener("resize", this.onWindowResizeBind);
        }
    
        if (this.gyroscope) {
          window.addEventListener("deviceorientation", this.onDeviceOrientationBind);
        }
      }
    
      /**
       * Method remove event listeners from current this.elementListener
       */
      removeEventListeners() {
        this.elementListener.removeEventListener("mouseenter", this.onMouseEnterBind);
        this.elementListener.removeEventListener("mouseleave", this.onMouseLeaveBind);
        this.elementListener.removeEventListener("mousemove", this.onMouseMoveBind);
    
        if (this.gyroscope) {
          window.removeEventListener("deviceorientation", this.onDeviceOrientationBind);
        }
    
        if (this.glare || this.fullPageListening) {
          window.removeEventListener("resize", this.onWindowResizeBind);
        }
      }
    
      destroy() {
        clearTimeout(this.transitionTimeout);
        if (this.updateCall !== null) {
          cancelAnimationFrame(this.updateCall);
        }
    
        this.element.style.willChange = "";
        this.element.style.transition = "";
        this.element.style.transform = "";
        this.resetGlare();
    
        this.removeEventListeners();
        this.element.vanillaTilt = null;
        delete this.element.vanillaTilt;
    
        this.element = null;
      }
    
      onDeviceOrientation(event) {
        if (event.gamma === null || event.beta === null) {
          return;
        }
    
        this.updateElementPosition();
    
        if (this.gyroscopeSamples > 0) {
          this.lastgammazero = this.gammazero;
          this.lastbetazero = this.betazero;
    
          if (this.gammazero === null) {
            this.gammazero = event.gamma;
            this.betazero = event.beta;
          } else {
            this.gammazero = (event.gamma + this.lastgammazero) / 2;
            this.betazero = (event.beta + this.lastbetazero) / 2;
          }
    
          this.gyroscopeSamples -= 1;
        }
    
        const totalAngleX = this.settings.gyroscopeMaxAngleX - this.settings.gyroscopeMinAngleX;
        const totalAngleY = this.settings.gyroscopeMaxAngleY - this.settings.gyroscopeMinAngleY;
    
        const degreesPerPixelX = totalAngleX / this.width;
        const degreesPerPixelY = totalAngleY / this.height;
    
        const angleX = event.gamma - (this.settings.gyroscopeMinAngleX + this.gammazero);
        const angleY = event.beta - (this.settings.gyroscopeMinAngleY + this.betazero);
    
        const posX = angleX / degreesPerPixelX;
        const posY = angleY / degreesPerPixelY;
    
        if (this.updateCall !== null) {
          cancelAnimationFrame(this.updateCall);
        }
    
        this.event = {
          clientX: posX + this.left,
          clientY: posY + this.top,
        };
    
        this.updateCall = requestAnimationFrame(this.updateBind);
      }
    
      onMouseEnter() {
        this.updateElementPosition();
        this.element.style.willChange = "transform";
        this.setTransition();
      }
    
      onMouseMove(event) {
        if (this.updateCall !== null) {
          cancelAnimationFrame(this.updateCall);
        }
    
        this.event = event;
        this.updateCall = requestAnimationFrame(this.updateBind);
      }
    
      onMouseLeave() {
        this.setTransition();
    
        if (this.settings.reset) {
          requestAnimationFrame(this.resetBind);
        }
      }
    
      reset() {
        this.onMouseEnter();
    
        if (this.fullPageListening) {
          this.event = {
            clientX: (this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.clientWidth,
            clientY: (this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.clientHeight
          };
        } else {
          this.event = {
            clientX: this.left + ((this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.width),
            clientY: this.top + ((this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.height)
          };
        }
    
        let backupScale = this.settings.scale;
        this.settings.scale = 1;
        this.update();
        this.settings.scale = backupScale;
        this.resetGlare();
      }
    
      resetGlare() {
        if (this.glare) {
          this.glareElement.style.transform = "rotate(180deg) translate(-50%, -50%)";
          this.glareElement.style.opacity = "0";
        }
      }
    
      getValues() {
        let x, y;
    
        if (this.fullPageListening) {
          x = this.event.clientX / this.clientWidth;
          y = this.event.clientY / this.clientHeight;
        } else {
          x = (this.event.clientX - this.left) / this.width;
          y = (this.event.clientY - this.top) / this.height;
        }
    
        x = Math.min(Math.max(x, 0), 1);
        y = Math.min(Math.max(y, 0), 1);
    
        let tiltX = (this.reverse * (this.settings.max - x * this.settings.max * 2)).toFixed(2);
        let tiltY = (this.reverse * (y * this.settings.max * 2 - this.settings.max)).toFixed(2);
        let angle = Math.atan2(this.event.clientX - (this.left + this.width / 2), -(this.event.clientY - (this.top + this.height / 2))) * (180 / Math.PI);
    
        return {
          tiltX: tiltX,
          tiltY: tiltY,
          percentageX: x * 100,
          percentageY: y * 100,
          angle: angle
        };
      }
    
      updateElementPosition() {
        let rect = this.element.getBoundingClientRect();
    
        this.width = this.element.offsetWidth;
        this.height = this.element.offsetHeight;
        this.left = rect.left;
        this.top = rect.top;
      }
    
      update() {
        let values = this.getValues();
    
        this.element.style.transform = "perspective(" + this.settings.perspective + "px) " +
          "rotateX(" + (this.settings.axis === "x" ? 0 : values.tiltY) + "deg) " +
          "rotateY(" + (this.settings.axis === "y" ? 0 : values.tiltX) + "deg) " +
          "scale3d(" + this.settings.scale + ", " + this.settings.scale + ", " + this.settings.scale + ")";
    
        if (this.glare) {
          this.glareElement.style.transform = `rotate(${values.angle}deg) translate(-50%, -50%)`;
          this.glareElement.style.opacity = `${values.percentageY * this.settings["max-glare"] / 100}`;
        }
    
        this.element.dispatchEvent(new CustomEvent("tiltChange", {
          "detail": values
        }));
    
        this.updateCall = null;
      }
    
      /**
       * Appends the glare element (if glarePrerender equals false)
       * and sets the default style
       */
      prepareGlare() {
        // If option pre-render is enabled we assume all html/css is present for an optimal glare effect.
        if (!this.glarePrerender) {
          // Create glare element
          const jsTiltGlare = document.createElement("div");
          jsTiltGlare.classList.add("js-tilt-glare");
    
          const jsTiltGlareInner = document.createElement("div");
          jsTiltGlareInner.classList.add("js-tilt-glare-inner");
    
          jsTiltGlare.appendChild(jsTiltGlareInner);
          this.element.appendChild(jsTiltGlare);
        }
    
        this.glareElementWrapper = this.element.querySelector(".js-tilt-glare");
        this.glareElement = this.element.querySelector(".js-tilt-glare-inner");
    
        if (this.glarePrerender) {
          return;
        }
    
        Object.assign(this.glareElementWrapper.style, {
          "position": "absolute",
          "top": "0",
          "left": "0",
          "width": "100%",
          "height": "100%",
          "overflow": "hidden",
          "pointer-events": "none",
          "border-radius": "inherit"
        });
    
        Object.assign(this.glareElement.style, {
          "position": "absolute",
          "top": "50%",
          "left": "50%",
          "pointer-events": "none",
          "background-image": `linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)`,
          "transform": "rotate(180deg) translate(-50%, -50%)",
          "transform-origin": "0% 0%",
          "opacity": "0"
        });
    
        this.updateGlareSize();
      }
    
      updateGlareSize() {
        if (this.glare) {
          const glareSize = (this.element.offsetWidth > this.element.offsetHeight ? this.element.offsetWidth : this.element.offsetHeight) * 2;
    
          Object.assign(this.glareElement.style, {
            "width": `${glareSize}px`,
            "height": `${glareSize}px`,
          });
        }
      }
    
      updateClientSize() {
        this.clientWidth = window.innerWidth
          || document.documentElement.clientWidth
          || document.body.clientWidth;
    
        this.clientHeight = window.innerHeight
          || document.documentElement.clientHeight
          || document.body.clientHeight;
      }
    
      onWindowResize() {
        this.updateGlareSize();
        this.updateClientSize();
      }
    
      setTransition() {
        clearTimeout(this.transitionTimeout);
        this.element.style.transition = this.settings.speed + "ms " + this.settings.easing;
        if (this.glare) this.glareElement.style.transition = `opacity ${this.settings.speed}ms ${this.settings.easing}`;
    
        this.transitionTimeout = setTimeout(() => {
          this.element.style.transition = "";
          if (this.glare) {
            this.glareElement.style.transition = "";
          }
        }, this.settings.speed);
    
      }
    
      /**
       * Method return patched settings of instance
       * @param {boolean} settings.reverse - reverse the tilt direction
       * @param {number} settings.max - max tilt rotation (degrees)
       * @param {startX} settings.startX - the starting tilt on the X axis, in degrees. Default: 0
       * @param {startY} settings.startY - the starting tilt on the Y axis, in degrees. Default: 0
       * @param {number} settings.perspective - Transform perspective, the lower the more extreme the tilt gets
       * @param {string} settings.easing - Easing on enter/exit
       * @param {number} settings.scale - 2 = 200%, 1.5 = 150%, etc..
       * @param {number} settings.speed - Speed of the enter/exit transition
       * @param {boolean} settings.transition - Set a transition on enter/exit
       * @param {string|null} settings.axis - What axis should be enabled. Can be "x" or "y"
       * @param {boolean} settings.glare - if it should have a "glare" effect
       * @param {number} settings.max-glare - the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
       * @param {boolean} settings.glare-prerender - false = VanillaTilt creates the glare elements for you, otherwise
       * @param {boolean} settings.full-page-listening - If true, parallax effect will listen to mouse move events on the whole document, not only the selected element
       * @param {string|object} settings.mouse-event-element - String selector or link to HTML-element what will be listen mouse events
       * @param {boolean} settings.reset - false = If the tilt effect has to be reset on exit
       * @param {boolean} settings.reset-to-start - true = On reset event (mouse leave) will return to initial start angle (if startX or startY is set)
       * @param {gyroscope} settings.gyroscope - Enable tilting by deviceorientation events
       * @param {gyroscopeSensitivity} settings.gyroscopeSensitivity - Between 0 and 1 - The angle at which max tilt position is reached. 1 = 90deg, 0.5 = 45deg, etc..
       * @param {gyroscopeSamples} settings.gyroscopeSamples - How many gyroscope moves to decide the starting position.
       */
      extendSettings(settings) {
        let defaultSettings = {
          reverse: false,
          max: 15,
          startX: 0,
          startY: 0,
          perspective: 1000,
          easing: "cubic-bezier(.03,.98,.52,.99)",
          scale: 1,
          speed: 300,
          transition: true,
          axis: null,
          glare: false,
          "max-glare": 1,
          "glare-prerender": false,
          "full-page-listening": false,
          "mouse-event-element": null,
          reset: true,
          "reset-to-start": true,
          gyroscope: true,
          gyroscopeMinAngleX: -45,
          gyroscopeMaxAngleX: 45,
          gyroscopeMinAngleY: -45,
          gyroscopeMaxAngleY: 45,
          gyroscopeSamples: 10
        };
    
        let newSettings = {};
        for (var property in defaultSettings) {
          if (property in settings) {
            newSettings[property] = settings[property];
          } else if (this.element.hasAttribute("data-tilt-" + property)) {
            let attribute = this.element.getAttribute("data-tilt-" + property);
            try {
              newSettings[property] = JSON.parse(attribute);
            } catch (e) {
              newSettings[property] = attribute;
            }
    
          } else {
            newSettings[property] = defaultSettings[property];
          }
        }
    
        return newSettings;
      }
    
      static init(elements, settings) {
        if (elements instanceof Node) {
          elements = [elements];
        }
    
        if (elements instanceof NodeList) {
          elements = [].slice.call(elements);
        }
    
        if (!(elements instanceof Array)) {
          return;
        }
    
        elements.forEach((element) => {
          if (!("vanillaTilt" in element)) {
            element.vanillaTilt = new VanillaTilt(element, settings);
          }
        });
      }
    }
    
    if (typeof document !== "undefined") {
      /* expose the class to window */
      window.VanillaTilt = VanillaTilt;
    
      /**
       * Auto load
       */
      VanillaTilt.init(document.querySelectorAll("[data-tilt]"));
    }
    
    return VanillaTilt;
    
    }());
//TILT -- END

//LOADER -- BEGIN
const video = document.getElementById('load-obj');
        const loader = document.getElementById('loader');
        const logocontainerRef = document.getElementById('load-container');

        video.addEventListener('canplaythrough', function () {
            // Wenn das Video vollständig geladen ist, Ladeanimation ausblenden und Video anzeigen
            loader.style.display = 'none';
            logocontainerRef.style.display = 'flex';
        });
//LOADER -- END

//SOCIAL -- BEGIN
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
//SOCIAL -- END

//LOAD BUTTONS -- BEGIN
// Funktion zum Öffnen und Schließen der Panels
function togglePanel(panelId) {
  // Alle Panels und Buttons auswählen
  let panels = document.querySelectorAll('.glass-panel');
  let buttons = document.querySelectorAll('.glass-button');
  let currentPanel = document.getElementById(panelId);
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
      let activeButton = Array.from(buttons).find(button => button.getAttribute('data-target') === panelId);
      if (activeButton) {
          activeButton.classList.add('active-button');
      }
  } else {
      // Wenn das Panel bereits offen ist, schließe es
      currentPanel.classList.add('hidden');
      let activeButton = Array.from(buttons).find(button => button.getAttribute('data-target') === panelId);
      if (activeButton) {
          activeButton.classList.remove('active-button');
      }
  }

  // Rückgabe, ob ein Panel offen ist
  return isAnyPanelOpen || !currentPanel.classList.contains('hidden');
}

// Funktion zum Umschalten der Collection Links
function toggleCollectionLinks() {
  const links = document.querySelector('.collection-links');
  const toggler = document.getElementById('collectionToggler');

  if (links.classList.contains('hidden')) {
      links.classList.remove('hidden');
      links.style.display = 'flex'; // Links anzeigen

      // Position der Links anpassen
      const togglerRect = toggler.getBoundingClientRect();
      links.style.top = `${togglerRect.top - links.offsetHeight}px`; // Links über dem Toggler positionieren
  } else {
      links.classList.add('hidden');
      links.style.display = 'none'; // Links ausblenden
  }
}

// Klick außerhalb des Panels zum Schließen
document.addEventListener('click', function(event) {
  let panels = document.querySelectorAll('.glass-panel');
  let buttons = document.querySelectorAll('.glass-button');
  let links = document.querySelector('.collection-links');

  let clickedInsidePanel = false;
  let isAnyPanelOpen = false;

  panels.forEach(panel => {
      if (!panel.classList.contains('hidden')) {
          isAnyPanelOpen = true; // Ein Panel ist offen
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

  // Schließen der Panels nur, wenn ein Panel geöffnet ist und nicht innerhalb eines Panels geklickt wurde
  if (!clickedInsidePanel && isAnyPanelOpen) {
      panels.forEach(panel => panel.classList.add('hidden'));
      buttons.forEach(button => button.classList.remove('active-button'));
      links.classList.add('hidden'); // Links ausblenden
      links.style.display = 'none'; // Links ausblenden
  }
});

// Event Listener für alle Buttons
document.querySelectorAll('.glass-button').forEach(button => {
  button.addEventListener('click', function(event) {
      event.stopPropagation(); // Verhindert, dass das Event auch das document erreicht

      // Hole das Ziel-Panel von der data-target des Buttons
      let targetPanel = button.getAttribute('data-target');
      if (button.id === 'collectionToggler') {
          toggleCollectionLinks(); // Spezielle Funktion für den Toggler
      } else {
          togglePanel(targetPanel);
      }
  });
});



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
          x: event.target.getBoundingClientRect().left,
          y: event.target.getBoundingClientRect().top
      };
  }
});

document.addEventListener('mousemove', (event) => {
  if (panel.dom == null) return;

  const currentCursor = { x: event.clientX, y: event.clientY };
  const distance = {
      x: currentCursor.x - cursor.x,
      y: currentCursor.y - cursor.y
  };

  panel.dom.style.left = (panel.x + distance.x) + 'px';
  panel.dom.style.top = (panel.y + distance.y) + 'px';
  panel.dom.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', () => {
  if (panel.dom == null) return;
  panel.dom.style.cursor = 'auto';
  panel.dom = null;
});



function loadShopifyCollections() {
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
      // Überprüfen, ob die Daten korrekt sind
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

          // Wenn isdrop FALSE ist, füge das <a>-Element hinzu
          if (isDrop) {
              const collectionLink = document.createElement('a');
              collectionLink.href = `https://shop.fadedcloth.de/?collection=${collection.handle}&hide=TRUE`;
              collectionLink.classList.add('panel-link');
              collectionLink.textContent = collection.handle.toUpperCase();

              panel1.insertBefore(collectionLink, panel1.firstChild);
          }
      });
  })
  .catch(error => {
      console.error('Fehler beim Laden der Kollektionen:', error);
  });
}

// Beim Laden der Seite das Skript ausführen
document.addEventListener('DOMContentLoaded', loadShopifyCollections);
//LOAD BUTTONS -- END