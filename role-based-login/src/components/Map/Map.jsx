import React from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import './Map.css'; // Optional: add custom styles for the map
import L from 'leaflet';
import markerImg from './marker.png';

// Custom marker icons for start and end points
const startIcon = new L.Icon({
  iconUrl: markerImg,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const endIcon = new L.Icon({
  iconUrl: markerImg,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Map = () => {
  const center = [28.6139, 77.2090]; // Center of the map (Delhi, example)
  const zoom = 12; // Zoom level

  // Example bus routes with start and end points
  const busRoutes = [
    {
      name: 'Route 1: City Center to Airport',
      path: [
        [28.6129, 77.2295],
        [28.6145, 77.2152],
        [28.6167, 77.2101],
        [28.6190, 77.2000],
      ],
    },
    {
      name: 'Route 2: Downtown to Suburbs',
      path: [
        [28.6150, 77.2075],
        [28.6200, 77.2200],
        [28.6250, 77.2300],
        [28.6300, 77.2400],
      ],
    },
    {
      name: 'Route 3: Metro Station to City Park',
      path: [
        [28.6450, 77.1900],
        [28.6500, 77.2000],
        [28.6550, 77.2100],
        [28.6600, 77.2200],
      ],
    },
    // Add more routes here...
  ];

  // Adding more routes to meet the requirement of 15 routes
  while (busRoutes.length < 15) {
    busRoutes.push({
      name: `Route ${busRoutes.length + 1}: Route Name`,
      path: [
        [28.6 + Math.random() * 0.1, 77.2 + Math.random() * 0.1],
        [28.6 + Math.random() * 0.1, 77.2 + Math.random() * 0.1],
      ],
    });
  }

  return (
    <MapContainer center={center} zoom={zoom} className="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {busRoutes.map((route, index) => {
        const startPoint = route.path[0];
        const endPoint = route.path[route.path.length - 1];

        return (
          <React.Fragment key={index}>
            <Polyline
              positions={route.path}
              color="blue"
              weight={4}
              opacity={0.7}
            >
              <Popup>{route.name}</Popup>
            </Polyline>

            {/* Marker for starting point */}
            <Marker position={startPoint} icon={startIcon}>
              <Popup>{`Start: ${route.name}`}</Popup>
            </Marker>

            {/* Marker for ending point */}
            <Marker position={endPoint} icon={endIcon}>
              <Popup>{`End: ${route.name}`}</Popup>
            </Marker>
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
};

export default Map;
