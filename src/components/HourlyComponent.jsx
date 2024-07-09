// Import necessary libraries and components
import React from "react";
import HourWeather from "./HourWeather"; // Component to display weather for a single hour
import { capitalize } from "../constants/Capitalize"; // Function to capitalize the city name
import dayjs from "dayjs"; // Library to handle date and time formatting

// HourlyComponent component to display hourly weather data
const HourlyComponent = ({ weatherData, cityName }) => {
  // Get the current date and hour
  const filteredDate = dayjs(new Date()).format('D');
  const filteredHour = new Date().getHours();

  // Filter the weather data to include only today's data and hours greater than the current hour
  const filteredData = weatherData.filter((data) => {
    return (
      dayjs(data.dt_txt).format('D') === filteredDate &&
      Number(data.dt_txt.split(" ")[1].split(":")[0]) > filteredHour
    );
  });

  return (
    <div className="hourly-container">
      <p className="hourly-heading">
        Today {" "}
        {cityName && <><span>-</span> {capitalize(cityName)}</>}
      </p>
      <div className="hourly-data">
        {/* Map through the filtered data and display the weather for each hour using HourWeather component */}
        {filteredData.map((data) => (
          <HourWeather key={data?.dt} hourWeather={data} />
        ))}
      </div>
    </div>
  );
};

export default HourlyComponent;
