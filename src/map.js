// Import necessary libraries
import { Loader } from '@googlemaps/js-api-loader';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

// Initialize the Google Maps Loader with your API key and required libraries
const loader = new Loader({
    apiKey: 'AIzaSyCMlg3335BMxPO51I7ZMpp-OXsTYCAaxYw', // Replace with your actual API key
    version: 'weekly',
    libraries: ['marker']
});

loader.load().then(async (google) => {
    // Create a new map instance
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 50.819, lng: -0.116 },
        zoom: 8,
        maxZoom: 21,
        mapId: '8e6deb7a6acd250c',  // Your specific map ID
        tilt: 45,
        heading: 0,
        isFractionalZoomEnabled: true
    });

    // Import AdvancedMarkerElement for usage
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

    // Function to fetch markers data and create markers
    async function fetchMarkers() {
        const response = await fetch('https://jo435.brighton.domains/ci601/get-locations.php');
        const locations = await response.json();

        const markers = locations.map(location => {
            const pos = new google.maps.LatLng(location.Latitude, location.Longitude);
            const marker = new AdvancedMarkerElement({
                position: pos,
                map: map,
                title: location.Name
            });

            // Add a click listener for each marker
            marker.addListener('click', () => {
                const content = `
                <div>
                <h2>${location.Name}</h2>
                <p><strong>Lab No:</strong> ${location.LabNo}</p>
                <p><strong>Sex:</strong> ${location.Sex.trim()}</p>
                <p><strong>Age:</strong> ${location.Age}</p>
                <p><strong>Collected:</strong> ${location.Collected}</p>
                <p><strong>Received:</strong> ${location.Received}</p>
                <p><strong>Sample:</strong> ${location.Sample}</p>
                <p><strong>Isolate:</strong> ${location.Isolate}</p>
                ${[...Array(18)].map((_, i) => location[`Antibiotic${i+1}`] ? `<p><strong>Antibiotic ${i+1}:</strong> ${location[`Antibiotic${i+1}`]}</p>` : '').join('')}
            </div>
                `; // Modify as needed to include other details

                const infoWindow = new google.maps.InfoWindow({
                    content: content
                });

                infoWindow.open(map, marker);
            });

            return marker;
        });

        // Initialize the marker clusterer
        const markerCluster = new MarkerClusterer(map, markers, {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });
    }

    // Call the function to fetch and display markers
    fetchMarkers();
});
