// src/components/Legend.js

import React from 'react';
import './Legend.css';

function Legend() {
  return (
    <div className="legend-container">
      <h4>Legend</h4>
      <ul>
        <li>
          <span className="legend-color event-node"></span> Event
        </li>
        <li>
          <span className="legend-color connection-line"></span> Connection
        </li>
        <li>
          <span className="legend-color map-marker"></span> Location
        </li>
      </ul>
    </div>
  );
}

export default Legend;
