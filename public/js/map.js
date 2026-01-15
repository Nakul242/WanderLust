document.addEventListener('DOMContentLoaded', function() {
    const mapElement = document.getElementById('map');
    
    if (!mapElement) return;
    
    // Check if coordinates are defined globally (from EJS)
    let coordinates;
    if (typeof window.coordinates !== 'undefined') {
        coordinates = window.coordinates; // [longitude, latitude]
    } else {
        // Fallback to data attributes
        const latitude = parseFloat(mapElement.dataset.latitude) || 28.6139;
        const longitude = parseFloat(mapElement.dataset.longitude) || 77.2088;
        coordinates = [longitude, latitude];
    }
    
    // Note: Leaflet uses [latitude, longitude] format
    const [lng, lat] = coordinates;
    
    // Initialize map
    const map = L.map('map').setView([lat, lng], 13);
    
    // Add OpenStreetMap tile layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Create custom red marker icon
    const redIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    
    // Add custom red marker
    const marker = L.marker([lat, lng], { icon: redIcon }).addTo(map);
    
    // Get location name
    const locationName = mapElement.dataset.location || 'Listing Location';
    marker.bindPopup(`<b>${locationName}</b><br> Exact location will be provided after booking`).openPopup();
});