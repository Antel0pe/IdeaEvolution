// src/components/SearchFilter.js

import React, { useState } from 'react';
import Select from 'react-select';
import { scroller } from 'react-scroll';
import './SearchFilter.css';

function SearchFilter({ events, onFilter }) {
  const [selectedOption, setSelectedOption] = useState(null);

  // Extract unique event titles and themes
  const eventOptions = Array.from(new Set(events.map((event) => event.title))).map((title) => ({
    value: `event-${title}`,
    label: title,
  }));

  const themeOptions = Array.from(new Set(events.map((event) => event.theme))).map((theme) => ({
    value: `theme-${theme}`,
    label: theme,
  }));

  const options = [
    { value: 'all', label: 'All Events' },
    { label: 'By Event', options: eventOptions },
    { label: 'By Theme', options: themeOptions },
  ];

  const handleChange = (option) => {
    setSelectedOption(option);
    onFilter(option);
    scroller.scrollTo('details-section', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -60,
    });
  };

  return (
    <div className="search-filter-container">
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder="Filter by Event or Theme"
        isClearable
      />
    </div>
  );
}

export default SearchFilter;
