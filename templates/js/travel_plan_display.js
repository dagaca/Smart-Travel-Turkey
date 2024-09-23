// Retrieve selected language from localStorage or default to English
const selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';

// Get data from localStorage
const city = localStorage.getItem('selectedCity');
const plan = localStorage.getItem('travelPlan');

// Set the title and content based on the selected language
document.getElementById('city-title').innerText = `${translations[selectedLanguage].planTitle} ${city}`;
document.getElementById('plan-content').innerHTML = plan;
document.getElementById('back-button').innerText = translations[selectedLanguage].backButton;

// Clear the localStorage after displaying
localStorage.removeItem('selectedCity');
localStorage.removeItem('travelPlan');
