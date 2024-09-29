const ButtonModule = (function() {
    // Reusable function to handle both subscribe and unsubscribe requests
    function sendRequest(url, email, successMessage) {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => {
            const currentUrl = encodeURIComponent(window.location.href);
            window.location.href = `https://subscribe.fadedcloth.de/success?${successMessage}&referrer=${currentUrl}`;
        })
        .catch(error => {
            alert("An error occurred: " + error.message);
        });
    }

    // Add event listeners for subscribe and unsubscribe buttons
    // Function to shake the input field
function shakeInput(input) {
    input.classList.add('shake');
    // Remove the shake class after the animation completes
    setTimeout(() => {
        input.classList.remove('shake');
    }, 500); // Match this duration with the CSS animation duration
}

// Add event listeners for subscribe and unsubscribe buttons
function addButtonEventListeners() {
    const subscribeButton = document.getElementById("subscribeButton");
    const unsubscribeButton = document.getElementById("UnsubscribeSendButton");
    const emailInput = document.getElementById("email");

    if (subscribeButton) {
        subscribeButton.addEventListener("click", function(event) {
            event.preventDefault();
            const email = emailInput.value;
            if (validateEmail(email)) {
                sendRequest("https://subscribe.fadedcloth.de/sub", email, "SUBSCRIBED");
            } else {
                alert("Please enter a valid email."); // Optional: Alert for additional feedback
                shakeInput(emailInput); // Shake the input field
            }
        });
    }

    if (unsubscribeButton) {
        unsubscribeButton.addEventListener("click", function(event) {
            event.preventDefault();
            const email = emailInput.value;
            if (validateEmail(email)) {
                sendRequest("https://subscribe.fadedcloth.de/unsubsend", email, "UNSUBSCRIBESENT");
            } else {
                alert("Please enter a valid email."); // Optional: Alert for additional feedback
                shakeInput(emailInput); // Shake the input field
            }
        });
    }
}

// Simple email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic regex for email validation
    return re.test(email);
}

    // Expose the init function to be called after buttons are loaded
    return {
        addButtonEventListeners: addButtonEventListeners
    };
})();