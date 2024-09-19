// src/components/Timeline.js

import React from 'react';
import Slider, { Handle } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import './Timeline.css';

const { createSliderWithTooltip } = Slider;

// Custom Handle with Tooltip
const HandleWithTooltip = (props) => {
  const { value, dragging, index, ...rest } = props;
  const tooltipVisible = dragging;

  // Find the event corresponding to this value
  const event = props.events[value];

  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={event.title}
      visible={tooltipVisible}
      placement="top"
      key={index}
    >
      <Handle value={value} {...rest} />
    </Tooltip>
  );
};

function Timeline({ max, onChange, currentIndex, events }) {
  const marks = {
    0: '-508 BCE',
    1: '1215',
    2: '1776',
    3: '1789',
    4: '1918',
    5: '1948',
    6: '1989',
  };

  return (
    <div className="timeline-container">
      <Slider
        min={0}
        max={max}
        marks={marks}
        step={null}
        value={currentIndex}
        onChange={onChange}
        handle={HandleWithTooltip}
        railStyle={{ backgroundColor: '#bdc3c7', height: 10 }}
        handleStyle={{
          borderColor: '#2c3e50',
          height: 24,
          width: 24,
          marginLeft: -14,
          marginTop: -7,
          backgroundColor: '#2c3e50',
        }}
        trackStyle={{ backgroundColor: '#3498db', height: 10 }}
      />
    </div>
  );
}

export default Timeline;
