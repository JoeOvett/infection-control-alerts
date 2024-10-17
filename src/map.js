import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
// The main map functionallity is here
// Function to hide the loading overlay
function hideLoadingOverlay() {
  document.querySelector('.loading-overlay').style.display = 'none';
}

const loader = new Loader({
  apiKey: "AIzaSyCMlg3335BMxPO51I7ZMpp-OXsTYCAaxYw",
  version: "weekly",
  libraries: ["places", "marker"]
});

loader.load().then(async () => {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.04093204, lng: 0.149421913 },
    zoom: 10,
    mapId: "8e6deb7a6acd250c" // My pink map style for Google Maps API
    
  });


  // Ensure the AdvancedMarkerElement is loaded
  const { AdvancedMarkerElement } = google.maps.marker;
  const userId = 1; // Or fetch this from a login session, local storage, etc.


  try {
    // Fetch JSON data from the specified URL
    const response = await fetch("https://jo435.brighton.domains/ci601/get-locations.php");
    if (!response.ok) {
      throw new Error(`Failed to fetch location data: ${response.statusText}`);
    }
    let locations = await response.json();

    // Limit the number of locations to 1000
    locations = locations.slice(0, 400);

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
        <button id="acknowledgeBtn-${data.LabNo.trim()}">Acknowledge</button>
        </div>
    `;
    function acknowledgeRecord(labNo, userId, data) {
      let body = `user_id=${encodeURIComponent(userId)}&LabNo=${encodeURIComponent(labNo)}&Sex=${encodeURIComponent(data.Sex.trim())}&Age=${encodeURIComponent(data.Age.trim())}&Collected=${encodeURIComponent(data.Collected)}&Received=${encodeURIComponent(data.Received)}&Source=${encodeURIComponent(data.Source.trim())}&Name=${encodeURIComponent(data.Name.trim())}&Sample=${encodeURIComponent(data.Sample.trim())}&Isolate=${encodeURIComponent(data.Isolate.trim())}`;
  
      // Add up to 18 antibiotics dynamically to the body of the request
      for (let i = 1; i <= 18; i++) {
          const antibioticKey = `Antibiotic${i}`;
          if (data[antibioticKey]) {
              body += `&${antibioticKey}=${encodeURIComponent(data[antibioticKey])}`;
          }
      }
  
      fetch('https://jo435.brighton.domains/ci601/records.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: body,
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              console.log('Record acknowledged:', data);
              alert('Record has been acknowledged successfully!');
          } else {
              console.error('Error acknowledging record:', data.error);
              alert('Failed to acknowledge the record.');
          }
      })
      .catch(error => console.error('Error in AJAX call:', error));
  }
  
    
    
    
    

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

// After the InfoWindow is displayed and its content is loaded
google.maps.event.addListener(infoWindow, 'domready', () => {
    const btnId = `acknowledgeBtn-${data.LabNo.trim()}`;
    const acknowledgeBtn = document.getElementById(btnId);
    if (acknowledgeBtn) {
        acknowledgeBtn.addEventListener('click', () => {
            // Pass the entire 'data' object or individual fields needed
            acknowledgeRecord(data.LabNo.trim(), userId, data);
        });
    }

    // Optional: close info window on click
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
    new MarkerClusterer({ markers, map, maxZoom: 1, minimumClusterSize: 5});
    
    // Hide loading overlay after all tiles are loaded
    google.maps.event.addListenerOnce(map, 'tilesloaded', hideLoadingOverlay);
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
