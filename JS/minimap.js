// Initialize the map with a styled tile layer
const map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://{a-d}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', // CartoDB Light
            attributions: 'Map tiles by <a href="https://carto.com/" target="_blank">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. Data by <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors.'
        }),
        }),
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([-74.006, 40.7128]), // Center on New York City
        zoom: 12, // Set zoom level for a city view
    }),
});

// Add markers
const markers = [
{ lon: -73.9654, lat: 40.7851, icon: 'SVG/marker1.svg', name: 'Central Park' },
{ lon: -73.9772, lat: 40.7527, icon: 'SVG/marker1.svg', name: 'Times Square' },
{ lon: -73.9542, lat: 40.7788, icon: 'SVG/marker1.svg', name: 'Ulta Beauty' },
];

// Create features for each marker
const features = markers.map(marker => {
const feature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([marker.lon, marker.lat])),
});

const markerStyle = new ol.style.Style({
    image: new ol.style.Icon({
    anchor: [0.5, 1],
    src: marker.icon,
    }),
});

feature.setStyle(markerStyle);
return feature;
});

// Create vector layer
const vectorLayer = new ol.layer.Vector({
source: new ol.source.Vector({
    features: features,
}),
});

// Add vector layer to the map
map.addLayer(vectorLayer);

// Ensure the view fits all markers
const extent = vectorLayer.getSource().getExtent();
map.getView().fit(extent, {
padding: [40, 40, 40, 40],
maxZoom: 12,
});

// Function to close all popups
function closeAllPopups() {
document.getElementById('popup1').style.display = 'none';
document.getElementById('popup2').style.display = 'none';
document.getElementById('popup3').style.display = 'none';
}

// Add click event for showing the popup when clicking a marker
map.on('singleclick', function (event) {
const feature = map.forEachFeatureAtPixel(event.pixel, function (feature) {
    return feature;
});

// Close all popups initially
closeAllPopups();

if (feature) {
    const coordinate = feature.getGeometry().getCoordinates();
    const clickedMarker = markers.find(marker => {
    const markerCoords = ol.proj.toLonLat(coordinate);
    return (
        Math.abs(markerCoords[0] - marker.lon) < 0.0001 &&
        Math.abs(markerCoords[1] - marker.lat) < 0.0001
    );
    });

    if (clickedMarker && clickedMarker.name === 'Central Park') {
    const popupElement = document.getElementById('popup1');
    popupElement.style.display = 'block';
    }

    if (clickedMarker && clickedMarker.name === 'Times Square') {
    const popupElement = document.getElementById('popup2');
    popupElement.style.display = 'block';
    }

    if (clickedMarker && clickedMarker.name === 'Ulta Beauty') {
    const popupElement = document.getElementById('popup3');
    popupElement.style.display = 'block';
    }
}
});

// Close button functionality
document.getElementById('closeButton1').onclick = function () {
    document.getElementById('popup1').style.display = 'none';
};
document.getElementById('closeButton2').onclick = function () {
    document.getElementById('popup2').style.display = 'none';
};
document.getElementById('closeButton3').onclick = function () {
    document.getElementById('popup3').style.display = 'none';
};
