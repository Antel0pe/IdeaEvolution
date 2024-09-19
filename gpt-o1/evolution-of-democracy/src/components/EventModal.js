// src/components/EventModal.js

import React from 'react';
import Modal from 'react-modal';
import './EventModal.css';

Modal.setAppElement('#root'); // For accessibility

function EventModal({ isOpen, onRequestClose, event }) {
  if (!event) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Event Details"
      className="event-modal"
      overlayClassName="event-modal-overlay"
    >
      <button className="close-button" onClick={onRequestClose}>
        &times;
      </button>
      <h2>
        {event.title} ({event.date > 0 ? event.date : `${Math.abs(event.date)} BCE`})
      </h2>
      <p>{event.text}</p>
      {event.image && <img src={event.image} alt={event.title} className="modal-image" />}
      {event.video && (
        <div className="modal-video">
          <iframe
            width="100%"
            height="300"
            src={event.video}
            title={event.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      {event.links && event.links.length > 0 && (
        <div className="modal-links">
          <h4>Learn More:</h4>
          <ul>
            {event.links.map((link, index) => (
              <li key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Modal>
  );
}

export default EventModal;
