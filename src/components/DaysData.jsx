// Import necessary libraries and functions
import dayjs from "dayjs"; // Import dayjs for date formatting
import React from "react"; // Import React to use JSX and component features
import { capitalize } from "../constants/Capitalize"; // Import capitalize function to capitalize strings

// DaysData component to display weather data for a single day
const DaysData = ({ dayData }) => {
  // The component expects a single prop:
  // - dayData: An object containing weather data for a specific day

  return (
    <div className="days-data">
      {/* Display the day of the week */}
      <p className="days-data-day">{dayjs(dayData.dt_txt).format('dddd')}</p>
      {/* Display the date in 'DD MMM' format */}
      <p>{dayjs(dayData.dt_txt).format('DD MMM')}</p>
      {/* Display the weather description, capitalized */}
      <p>{capitalize(dayData?.weather[0]?.description)}</p>
      {/* Display the temperature, rounded to the nearest whole number */}
      <p>{Math.round(dayData?.main?.temp)}°C</p>
      {/* Display the wind speed */}
      <p>{dayData?.wind?.speed} km/hr</p>
    </div>
  );
};

export default DaysData;
