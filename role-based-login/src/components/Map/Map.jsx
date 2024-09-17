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

const Map = ({ routes }) => {
  const center = [28.6139, 77.2090]; // Center of the map (Delhi, example)
  const zoom = 12; // Zoom level

  // Example bus routes (coordinates should be based on actual routes)
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
  ];

  return (
    <MapContainer center={center} zoom={zoom} className="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {busRoutes.map((route, index) => (
        <Polyline
          key={index}
          positions={route.path}
          color="blue"
          weight={4}
          opacity={0.7}
        >
          <Popup>{route.name}</Popup>
        </Polyline>
      ))}
    </MapContainer>
  );
};

export default Map;
