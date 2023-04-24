import { Route, Routes, useLocation } from "@solidjs/router";
import { createSignal } from "solid-js";
import Error from "./components/Error";
import Navbar from "./components/Navbar";
import CurrentWeather from "./pages/CurrentWeather";
import ForecastWeather from "./pages/ForecastWeather";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const location = useLocation();


  return (
    <div class="bg-slate-900 min-h-screen">
      {!(location.pathname === "/" || location.pathname === "/register") && (
        <div>
          <Navbar />
        </div>
      )}
      <div>
        <Routes>
          <Route path="/current" component={CurrentWeather} />
          <Route path="/forecast" component={ForecastWeather} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/" component={LoginPage} />
          <Route path="*" component={Error} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
