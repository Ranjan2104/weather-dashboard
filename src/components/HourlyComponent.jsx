import React from "react";
import HourWeather from "./HourWeather";
import { capitalize } from "../constants/Capitalize";
import dayjs from "dayjs";

const HourlyComponent = ({ weatherData,cityName }) => {
  const filteredDate = dayjs(new Date()).format('D');
  const filteredHour = new Date().getHours();
  const filteredData = weatherData.filter((data) => {
    return (
      dayjs(data.dt_txt).format('D') === filteredDate &&
       Number(data.dt_txt.split(" ")[1].split(":")[0]) > filteredHour
    );
  });

 

  return (
    <div className="hourly-container">
      <p className="hourly-heading">Today  {" "} {
         cityName && <><span>-</span> {capitalize(cityName)}</>
      }</p>
      <div className="hourly-data">
        {filteredData.map((data) => (
          <HourWeather key={data?.dt} hourWeather={data} />
        ))}
      </div>
    </div>
  );
};

export default HourlyComponent;
