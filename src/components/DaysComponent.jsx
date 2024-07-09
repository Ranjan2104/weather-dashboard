// Import necessary libraries and components
import React from "react";
import DaysData from "./DaysData"; // Import DaysData component

// DaysComponent to display weather data for multiple days
const DaysComponent = ({ weatherData }) => {
  // Get the current date (day of the month)
  const filteredDate = new Date().toISOString().split("T")[0].split("-")[2];

  // Function to filter dates based on a condition
  function filterDates(data, dateCondition) {
    const processedDates = new Set(); // Set to keep track of processed dates

    return weatherData.filter((data) => {
      const currentDate = data.dt_txt.split(" ")[0].split("-")[2];

      if (!processedDates.has(currentDate) && dateCondition(currentDate)) {
        processedDates.add(currentDate); // Add the date to the set if it meets the condition
        return true; // Include the data in the filtered results
      }
      return false; // Exclude the data if it doesn't meet the condition
    });
  }

  // Condition to filter dates greater than the current date
  const dateCondition = (date) => {
    return date > filteredDate;
  };

  // Filter the weather data based on the date condition
  const filteredData = filterDates(weatherData, dateCondition);

  return (
    <div className="hourly-container">
      <p className="hourly-heading">Days</p>
      <div className="days-data-container">
        {filteredData.map((day) => (
          <DaysData key={day.dt} dayData={day} /> // Render DaysData component for each filtered day
        ))}
      </div>
    </div>
  );
};

export default DaysComponent;
