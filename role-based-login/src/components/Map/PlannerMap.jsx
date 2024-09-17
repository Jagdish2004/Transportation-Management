// src/components/Map/Map.jsx
import React from 'react';
import { MapContainer, TileLayer, Polyline, Popup } from 'react-leaflet';
import './Map.css'; // Optional: add custom styles for the map

const Map = ({ routes }) => {
  const center = [28.6139, 77.2090]; // Center of the map (Delhi, example)
  const zoom = 12; // Zoom level

  return (
    <MapContainer center={center} zoom={zoom} className="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {routes.map((route, index) => (
        <Polyline
          key={index}
          positions={route.coordinates.map(coord => [coord.lat, coord.lng])} // Map coordinates to lat,lng
          color="blue"
          weight={4}
          opacity={0.7}
        >
          <Popup>
            <strong>{route.id}</strong>
            <ul>
              {route.coordinates.map((coord, idx) => (
                <li key={idx}>
                  {coord.destination}: ({coord.lat}, {coord.lng})
                </li>
              ))}
            </ul>
          </Popup>
        </Polyline>
      ))}
    </MapContainer>
  );
};

export default Map;
