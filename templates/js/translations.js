// Language content translations
const translations = {
    en: {
        title: "Turkey Travel Planner",
        daysLabel: "Select number of days:",
        cityInfo: "Click on a city to generate a travel plan.",
        days: ["1 Day", "2 Days", "3 Days", "4 Days", "5 Days"],
        planTitle: "Travel Plan for",
        backButton: "Back to Map"
    },
    tr: {
        title: "Türkiye Seyahat Planlayıcısı",
        daysLabel: "Gün sayısını seçin:",
        cityInfo: "Bir şehir seçerek seyahat planını oluşturun.",
        days: ["1 Gün", "2 Gün", "3 Gün", "4 Gün", "5 Gün"],
        planTitle: "Seyahat Planı -",
        backButton: "Haritaya Dön"
    }
};

// Function to set the language for static content
function setLanguage(language) {
    document.getElementById('title').textContent = translations[language].title;
    document.getElementById('days-label').textContent = translations[language].daysLabel;
    document.getElementById('city-info').textContent = translations[language].cityInfo;
    const daysOptions = document.getElementById('days').options;
    translations[language].days.forEach((day, index) => {
        daysOptions[index].textContent = day;
    });
}
