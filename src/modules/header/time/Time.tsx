import React, {useState} from 'react';
import './time.css';

const Time = () => {
  const actualTime = () => {
    let hours = new Date().getHours().toString();
    let minutes = new Date().getMinutes().toString();

    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }
    if (hours.length < 2) {
      hours = '0' + hours;
    }
    return [hours, minutes]
  }

  const [time, changeTime] = useState(actualTime());

  setInterval(() => {
    changeTime([actualTime()[0], actualTime()[1]])
    return actualTime()
  }, 1000)

  return (
    <div className="time">{time[0]}<span className="square-colon"/>{time[1]}</div>
  );
};

export default Time;