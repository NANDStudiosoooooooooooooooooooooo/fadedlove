document.getElementById("subscribeButton").addEventListener("click", function(event) {
    event.preventDefault();
    const emailInput = document.getElementById("email");
    const email = emailInput.value;

    // Validate email
    if (isValidEmail(email)) {
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
    } else {
        shakeEmailInput(emailInput);
    }
});

// Function to validate email format
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Function to shake the email input field
function shakeEmailInput(input) {
    input.classList.add("shake");
    setTimeout(() => {
        input.classList.remove("shake");
    }, 500); // Remove shake effect after 500ms
}