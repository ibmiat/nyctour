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
        zoom: 18, // Set zoom level to 18 (zoomed in)
    }),
});

// Define Soho area center and zoom
const sohoCenter = ol.proj.fromLonLat([-73.998, 40.725]);  // Approximate center of Soho
const sohoZoomLevel = 16;  // Adjust this zoom level to best view the popups

// Add markers
const markers = [
    { lon: -73.989578, lat: 40.750797, icon: 'SVG/marker1.svg', name: 'Ulta Beauty' },
    { lon: -73.9927, lat: 40.7376, icon: 'SVG/marker1.svg', name: 'Lululemon' },
    { lon: -73.9912, lat: 40.7309, icon: 'SVG/marker1.svg', name: 'Wegmans' },
    { lon: -74.0011, lat: 40.7236, icon: 'SVG/marker1.svg', name: 'The realreal' },
    { lon: -74.0020, lat: 40.7228, icon: 'SVG/marker1.svg', name: 'Reformation' },
    { lon: -73.9986, lat: 40.7228, icon: 'SVG/marker1.svg', name: 'Zara' },
    { lon: -73.9989, lat: 40.7224, icon: 'SVG/marker1.svg', name: 'Glossier' },
    { lon: -73.9982, lat: 40.7273, icon: 'SVG/marker1.svg', name: 'Grocer' },
    { lon: -74.0025, lat: 40.7575, icon: 'SVG/marker1.svg', name: 'Javits Centre' },
    { lon: -73.9844, lat: 40.7740, icon: 'SVG/marker1.svg', name: 'Tavern On the Green' },
    { lon: -73.9763, lat: 40.7636, icon: 'SVG/marker1.svg', name: 'Nobu' },
    { lon: -73.9877, lat: 40.7415, icon: 'SVG/marker1.svg', name: 'IBM One Madison Avenue' }
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

// Ensure the view fits all markers with a max zoom limit
const extent = vectorLayer.getSource().getExtent();
map.getView().fit(extent, {
    padding: [40, 40, 40, 40],
    maxZoom: 14,  // Optional: limit maximum zoom when fitting markers
});

// Function to close all popups
function closeAllPopups() {
    document.getElementById('popup1').style.display = 'none';
    document.getElementById('popup2').style.display = 'none';
    document.getElementById('popup3').style.display = 'none';
    document.getElementById('popup4').style.display = 'none';
    document.getElementById('popup5').style.display = 'none';
    document.getElementById('popup6').style.display = 'none';
    document.getElementById('popup7').style.display = 'none';
    document.getElementById('popup8').style.display = 'none';
    document.getElementById('popup9').style.display = 'none';
    document.getElementById('popup10').style.display = 'none';
    document.getElementById('popup11').style.display = 'none';
    document.getElementById('popup12').style.display = 'none';
}

// Function to move map to Soho area
function moveToSoho() {
    map.getView().animate({
        center: sohoCenter,
        zoom: sohoZoomLevel,
        duration: 1000,  // Smooth transition in 1 second
    });
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

        if (clickedMarker && clickedMarker.name === 'Ulta Beauty') {
            const popupElement = document.getElementById('popup1');
            popupElement.style.display = 'block';
        }

        if (clickedMarker && clickedMarker.name === 'Lululemon') {
            const popupElement = document.getElementById('popup2');
            popupElement.style.display = 'block';
        }

        if (clickedMarker && clickedMarker.name === 'Wegmans') {
            const popupElement = document.getElementById('popup3');
            popupElement.style.display = 'block';
        }

        if (clickedMarker && clickedMarker.name === 'The realreal') {
            const popupElement = document.getElementById('popup4');
            popupElement.style.display = 'block';
            // Move map to Soho area when popup4 is clicked
            moveToSoho();
        }

        if (clickedMarker && clickedMarker.name === 'Reformation') {
            const popupElement = document.getElementById('popup5');
            popupElement.style.display = 'block';
            // Move map to Soho area when popup5 is clicked
            moveToSoho();
        }

        if (clickedMarker && clickedMarker.name === 'Zara') {
            const popupElement = document.getElementById('popup6');
            popupElement.style.display = 'block';
            // Move map to Soho area when popup6 is clicked
            moveToSoho();
        }

        if (clickedMarker && clickedMarker.name === 'Glossier') {
            const popupElement = document.getElementById('popup7');
            popupElement.style.display = 'block';
            // Move map to Soho area when popup7 is clicked
            moveToSoho();
        }

        if (clickedMarker && clickedMarker.name === 'Grocer') {
            const popupElement = document.getElementById('popup8');
            popupElement.style.display = 'block';
        }

        if (clickedMarker && clickedMarker.name === 'Javits Centre') {
            const popupElement = document.getElementById('popup9');
            popupElement.style.display = 'block';
        }

        if (clickedMarker && clickedMarker.name === 'Tavern On the Green') {
            const popupElement = document.getElementById('popup10');
            popupElement.style.display = 'block';
        }

        if (clickedMarker && clickedMarker.name === 'Nobu') {
            const popupElement = document.getElementById('popup11');
            popupElement.style.display = 'block';
        }

        if (clickedMarker && clickedMarker.name === 'IBM One Madison Avenue') {
            const popupElement = document.getElementById('popup12');
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
document.getElementById('closeButton4').onclick = function () {
    document.getElementById('popup4').style.display = 'none';
};
document.getElementById('closeButton5').onclick = function () {
    document.getElementById('popup5').style.display = 'none';
};
document.getElementById('closeButton6').onclick = function () {
    document.getElementById('popup6').style.display = 'none';
};
document.getElementById('closeButton7').onclick = function () {
    document.getElementById('popup7').style.display = 'none';
};
document.getElementById('closeButton8').onclick = function () {
    document.getElementById('popup8').style.display = 'none';
};
document.getElementById('closeButton9').onclick = function () {
    document.getElementById('popup9').style.display = 'none';
};
document.getElementById('closeButton10').onclick = function () {
    document.getElementById('popup10').style.display = 'none';
};
document.getElementById('closeButton11').onclick = function () {
    document.getElementById('popup11').style.display = 'none';
};
document.getElementById('closeButton12').onclick = function () {
    document.getElementById('popup12').style.display = 'none';
};
