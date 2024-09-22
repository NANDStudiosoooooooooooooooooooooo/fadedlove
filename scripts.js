// Element References
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const panel1 = document.getElementById('panel1');
const panel2 = document.getElementById('panel2');
const closePanel1 = document.getElementById('close-panel1');
const closePanel2 = document.getElementById('close-panel2');

// Variables to track active panel
let activePanel = null;
let activeButton = null;

// Event Listeners for Buttons
button1.addEventListener('click', () => {
    if (activePanel === panel1) return; // Do nothing if same panel is already active
    hideActivePanel();
    panel1.classList.add('visible');
    panel1.classList.remove('hidden');
    activePanel = panel1;
    setActiveButton(button1);
});

button2.addEventListener('click', () => {
    if (activePanel === panel2) return; // Do nothing if same panel is already active
    hideActivePanel();
    panel2.classList.add('visible');
    panel2.classList.remove('hidden');
    activePanel = panel2;
    setActiveButton(button2);
});

// Event Listeners for Close Buttons
closePanel1.addEventListener('click', () => {
    hideActivePanel();
    activePanel = null;
});

closePanel2.addEventListener('click', () => {
    hideActivePanel();
    activePanel = null;
});

// Function to hide currently active panel
function hideActivePanel() {
    if (activePanel) {
        activePanel.classList.remove('visible');
        activePanel.classList.add('hidden');
    }
    if (activeButton) {
        activeButton.classList.remove('active-button');
    }
}

// Function to set the active button
function setActiveButton(button) {
    activeButton = button;
    activeButton.classList.add('active-button');
}

// Keep panel open when clicking on links
const linksPanel1 = panel1.querySelectorAll('.panel-link');
const linksPanel2 = panel2.querySelectorAll('.panel-link');

linksPanel1.forEach(link => {
    link.addEventListener('click', (e) => {
        e.stopPropagation(); // Stop the event from bubbling
    });
});

linksPanel2.forEach(link => {
    link.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

// Close panels when clicking outside, unless clicking the panel or the button
document.addEventListener('click', (e) => {
    if (activePanel && !activePanel.contains(e.target) && !activeButton.contains(e.target)) {
        hideActivePanel();
        activePanel = null;
    }
}, true);