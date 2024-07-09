// Import necessary hooks and styles
import { useState } from "react";
import "./App.css";

// Import components for different profiles
import Farmers from "./components/Farmers";
import Travellers from "./components/Travellers";
import EventPlanners from "./components/EventPlanners";

// Data array containing profiles and their purposes
const profileData = [
  {
    id: 'qwe',
    profile: "Farmer",
    prupose: "Farming",
  },
  {
    id: 'cvbn',
    profile: "Traveller",
    prupose: "Travelling",
  },
  {
    id: 'iop',
    profile: "Event Planner",
    prupose: "Planning an event",
  },
];

// Main App component
function App() {
  // State to manage the selected profile
  const [profile, setProfile] = useState('Farmer');

  // Event handler to update the profile state when the select value changes
  const handleChange = (e) => {
    setProfile(e.target.value);
  }

  return (
    <div className="wrapper">
      <div className="container">
        <h1 className="question-heading">Are you</h1>
        {/* Dropdown select to choose profile */}
        <select 
          className="form-style" 
          name="profile" 
          id="profile" 
          onChange={handleChange} 
          defaultValue={'Farmer'}
        >
          {/* Map through profileData to create option elements */}
          {profileData.map((profile) => (
            <option key={profile.id} value={profile.profile}>
              {profile.prupose}
            </option>
          ))}
        </select>
      </div>

      {/* Conditional rendering of components based on the selected profile */}
      {profile === 'Farmer' && <Farmers profile={profile} />}
      {profile === 'Traveller' && <Travellers profile={profile} />}
      {profile === 'Event Planner' && <EventPlanners profile={profile} />}
    </div>
  );
}

export default App;
