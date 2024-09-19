// src/components/EventDetails.js

import React from 'react';
import { useSpring, animated } from 'react-spring';
import './EventDetails.css';

function EventDetails({ event }) {
  const props = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div className="event-details" style={props}>
      <h2>
        {event.title} ({event.date > 0 ? event.date : `${Math.abs(event.date)} BCE`})
      </h2>
      <p>{event.text}</p>
      {/* Display Image if available */}
      {event.image && <img src={event.image} alt={event.title} className="event-image" />}
      {/* Display Video if available */}
      {event.video && (
        <div className="event-video">
          <iframe
            width="100%"
            height="200"
            src={event.video}
            title={event.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      {/* Display External Links if available */}
      {event.links && event.links.length > 0 && (
        <div className="event-links">
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
    </animated.div>
  );
}

export default EventDetails;
