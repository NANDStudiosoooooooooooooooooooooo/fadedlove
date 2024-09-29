// subscribe.js

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
document.addEventListener("DOMContentLoaded", function() {
    const subscribeButton = document.getElementById("subscribeButton");
    const unsubscribeButton = document.getElementById("UnsubscribeSendButton");
    const emailInput = document.getElementById("email");

    // Subscribe event listener
    if (subscribeButton) {
        subscribeButton.addEventListener("click", function(event) {
            event.preventDefault();
            const email = emailInput.value;
            if (email) {
                sendRequest("https://subscribe.fadedcloth.de/sub", email, "SUBSCRIBED");
            } else {
                alert("Please enter a valid email.");
            }
        });
    }

    // Unsubscribe event listener
    if (unsubscribeButton) {
        unsubscribeButton.addEventListener("click", function(event) {
            event.preventDefault();
            const email = emailInput.value;
            if (email) {
                sendRequest("https://subscribe.fadedcloth.de/unsubsend", email, "UNSUBSCRIBESENT");
            } else {
                alert("Please enter a valid email.");
            }
        });
    }
});
