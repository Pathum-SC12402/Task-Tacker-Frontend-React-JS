import React, { useState, useEffect } from 'react';
import './CurrentTime.css';

const CurrentTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  // Format the date and time
  const formattedDate = currentDateTime.toLocaleDateString(); // MM/DD/YYYY or your preferred format
  const formattedTime = currentDateTime.toLocaleTimeString(); // HH:MM:SS or your preferred format

  return (
    <div className="current-time">
      <span>{formattedDate} {formattedTime}</span>
    </div>
  );
};

export default CurrentTime;
