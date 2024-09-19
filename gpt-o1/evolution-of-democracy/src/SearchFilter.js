// src/components/SearchFilter.js

import React, { useState } from 'react';
import Select from 'react-select';
import { scroller } from 'react-scroll';
import './SearchFilter.css';

function SearchFilter({ events, onFilter }) {
  const [selectedOption, setSelectedOption] = useState(null);

  // Extract unique themes or regions from events
  const options = [
    { value: 'all', label: 'All Events' },
    ...Array.from(new Set(events.map((event) => event.title))).map((title) => ({
      value: title,
      label: title,
    })),
    // Alternatively, categorize by region or theme if available
  ];

  const handleChange = (option) => {
    setSelectedOption(option);
    onFilter(option);
    scroller.scrollTo('details-section', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -60, // Adjust for header height
    });
  };

  return (
    <div className="search-filter-container">
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder="Filter by Event"
        isClearable
      />
    </div>
  );
}

export default SearchFilter;
