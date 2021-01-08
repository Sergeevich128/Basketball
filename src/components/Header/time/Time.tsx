import React, {useState} from 'react';
import './time.css'

const Time = () => {
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  const [time, changeTime] = useState(minutes)
  // console.log(time);
  // console.log(minutes);

  if (minutes != time) {
    changeTime(minutes)
    // console.log('a')
  }
  return (
    <div className="time">{hours}<span className="squareColon"/>{minutes}</div>
  );
};

export default Time;