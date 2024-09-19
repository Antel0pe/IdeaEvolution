// src/components/NetworkGraph.js

import React, { useState } from 'react';
import { Network } from 'react-vis-network';
import EventModal from './EventModal';
import './NetworkGraph.css';

function NetworkGraph({ events }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const nodes = events.map((event) => ({
    id: event.id,
    label: event.title,
    title: event.text,
    shape: 'dot',
    size: 20,
    color: '#3498db',
  }));

  const edges = [];
  events.forEach((event) => {
    event.relatedEvents.forEach((relatedId) => {
      edges.push({ from: event.id, to: relatedId, color: '#95a5a6', arrows: 'to' });
    });
  });

  const data = { nodes, edges };

  const options = {
    layout: {
      hierarchical: false,
    },
    nodes: {
      borderWidth: 2,
      borderColor: '#2c3e50',
      color: {
        background: '#3498db',
        border: '#2c3e50',
      },
      font: { color: '#ecf0f1' },
    },
    edges: {
      color: '#95a5a6',
      arrows: { to: { enabled: true, scaleFactor: 0.5 } },
    },
    interaction: {
      hover: true,
      navigationButtons: true,
      keyboard: true,
    },
    physics: {
      enabled: true,
      stabilization: { iterations: 1000 },
    },
  };

  const handleSelect = (event) => {
    const { nodes } = event;
    if (nodes.length > 0) {
      const selectedNode = events.find((e) => e.id === nodes[0]);
      setSelectedEvent(selectedNode);
      setModalIsOpen(true);
    }
  };

  return (
    <div className="network-graph-container">
      <h3>Interconnectedness of Events</h3>
      <Network
        data={data}
        options={options}
        events={{ select: handleSelect }}
      />
      <EventModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
}

export default NetworkGraph;
