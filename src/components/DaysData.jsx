import dayjs from "dayjs";
import React from "react";
import { capitalize } from "../constants/Capitalize";

const DaysData = ({ dayData }) => {



 
  return (
    <div className="days-data">
      <p className="days-data-day">{dayjs(dayData.dt_txt).format('dddd')}</p>
      <p>{dayjs(dayData.dt_txt).format('DD MMM')}</p>

      <p>
      {capitalize(dayData?.weather[0]?.description)}
      </p>
      
      <p>
        {Math.round(dayData?.main?.temp)}°C
      </p>
      <p>
      {dayData?.wind?.speed}km/hr
      </p>
    </div>
  );
};

export default DaysData;
