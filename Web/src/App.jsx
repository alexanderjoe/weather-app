import { createEffect, createSignal } from "solid-js";
import Weather from "./components/Weather";
import Error from "./components/Error";
import LocationInput from "./components/LocationInput";
import Navbar from "./components/Navbar";
import { Routes, Route } from "@solidjs/router";

//get input values
const getWeather = () => {
  if (weatherType() == 1) {
    const lat = document.getElementById("LatitudeInput").value;
    const long = document.getElementById("LongitudeInput").value;
    console.log(lat, long);
  } else if (weatherType() == 2) {
    const location = document.getElementById("LocationInput").value;
    console.log(location);
  }

};

const radioOnChange = (e) => {
  setWeatherType(e.target.value);
}

//create a use state for the weather type
const [weatherType, setWeatherType] = createSignal(1);

function App() {
  return (
    <div class="bg-slate-900 min-h-screen">
      <div>
        <Navbar />
      </div>
      <div>
          <Routes>
            <Route path="/" component={LocationInput}/>
            <Route path="/forecast" component={Weather}/>
            <Route path="*" component={Error}/>

          </Routes>
      </div>
    </div>
  );
}

export default App;
