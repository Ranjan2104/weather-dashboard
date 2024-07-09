// Import necessary hooks and libraries
import React, { useEffect, useState } from "react";
import { farmerQuotes } from "../constants/FarmerQuotes"; // Import farmer quotes
import HourlyComponent from "./HourlyComponent"; // Import component to display hourly weather data
import axios from "axios"; // Import axios for making API requests
import DaysComponent from "./DaysComponent"; // Import component to display daily weather data
import { randomIndex } from "../constants/RandomQuote"; // Import function to get a random index for quotes
import { travelerQuotes } from "../constants/TravellerQuotes"; // Import traveler quotes

// Farmers component to display weather and quotes for farmers
const Farmers = ({ profile }) => {
  const api_key = import.meta.env.VITE_APP_API_KEY; // Get API key from environment variables
  const [city, setCity] = useState(""); // State to manage city input
  const [weatherData, setWeatherData] = useState([]); // State to store weather data
  const [loading, setLoading] = useState(false); // State to manage loading status

  // Function to fetch weather data from API
  const fetchData = async () => {
    setLoading(true);
    try {
      // Make API call to fetch weather data
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=metric`
      );
      const list = data?.list; // Extract weather data from response
      setWeatherData(list); // Set weather data in state
    } catch (err) {
      console.log("error in weather api", err.message);
      setWeatherData([]); // Clear weather data on error
    }
    setLoading(false);
  };

  // Event handler for input change
  const handleChange = (e) => {
    setCity(e.target.value); // Update city state with input value
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    fetchData(); // Fetch weather data
  };

  return (
    <div className="event-container">
      <div className="profile">
        <h2 className="profile-heading">Welcome, {profile}</h2>

        <div className="quote-container">
          {/* Form to input location */}
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

          {/* Display a random quote for farmers */}
          <div className="event-quote">"{farmerQuotes[randomIndex]}"</div>
        </div>
      </div>

      {/* Conditional rendering for loading state and weather data */}
      {loading ? (
        <div>Loading</div>
      ) : weatherData.length === 0 ? (
        <div>No Data</div>
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

export default Farmers;
