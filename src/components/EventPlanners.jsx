import React, { useState } from "react";
import { eventPlannerQuotes } from "../constants/EventQuotes";
import HourlyComponent from "./HourlyComponent";
import axios from "axios";
import DaysComponent from "./DaysComponent";
import { randomIndex } from "../constants/RandomQuote";

const EventPlanners = ({ profile }) => {
  const api_key = import.meta.env.VITE_APP_API_KEY;

  const [city, setCity] = useState("Ajmer");
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventType, setEventType] = useState("Indoor");

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleEventChange = (e) => {
    setEventType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

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

  return (
    <div className="event-container">
      <div className="profile">
        <h2 className="profile-heading">Welcome, {profile}</h2>

        <div className="quote-container">
          <div className="location-container">
            <label className="location-label">
              Event Type

              <select
                className="form-style event-type"
                name="eventType"
                id="eventType"
                defaultValue={"Inside"}
                onChange={handleEventChange}
              >
                <option value={"Indoor"}>Indoor Events</option>
                <option value={"Outdoor"}>Outdoor Events</option>
              </select>
            </label>
          </div>
          <div className="event-quote">"{eventPlannerQuotes[randomIndex]}"</div>
        </div>

        {eventType === "Outdoor" && (
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
        )}
      </div>

      {eventType === "Indoor" && (
        <div className="inside-event-container">
          <p className="inside-event-message">
            You can enjoy the great indoors without the risk of sunburn,
            mosquitoes, or surprise rain showers. Plus, climate control means no
            one will have to guess if they need a sweater!
          </p>
        </div>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : weatherData.length === 0 ? (
        eventType === "Outdoor" && <div>No Data Found</div>
      ) : (
        <>
          <HourlyComponent weatherData={weatherData} />

          <DaysComponent weatherData={weatherData} />
        </>
      )}
    </div>
  );
};

export default EventPlanners;
