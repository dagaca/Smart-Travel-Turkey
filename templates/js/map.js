// Initialize the map and set the view to the center of Turkey
var map = L.map('map').setView([39.9334, 32.8597], 6);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// List of all cities in Turkey with approximate coordinates
const cities = [
  { name: "Adana", coords: [37.0, 35.3213] },
  { name: "Adıyaman", coords: [37.7648, 38.2786] },
  { name: "Afyonkarahisar", coords: [38.7638, 30.5403] },
  { name: "Ağrı", coords: [39.7191, 43.0519] },
  { name: "Aksaray", coords: [38.3687, 34.0360] },
  { name: "Amasya", coords: [40.6499, 35.8353] },
  { name: "Ankara", coords: [39.9334, 32.8597] },
  { name: "Antalya", coords: [36.8969, 30.7133] },
  { name: "Ardahan", coords: [41.1105, 42.7022] },
  { name: "Artvin", coords: [41.1828, 41.8190] },
  { name: "Aydın", coords: [37.8483, 27.8457] },
  { name: "Balıkesir", coords: [39.6484, 27.8826] },
  { name: "Bartın", coords: [41.5811, 32.4610] },
  { name: "Batman", coords: [37.8812, 41.1351] },
  { name: "Bayburt", coords: [40.2552, 40.2249] },
  { name: "Bilecik", coords: [40.1500, 30.0650] },
  { name: "Bingöl", coords: [38.8853, 40.5016] },
  { name: "Bitlis", coords: [38.3936, 42.1232] },
  { name: "Bolu", coords: [40.7350, 31.6061] },
  { name: "Burdur", coords: [37.7203, 30.2908] },
  { name: "Bursa", coords: [40.1826, 29.0669] },
  { name: "Çanakkale", coords: [40.1553, 26.4142] },
  { name: "Çankırı", coords: [40.6013, 33.6158] },
  { name: "Çorum", coords: [40.5506, 34.9556] },
  { name: "Denizli", coords: [37.7830, 29.0944] },
  { name: "Diyarbakır", coords: [37.9144, 40.2306] },
  { name: "Düzce", coords: [40.8438, 31.1565] },
  { name: "Edirne", coords: [41.6771, 26.5553] },
  { name: "Elazığ", coords: [38.6743, 39.2221] },
  { name: "Erzincan", coords: [39.7464, 39.4902] },
  { name: "Erzurum", coords: [39.9042, 41.2679] },
  { name: "Eskişehir", coords: [39.7667, 30.5256] },
  { name: "Gaziantep", coords: [37.0662, 37.3833] },
  { name: "Giresun", coords: [40.9128, 38.3895] },
  { name: "Gümüşhane", coords: [40.4386, 39.5086] },
  { name: "Hakkâri", coords: [37.5747, 43.7408] },
  { name: "Hatay", coords: [36.2028, 36.1600] },
  { name: "Iğdır", coords: [39.9237, 44.0450] },
  { name: "Isparta", coords: [37.7648, 30.5566] },
  { name: "İstanbul", coords: [41.0082, 28.9784] },
  { name: "İzmir", coords: [38.4192, 27.1287] },
  { name: "Kahramanmaraş", coords: [37.5770, 36.9371] },
  { name: "Karabük", coords: [41.2048, 32.6277] },
  { name: "Karaman", coords: [37.1811, 33.2150] },
  { name: "Kars", coords: [40.6013, 43.0938] },
  { name: "Kastamonu", coords: [41.3887, 33.7827] },
  { name: "Kayseri", coords: [38.7335, 35.4853] },
  { name: "Kırıkkale", coords: [39.8469, 33.5153] },
  { name: "Kırklareli", coords: [41.7351, 27.2250] },
  { name: "Kırşehir", coords: [39.1457, 34.1614] },
  { name: "Kilis", coords: [36.7184, 37.1212] },
  { name: "Kocaeli", coords: [40.7654, 29.9401] },
  { name: "Konya", coords: [37.8715, 32.4847] },
  { name: "Kütahya", coords: [39.4167, 29.9857] },
  { name: "Malatya", coords: [38.3552, 38.3095] },
  { name: "Manisa", coords: [38.6191, 27.4289] },
  { name: "Mardin", coords: [37.3126, 40.7351] },
  { name: "Mersin", coords: [36.8121, 34.6415] },
  { name: "Muğla", coords: [37.2153, 28.3636] },
  { name: "Muş", coords: [38.9462, 41.7539] },
  { name: "Nevşehir", coords: [38.6244, 34.7239] },
  { name: "Niğde", coords: [37.9667, 34.6790] },
  { name: "Ordu", coords: [40.9839, 37.8761] },
  { name: "Osmaniye", coords: [37.0748, 36.2474] },
  { name: "Rize", coords: [41.0201, 40.5234] },
  { name: "Sakarya", coords: [40.7561, 30.3789] },
  { name: "Samsun", coords: [41.2867, 36.33] },
  { name: "Siirt", coords: [37.9274, 41.9401] },
  { name: "Sinop", coords: [42.0231, 35.1531] },
  { name: "Sivas", coords: [39.7477, 37.0179] },
  { name: "Şanlıurfa", coords: [37.1674, 38.7955] },
  { name: "Şırnak", coords: [37.4187, 42.4918] },
  { name: "Tekirdağ", coords: [40.9780, 27.5110] },
  { name: "Tokat", coords: [40.3167, 36.5544] },
  { name: "Trabzon", coords: [41.0030, 39.7178] },
  { name: "Tunceli", coords: [39.3077, 39.4388] },
  { name: "Uşak", coords: [38.6823, 29.4082] },
  { name: "Van", coords: [38.5012, 43.4089] },
  { name: "Yalova", coords: [40.6553, 29.2769] },
  { name: "Yozgat", coords: [39.8181, 34.8147] },
  { name: "Zonguldak", coords: [41.4564, 31.7987] }
];

// Add city markers to the map
cities.forEach(city => {
    L.marker(city.coords)
        .addTo(map)
        .bindPopup(city.name)
        .on('click', function () {
            fetchTravelPlan(city.name);
        });
});

// Set the language based on the selection or saved preference
document.getElementById('language-toggle').addEventListener('change', function () {
    const selectedLanguage = this.value;
    setLanguage(selectedLanguage);
    localStorage.setItem('selectedLanguage', selectedLanguage);
});

// Load language preference on page load
window.addEventListener('load', function () {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    document.getElementById('language-toggle').value = savedLanguage;
    setLanguage(savedLanguage);
});
