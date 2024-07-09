import React, {  useState } from "react";
import { travelerQuotes } from "../constants/TravellerQuotes";
import HourlyComponent from "./HourlyComponent";
import axios from "axios";
import DaysComponent from "./DaysComponent";
import { randomIndex } from "../constants/RandomQuote";

const Travellers = ({ profile }) => {
  const api_key = import.meta.env.VITE_APP_API_KEY;

  const [cities, setCities] = useState({
    source: "",
    final: "",
  });

  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationData, setLocationData] = useState("Source");

  const handleSource = () => {
    setLocationData("Source");
  };

  const handleChange = (e) => {
    setCities((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFinal = () => {
    setLocationData("Final");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resp1, resp2] = await Promise.all([
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cities.source}&appid=${api_key}&units=metric`
        ),
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cities.final}&appid=${api_key}&units=metric`
        ),
      ]);

      const sourceData = resp1.data?.list;
      const finalData = resp2.data?.list;

   

      setWeatherData([{ source: sourceData, final: finalData }]);
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
          <div className="event-quote">"{travelerQuotes[randomIndex]}"</div>
        </div>
      </div>

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

      {loading ? (
        <div>Loading...</div>
      ) : weatherData.length === 0 ? (
        <div>No Data Found!</div>
      ) : (
        <>
          {" "}
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
