import React, { useEffect, useState } from "react";
import { farmerQuotes } from "../constants/FarmerQuotes";
import HourlyComponent from "./HourlyComponent";
import axios from "axios";
import DaysComponent from "./DaysComponent";
import { randomIndex } from "../constants/RandomQuote";
import { travelerQuotes } from "../constants/TravellerQuotes";

const Farmers = ({ profile }) => {
  const api_key = import.meta.env.VITE_APP_API_KEY;
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=metric`
      );
      const list = data?.list;
      setWeatherData(list);
    } catch (err) {
      console.log("error in weather api", err.message);
      setWeatherData([]);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };
  return (
    <div className="event-container">
      <div className="profile">
        <h2 className="profile-heading">Welcome, {profile}</h2>

        <div className="quote-container">
          <form className="farmer-form" onSubmit={handleSubmit}>
            <label className="location-label">
              Location
              <input
                placeholder="Enter a Location"
                type="text"
                name="city"
                id="city"
                className="location"
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit" className="srch-btn">
              Search
            </button>
          </form>

          <div className="event-quote">"{farmerQuotes[randomIndex]}"</div>
        </div>
      </div>

      {loading ? (
        <div>Loading</div>
      ) : weatherData.length === 0 ? (
        <div>No Data</div>
      ) : (
        <>
          {" "}
          <HourlyComponent weatherData={weatherData} />
          <DaysComponent weatherData={weatherData} />
        </>
      )}
    </div>
  );
};

export default Farmers;
