import React from "react";
import TempImage from "../assets/weather_dashboard_27_may 2.jpg";
import { capitalize } from "../constants/Capitalize";
import { PiWindDuotone } from "react-icons/pi";
import { TbDropletHalf2 } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";

import dayjs from "dayjs";

const HourWeather = ({ hourWeather }) => {
  


  return (
    <div className="hour-container">
      <div className="hour-data-box">
        {/* <p>"Icon"</p> */}
        <div className="temp-time-container">
          <p className="hour-weather-message">
            {capitalize(hourWeather?.weather[0]?.description)}
          </p>
          <img src={`https://openweathermap.org/img/wn/${hourWeather?.weather[0]?.icon}@2x.png` } className="weather-icon"/>
          <p className="hour-temp">{Math.round(hourWeather?.main?.temp)}°</p>
          <p className="hour-time">
            {dayjs(hourWeather?.dt_txt).format("hh:mm A")}
          </p>
        </div>

        <div className="wind-humidity-visibility-container">
          <div className="whv-box whv-border">
            <PiWindDuotone size={"1.75rem"} color="#cfe5f3" />
            <p>{hourWeather?.wind?.speed} km/h</p>
            <p>Wind</p>
          </div>
          <div className="whv-box whv-border">
            <TbDropletHalf2 size={"1.75rem"} color="#cfe5f3" />
            <p>{hourWeather?.main?.humidity}%</p>
            <p>Humidity</p>
          </div>
          <div className="whv-box">
            <IoEyeOutline size={"1.75rem"} color="#cfe5f3" />
            <p>{hourWeather?.visibility / 1000} km</p>
            <p> Visibility</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourWeather;
