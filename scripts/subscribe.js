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

// Function to shake any element
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