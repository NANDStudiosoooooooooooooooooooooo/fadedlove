import '../styles/main.css'

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