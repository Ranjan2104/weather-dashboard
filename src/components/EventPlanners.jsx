// Import necessary hooks and libraries
import React, { useState } from "react";
import { eventPlannerQuotes } from "../constants/EventQuotes"; // Import event planner quotes
import HourlyComponent from "./HourlyComponent"; // Import component to display hourly weather data
import axios from "axios"; // Import axios for making API requests
import DaysComponent from "./DaysComponent"; // Import component to display daily weather data
import { randomIndex } from "../constants/RandomQuote"; // Import function to get a random index for quotes

// EventPlanners component to display weather and quotes for event planners
const EventPlanners = ({ profile }) => {
  const api_key = import.meta.env.VITE_APP_API_KEY; // Get API key from environment variables

  // State to manage input value for city
  const [city, setCity] = useState("Ajmer");
  const [weatherData, setWeatherData] = useState([]); // State to store weather data
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [eventType, setEventType] = useState("Indoor"); // State to manage the event type (Indoor/Outdoor)

  // Event handler to update city state with input value
  const handleChange = (e) => {
    setCity(e.target.value);
  };

  // Event handler to update eventType state with selected value
  const handleEventChange = (e) => {
    setEventType(e.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    fetchData(); // Fetch weather data
  };

  // Function to fetch weather data for the given city
  const fetchData = async () => {
    setLoading(true); // Set loading to true
    try {
      // Make API call to fetch weather data for the city using axios
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=metric`
      );
      const list = data?.list; // Extract weather data list from API response
      setWeatherData(list); // Set weather data in state
    } catch (err) {
      console.log("error in weather api", err.message);
      setWeatherData([]); // Clear weather data on error
    }
    setLoading(false); // Set loading to false
  };

  return (
    <div className="event-container">
      <div className="profile">
        <h2 className="profile-heading">Welcome, {profile}</h2>

        <div className="quote-container">
          <div className="location-container">
            <label className="location-label">
              Event Type
              {/* Dropdown to select event type (Indoor/Outdoor) */}
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
          {/* Display a random quote for event planners */}
          <div className="event-quote">"{eventPlannerQuotes[randomIndex]}"</div>
        </div>

        {/* Form to input city for outdoor events */}
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

      {/* Message for indoor events */}
      {eventType === "Indoor" && (
        <div className="inside-event-container">
          <p className="inside-event-message">
            You can enjoy the great indoors without the risk of sunburn,
            mosquitoes, or surprise rain showers. Plus, climate control means no
            one will have to guess if they need a sweater!
          </p>
        </div>
      )}

      {/* Conditional rendering for loading state and weather data */}
      {loading ? (
        <div>Loading...</div>
      ) : weatherData.length === 0 ? (
        eventType === "Outdoor" && <div>No Data Found</div>
      ) : (
        <>
          {/* Display hourly and daily weather data */}
          <HourlyComponent weatherData={weatherData} />
          <DaysComponent weatherData={weatherData} />
        </>
      )}
    </div>
  );
};

export default EventPlanners;
