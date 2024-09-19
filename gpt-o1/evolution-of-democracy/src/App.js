// src/App.js

import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import Timeline from './components/Timeline';
import EventDetails from './components/EventDetails';
import NetworkGraph from './components/NetworkGraph';
import SearchFilter from './components/SearchFilter';
import Legend from './components/Legend';
import { events as allEvents } from './data/events';
import './App.css';

function App() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [filteredEvents, setFilteredEvents] = useState(allEvents);

  const handleTimelineChange = (index) => {
    setCurrentEventIndex(index);
  };

  const handleFilter = (selectedOption) => {
    if (!selectedOption || selectedOption.value === 'all') {
      setFilteredEvents(allEvents);
      setCurrentEventIndex(0);
    } else if (selectedOption.value.startsWith('event-')) {
      const title = selectedOption.label;
      const filtered = allEvents.filter((event) => event.title === title);
      setFilteredEvents(filtered);
      setCurrentEventIndex(0);
    } else if (selectedOption.value.startsWith('theme-')) {
      const theme = selectedOption.label;
      const filtered = allEvents.filter((event) => event.theme === theme);
      setFilteredEvents(filtered);
      setCurrentEventIndex(0);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        The Evolution of Democracy
      </header>
      <SearchFilter events={allEvents} onFilter={handleFilter} />
      <div className="map-section">
        <MapComponent event={filteredEvents[currentEventIndex]} />
      </div>
      <div className="details-section" id="details-section">
        <EventDetails event={filteredEvents[currentEventIndex]} />
        <Timeline
          max={filteredEvents.length - 1}
          onChange={handleTimelineChange}
          currentIndex={currentEventIndex}
          events={filteredEvents}
        />
        <NetworkGraph events={filteredEvents} />
      </div>
      <Legend />
      <footer className="footer">
        &copy; {new Date().getFullYear()} Your Name. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
