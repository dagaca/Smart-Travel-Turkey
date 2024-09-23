// Function to fetch the travel plan from the backend
function fetchTravelPlan(city) {
    const days = document.getElementById('days').value;
    const language = document.getElementById('language-toggle').value;

    fetch('http://127.0.0.1:5000/travel_planner', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city: city, days: parseInt(days), language: language })
    })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('selectedCity', city);
            localStorage.setItem('travelPlan', formatTravelPlan(data.plan));
            window.location.href = 'travel_plan.html';
        })
        .catch(error => {
            console.error('Error fetching travel plan:', error);
            alert('An error occurred while fetching the travel plan.');
        });
}

// Function to convert the Markdown-like plan into HTML
function formatTravelPlan(plan) {
    let formattedPlan = plan
        .replace(/### (.*?)\n/g, '<h3>$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/- (.*?)\n/g, '<li>$1</li>')
        .replace(/- (.*?)/g, '<li>$1</li>')
        .replace(/^(?!<h3>|<li>)(.*?)(\n|$)/gm, '<p>$1</p>');

    formattedPlan = formattedPlan.replace(/(<li>.*?<\/li>)/g, '<ul>$1</ul>');
    return formattedPlan;
}
