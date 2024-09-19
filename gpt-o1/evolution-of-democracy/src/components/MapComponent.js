// src/components/MapComponent.js

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import L from 'leaflet';
import ReactTooltip from 'react-tooltip';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';

// Fix for default marker icon not showing in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapComponent({ event }) {
  const centerPosition = [20, 0]; // Default center position

  // Example of highlighted regions (you can customize or remove this)
  const highlightedRegions = {
    "Athens, Greece": [
      [37.9838, 23.7275],
      [38.0238, 23.7275],
      [38.0238, 23.7675],
      [37.9838, 23.7675],
    ],
    // Add more regions as needed
  };

  return (
    <div className="map-container">
      <MapContainer center={centerPosition} zoom={2} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {event.locations.map((location, index) => (
          <Marker key={index} position={location.position} data-tip={location.label}>
            <Popup>{location.label}</Popup>
          </Marker>
        ))}

        {/* Highlighted Regions */}
        {event.locations.map((location, index) => {
          const region = highlightedRegions[location.label];
          if (region) {
            return (
              <Polygon
                key={index}
                positions={region}
                pathOptions={{ color: 'blue', fillOpacity: 0.2 }}
              />
            );
          }
          return null;
        })}
      </MapContainer>
      <ReactTooltip />
    </div>
  );
}

export default MapComponent;
