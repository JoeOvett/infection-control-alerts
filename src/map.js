import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const loader = new Loader({
  apiKey: "AIzaSyCMlg3335BMxPO51I7ZMpp-OXsTYCAaxYw",
  version: "weekly",
  libraries: ["places", "marker"]
});

loader.load().then(async () => {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.13531071, lng: 0.001977888 },
    zoom: 8,
    mapId: "8e6deb7a6acd250c" // Ensure this is a valid Map ID from your Google Cloud Console
  });

  // Ensure the AdvancedMarkerElement is loaded
  const { AdvancedMarkerElement } = google.maps.marker;

  try {
    // Fetch JSON data from the specified URL
    const response = await fetch("https://jo435.brighton.domains/ci601/get-locations.php");
    if (!response.ok) {
      throw new Error(`Failed to fetch location data: ${response.statusText}`);
    }
    let locations = await response.json();

    // Limit the number of locations to 1000
    locations = locations.slice(0, 4000);

    // Log the number of locations received
    console.log(`Number of locations received: ${locations.length}`);

    // Create marker objects from JSON data
    const markers = locations.map(data => {
      const position = { lat: parseFloat(data.Latitude), lng: parseFloat(data.Longitude) };
      console.log("Marker position:", position); // Log marker position
      
      // Create content for info window
      const antibioticsContent = getAntibioticsContent(data);
      const content = `
        <div>
          <h2>${data.Name}</h2>
          <p><strong>Lab No:</strong> ${data.LabNo.trim()}</p>
          <p><strong>Sex:</strong> ${data.Sex.trim()}</p>
          <p><strong>Age:</strong> ${data.Age.trim()}</p>
          <p><strong>Collected:</strong> ${data.Collected}</p>
          <p><strong>Received:</strong> ${data.Received}</p>
          <p><strong>Sample:</strong> ${data.Sample.trim()}</p>
          <p><strong>Isolate:</strong> ${data.Isolate}</p>
          ${antibioticsContent}
        </div>
      `;

      // Create info window
      const infoWindow = new google.maps.InfoWindow({
        content: content
      });

      // Create marker
      const marker = new AdvancedMarkerElement({
        position: position,
        map: map,
        title: data.Name // You can customize the title as needed
      });

      // Add click event listener to marker
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      // Add click event listener to close info window if clicked
      google.maps.event.addListener(infoWindow, 'domready', () => {
        const infoWindowContent = document.querySelector('.gm-style-iw');
        infoWindowContent.addEventListener('click', () => {
          infoWindow.close();
        });
      });

      return marker;
    });

    // Log the number of markers created
    console.log(`Number of markers created: ${markers.length}`);

    // Initialize the marker clusterer with minimumClusterSize option
    new MarkerClusterer({ markers, map });
  } catch (error) {
    console.error(error);
  }       
});

// Function to generate antibiotics content
function getAntibioticsContent(data) {
    // Initialize the content string
    let content = '<p><strong>Antibiotics:</strong></p><ul>';
    
    // Loop through the antibiotics in the data object
    for (let i = 1; i <= 18; i++) {
        const antibioticKey = `Antibiotic${i}`;
        const antibiotic = data[antibioticKey].trim();
        // Check if the antibiotic exists and is not an empty string
        if (antibiotic) {
            content += `<li><strong>${antibioticKey}:</strong> ${antibiotic}</li>`;
        }
    }

    // Close the unordered list tag
    content += '</ul>';
    return content;
}
