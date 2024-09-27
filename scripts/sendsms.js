document.getElementById('smsForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das standardmäßige Formular-Submit-Verhalten

    const phoneNumber = document.getElementById('phoneNumber').value; // Empfängernummer
    const data = {
        from: '+447520662455', // Deine Sendernummer
        to: phoneNumber, // Empfängernummer
        body: 'Thank you for subscribing to FADEDLOVE SMS Newsletter!' // Nachricht
    };

    // URL deines Cloudflare Workers
    const apiUrl = 'https://sendfadedsms.nand339.workers.dev/'; // Ersetze dies durch die URL deines Workers

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error sending SMS');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('smsMessage').innerText = 'Successfully subscribed!';
        document.getElementById('smsForm').reset(); // Formular zurücksetzen
    })
    .catch(error => {
        document.getElementById('smsMessage').innerText = 'Error: ' + error.message;
        console.error('Error:', error);
    });
});
