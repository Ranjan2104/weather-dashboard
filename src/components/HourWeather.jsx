// Import necessary libraries and assets
import React from "react";
import TempImage from "../assets/weather_dashboard_27_may 2.jpg"; // Import an image asset
import { capitalize } from "../constants/Capitalize"; // Import the capitalize function
import { PiWindDuotone } from "react-icons/pi"; // Import wind icon from react-icons
import { TbDropletHalf2 } from "react-icons/tb"; // Import humidity icon from react-icons
import { IoEyeOutline } from "react-icons/io5"; // Import visibility icon from react-icons
import dayjs from "dayjs"; // Import dayjs library for date formatting

// HourWeather component to display weather data for a single hour
const HourWeather = ({ hourWeather }) => {
  return (
    <div className="hour-container">
      <div className="hour-data-box">
        {/* Display weather description, temperature, and time */}
        <div className="temp-time-container">
          <p className="hour-weather-message">
            {capitalize(hourWeather?.weather[0]?.description)} {/* Capitalize weather description */}
          </p>
          <img 
            src={`https://openweathermap.org/img/wn/${hourWeather?.weather[0]?.icon}@2x.png`} 
            className="weather-icon"
          /> {/* Display weather icon */}
          <p className="hour-temp">{Math.round(hourWeather?.main?.temp)}°</p> {/* Display rounded temperature */}
          <p className="hour-time">
            {dayjs(hourWeather?.dt_txt).format("hh:mm A")} {/* Format and display time */}
          </p>
        </div>

        {/* Display wind, humidity, and visibility data */}
        <div className="wind-humidity-visibility-container">
          <div className="whv-box whv-border">
            <PiWindDuotone size={"1.75rem"} color="#cfe5f3" /> {/* Wind icon */}
            <p>{hourWeather?.wind?.speed} km/h</p> {/* Display wind speed */}
            <p>Wind</p>
          </div>
          <div className="whv-box whv-border">
            <TbDropletHalf2 size={"1.75rem"} color="#cfe5f3" /> {/* Humidity icon */}
            <p>{hourWeather?.main?.humidity}%</p> {/* Display humidity percentage */}
            <p>Humidity</p>
          </div>
          <div className="whv-box">
            <IoEyeOutline size={"1.75rem"} color="#cfe5f3" /> {/* Visibility icon */}
            <p>{hourWeather?.visibility / 1000} km</p> {/* Display visibility in kilometers */}
            <p>Visibility</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourWeather;
