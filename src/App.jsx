import { useState } from "react";
import "./App.css";
import Farmers from "./components/Farmers";
import Travellers from "./components/Travellers";
import EventPlanners from "./components/EventPlanners";

const profileData = [
  {
    id:'qwe',
    profile: "Farmer",
    prupose: "Farming",
  },
  {
    id:'cvbn',
    profile: "Traveller",
    prupose: "Travelling",
  },
  {
    id:'iop',
    profile: "Event Planner",
    prupose: "Planning an event",
  },
];

function App() {
  const [profile,setProfile]=useState('Farmer');

  const handleChange=(e)=>{
    setProfile(e.target.value);
  }

  return (
    
      <div className="wrapper">
        <div className="container">
          <h1 className="question-heading">Are you</h1>
          <select className="form-style" name="profile" id="profile" onChange={handleChange} defaultValue={'Farmer'}>
            {
              profileData.map((profile)=>(
                <option key={profile.id} value={profile.profile}>
                  {profile.prupose}
                </option>
              ))
            }
          </select>
        </div>

        {
          profile==='Farmer' && <Farmers profile={profile}/>
        }
        {
          profile==='Traveller' && <Travellers profile={profile}/>
        }
        {
          profile==='Event Planner' && <EventPlanners profile={profile}/>
        }
      </div>
  
  );
}

export default App;
