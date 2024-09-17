// src/components/Map/Map.jsx
import React from 'react';
import { MapContainer, TileLayer, Polyline, Popup, Marker } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import './Map.css'; // Optional: add custom styles for the map

const Map = ({ routes }) => {
  const center = [28.6139, 77.2090]; // Center of the map (Delhi, example)
  const zoom = 12; // Zoom level

  // Custom icon for the destination points
  const destinationIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [10, 15],
    iconAnchor: [5, 15],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
   
  });

  return (
    <MapContainer center={center} zoom={zoom} className="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {routes.map((route, index) => (
        <React.Fragment key={index}>
          <Polyline
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
          {route.coordinates.map((coord, idx) => (
            <Marker
              key={idx}
              position={[coord.lat, coord.lng]}
              icon={destinationIcon} // Use the custom icon for markers
            >
              <Popup>{coord.destination}</Popup>
            </Marker>
          ))}
        </React.Fragment>
      ))}
    </MapContainer>
  );
};

export default Map;
