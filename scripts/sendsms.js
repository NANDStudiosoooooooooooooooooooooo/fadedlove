document.getElementById('smsForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das standardmäßige Formular-Submit-Verhalten

    const phoneNumber = document.getElementById('phoneNumber').value;
const apiToken = '121ca29ada0c465bba944a89dc0d1936'; // Ersetze dies durch deinen API Token
const servicePlanId = 'a86db25ed99d4f5ea75dafb1b6995ba5'; // Ersetze dies durch deine Service Plan ID
const senderNumber = '+447520662455'; // Deine Sendernummer
const apiUrl = `https://us.sms.api.sinch.com/xms/v1/${servicePlanId}/messages`;

// Beispiel für den SMS-Inhalt
const data = {
    from: senderNumber, // Sendernummer hier verwenden
    to: phoneNumber, // Empfängernummer
    body: 'THANKS FOR SUBSCRIBING TO THE FADEDCLOTH SMS NEWSLETTER!' // Nachricht
};

// Funktion zum Senden der SMS
fetch(apiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`
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
    console.log('SMS sent successfully:', data);
})
.catch(error => {
    console.error('Error:', error);
});
});
