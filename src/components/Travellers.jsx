// Import necessary hooks and libraries
import React, { useState } from "react";
import { travelerQuotes } from "../constants/TravellerQuotes"; // Import traveler quotes
import HourlyComponent from "./HourlyComponent"; // Import component to display hourly weather data
import axios from "axios"; // Import axios for making API requests
import DaysComponent from "./DaysComponent"; // Import component to display daily weather data
import { randomIndex } from "../constants/RandomQuote"; // Import function to get a random index for quotes

// Travellers component to display weather and quotes for travelers
const Travellers = ({ profile }) => {
  const api_key = import.meta.env.VITE_APP_API_KEY; // Get API key from environment variables

  // State to manage input values for source and final locations
  const [cities, setCities] = useState({
    source: "",
    final: "",
  });

  const [weatherData, setWeatherData] = useState([]); // State to store weather data
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [locationData, setLocationData] = useState("Source"); // State to manage the current selected location (source or final)

  // Event handler to set locationData to "Source"
  const handleSource = () => {
    setLocationData("Source");
  };

  // Event handler to update cities state with input values
  const handleChange = (e) => {
    setCities((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Event handler to set locationData to "Final"
  const handleFinal = () => {
    setLocationData("Final");
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    fetchData(); // Fetch weather data
  };

  // Function to fetch weather data for source and final locations
  const fetchData = async () => {
    setLoading(true); // Set loading to true
    try {
      // Make API calls to fetch weather data for source and final locations
      const [resp1, resp2] = await Promise.all([
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cities.source}&appid=${api_key}&units=metric`
        ),
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cities.final}&appid=${api_key}&units=metric`
        ),
      ]);

      const sourceData = resp1.data?.list; // Extract weather data for source location
      const finalData = resp2.data?.list; // Extract weather data for final location

      // Set weather data for source and final locations in state
      setWeatherData([{ source: sourceData, final: finalData }]);
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
          {/* Form to input source and final locations */}
          <form className="farmer-form" onSubmit={handleSubmit}>
            <div className="source-final-locations-container">
              <label className="location-label">
                Source Location
                <input
                  placeholder="Enter Source Location"
                  type="text"
                  name="source"
                  id="source"
                  className="location"
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="location-label">
                Final Location
                <input
                  placeholder="Enter Final Location"
                  type="text"
                  name="final"
                  id="final"
                  className="location"
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <button type="submit" className="srch-btn">
              Search
            </button>
          </form>
          {/* Display a random quote for travelers */}
          <div className="event-quote">"{travelerQuotes[randomIndex]}"</div>
        </div>
      </div>

      {/* Tabs to switch between source and final location weather data */}
      <div className="location-tab-container">
        <button
          className={`${
            locationData === "Source" ? "selected-location-tab" : "location-tab"
          }`}
          onClick={handleSource}
        >
          Source
        </button>
        <button
          className={`${
            locationData === "Final" ? "selected-location-tab" : "location-tab"
          }`}
          onClick={handleFinal}
        >
          Final
        </button>
      </div>

      {/* Conditional rendering for loading state and weather data */}
      {loading ? (
        <div>Loading...</div>
      ) : weatherData.length === 0 ? (
        <div>No Data Found!</div>
      ) : (
        <>
          {/* Display hourly and daily weather data for the selected location */}
          <HourlyComponent
            weatherData={
              locationData === "Source"
                ? weatherData[0].source
                : weatherData[0].final
            }
            cityName={locationData === "Source" ? cities.source : cities.final}
          />
          <DaysComponent
            weatherData={
              locationData === "Source"
                ? weatherData[0].source
                : weatherData[0].final
            }
          />
        </>
      )}
    </div>
  );
};

export default Travellers;
