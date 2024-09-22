// Element References
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const panel1 = document.getElementById('panel1');
const panel2 = document.getElementById('panel2');
const closePanel1 = document.getElementById('close-panel1');
const closePanel2 = document.getElementById('close-panel2');

// Event Listeners for Buttons
button1.addEventListener('click', () => {
    panel1.classList.add('visible');
    panel1.classList.remove('hidden');
    hideButtons();
});

button2.addEventListener('click', () => {
    panel2.classList.add('visible');
    panel2.classList.remove('hidden');
    hideButtons();
});

// Event Listeners for Close Buttons
closePanel1.addEventListener('click', () => {
    panel1.classList.remove('visible');
    panel1.classList.add('hidden');
    showButtons();
});

closePanel2.addEventListener('click', () => {
    panel2.classList.remove('visible');
    panel2.classList.add('hidden');
    showButtons();
});

// Hide buttons function
function hideButtons() {
    document.querySelector('.buttons-container').style.display = 'none';
}

// Show buttons function
function showButtons() {
    document.querySelector('.buttons-container').style.display = 'flex';
}

// Keep panel open when clicking on links
const linksPanel1 = panel1.querySelectorAll('.panel-link');
const linksPanel2 = panel2.querySelectorAll('.panel-link');

// Links for Panel 1 should not hide the buttons
linksPanel1.forEach(link => {
    link.addEventListener('click', (e) => {
        e.stopPropagation(); // Stop the event from bubbling
    });
});

// Links for Panel 2 should not hide the buttons
linksPanel2.forEach(link => {
    link.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

// Close panels when clicking outside
document.addEventListener('click', (e) => {
    if (!panel1.contains(e.target) && !button1.contains(e.target)) {
        panel1.classList.remove('visible');
        panel1.classList.add('hidden');
        showButtons();
    }
    if (!panel2.contains(e.target) && !button2.contains(e.target)) {
        panel2.classList.remove('visible');
        panel2.classList.add('hidden');
        showButtons();
    }
}, true);