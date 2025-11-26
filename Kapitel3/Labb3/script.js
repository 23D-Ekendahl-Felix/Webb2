// Leaflet
var map = L.map('map').setView([59.35, 18.06], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([59.237, 18.102]).addTo(map);
var circle = L.circle([59.237, 18.102], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 150
}).addTo(map);
circle.bindPopup("Här finns det en vild Sandor (Danger)");
marker.bindPopup("Här finns det en vild Sandor (Danger)").openPopup();

// Toastify
Toastify({

text: "Danger",

duration: 3000000000000

}).showToast();

