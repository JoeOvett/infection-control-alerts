// map.js
/*
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

async function initMap() {
    const loader = new Loader({
        apiKey: "AIzaSyCMlg3335BMxPO51I7ZMpp-OXsTYCAaxYw",
        version: "weekly",
        libraries: ["places"]
    });

    const map = await loader.load().then(() => new google.maps.Map(document.getElementById('map'), {
        center: { lat: 50.819, lng: -0.116 },
        zoom: 8,
        mapId: '8e6deb7a6acd250c',
        tilt: 45,
        heading: 0,
        isFractionalZoomEnabled: true
    }));

    let infoWindow = new google.maps.InfoWindow();
    let markers = [];

    // Assume this fetches an array of locations
    const locations = await fetch('locations.json').then(res => res.json());

    locations.forEach(location => {
        const position = new google.maps.LatLng(location.lat, location.lng);
        const marker = new google.maps.Marker({
            position,
            title: location.name,
            map,
            animation: google.maps.Animation.DROP
        });
        marker.addListener('click', () => {
            infoWindow.setContent(location.name);
            infoWindow.open(map, marker);
        });
        markers.push(marker);
    });

    new MarkerClusterer({ markers, map });
}

window.initMap = initMap;
*/