import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapView.css';

// Define the bounding box for Delhi
const DELHI_BOUNDS = [
  [28.4089, 77.0266], // Southwest coordinates (approx. Faridabad)
  [28.7257, 77.3910]  // Northeast coordinates (approx. Noida)
];

const MapView = ({ routes }) => {
  React.useEffect(() => {
    if (!routes || routes.length === 0) {
      return; // Exit if no routes to display
    }

    // Initialize the map and set its view
    const map = L.map('map').setView([28.6139, 77.2090], 12); // Centered around Delhi

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add routes to the map
    routes.forEach(route => {
      if (route.coordinates && route.coordinates.length > 1) {
        // Add polyline for the route
        L.polyline(route.coordinates, {
          color: 'blue',
          weight: 4,
          opacity: 0.7,
          lineJoin: 'round'
        }).addTo(map);

        // Add red dots at each stop
        route.coordinates.forEach(coord => {
          if (coord.lat && coord.lng) {
            L.circleMarker([coord.lat, coord.lng], {
              color: 'red',
              fillColor: 'red',
              fillOpacity: 0.8,
              radius: 8, // Increased size for better visibility
              weight: 2, // Border weight
              opacity: 1 // Border opacity
            }).addTo(map);
          }
        });
      }
    });

    // Fit the map bounds to the defined area for Delhi
    if (DELHI_BOUNDS) {
      map.fitBounds(DELHI_BOUNDS);
      map.setMaxBounds(DELHI_BOUNDS);
    }

    // Cleanup on component unmount
    return () => {
      map.off(); // Remove all event listeners
      map.remove(); // Remove the map from the DOM
    };
  }, [routes]);

  return <div id="map"></div>;
};

export default MapView;

