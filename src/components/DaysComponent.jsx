import React from "react";
import DaysData from "./DaysData";

const DaysComponent = ({ weatherData }) => {
  const filteredDate = new Date().toISOString().split("T")[0].split("-")[2];


  function filterDates(data, dateCondition) {
    const processedDates = new Set();

    return weatherData.filter((data) => {
      
      if (
        !processedDates.has(data.dt_txt.split(" ")[0].split("-")[2]) &&
        dateCondition(data.dt_txt.split(" ")[0].split("-")[2])
      ) {
    
        processedDates.add(data.dt_txt.split(" ")[0].split("-")[2]);
        return true;
      }
      return false;
    });
  }

  const dateCondition = (date) => {
    return date > filteredDate;
  };

  const filteredData = filterDates(weatherData, dateCondition);

  return (
    <div className="hourly-container">
      <p className="hourly-heading">Days</p>
      <div className="days-data-container">
        {filteredData.map((day) => (
          <DaysData dayData={day} />
        ))}
      </div>
    </div>
  );
};

export default DaysComponent;
