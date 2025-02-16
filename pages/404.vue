<template>
    <div class="body-center">
      <header-main></header-main>
  
      <div class="panel-error">
        <a id="page-error" href="https://fadedcloth.de" class="headline">404 NOT FOUND</a>
        <div class="headline">SUBSCRIBE FOR UPDATES</div>
        <form id="emailForm" @submit.prevent="submitForm" novalidate>
          <input
            type="email"
            id="email"
            placeholder="ENTER YOUR EMAIL"
            class="email-input"
          />
          <div class="checkbox-container">
            <input type="checkbox" id="termsCheckbox" class="custom-checkbox">
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
    name: 'ErrorPage',
    methods: {
      submitForm(event) {
        const emailInput = document.getElementById("email");
        const email = emailInput.value;
        const termsCheckbox = document.getElementById("termsCheckbox");
        const checkboxContainer = document.querySelector('.checkbox-container');
  
        // Zuerst die E-Mail validieren
        if (!this.isValidEmail(email)) {
          console.log("Email is invalid");
          this.shakeElement(emailInput); // Nur das E-Mail-Feld wackelt
        } else {
          console.log("Email is valid");
          // E-Mail ist gültig, dann prüfen, ob die Checkbox angeklickt ist
          if (!termsCheckbox.checked) {
            this.shakeElement(checkboxContainer); // Jetzt nur die Checkbox und der Text wackeln
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
      },
      shakeElement(element) {
        element.classList.add("shake");
        setTimeout(() => {
          element.classList.remove("shake");
        }, 500); // Entferne den Shake-Effekt nach 500ms
      },
      isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      }
    }
  }
  </script>
  
  <style scoped>
  .panel-error {
    margin-top: 120px;
    padding: 20px;
    max-width: 400px;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  #page-error {
    margin-bottom: 20px;
  }
  .body-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #emailForm {
    margin-top: 20px;
  }
  </style>
  