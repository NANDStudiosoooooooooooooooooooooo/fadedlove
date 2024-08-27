document.getElementById("subscribeButton").addEventListener("click", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    if (email) {
      // Sende die E-Mail an den Cloudflare Worker für das Abonnieren
      fetch("https://your-cloudflare-worker-url-for-subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
      })
      .then(response => response.json())
      .then(data => {
        alert("Subscribed successfully!");
      })
      .catch(error => {
        alert("An error occurred: " + error.message);
      });
    }
  });
  
  document.getElementById("unsubscribeButton").addEventListener("click", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    if (email) {
      // Sende die E-Mail an den Cloudflare Worker für das Abbestellen
      fetch("https://your-cloudflare-worker-url-for-unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
      })
      .then(response => response.json())
      .then(data => {
        alert("Unsubscribed successfully!");
      })
      .catch(error => {
        alert("An error occurred: " + error.message);
      });
    }
  });
  