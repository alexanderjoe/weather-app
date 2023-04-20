import { Route, Routes } from "@solidjs/router";
import { createSignal } from "solid-js";
import Error from "./components/Error";
import Navbar from "./components/Navbar";
import CurrentWeather from "./pages/CurrentWeather";
import ForecastWeather from "./pages/ForecastWeather";
import LoginPage from "./pages/LoginPage";

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
          <Route path="/current" component={CurrentWeather} />
          <Route path="/forecast" component={ForecastWeather} />
          <Route path="/" component={LoginPage} />
          <Route path="*" component={Error} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
