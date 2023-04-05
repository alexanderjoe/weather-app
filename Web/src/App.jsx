import { createEffect, createSignal } from "solid-js";

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
    <div class="bg-slate-900 h-screen">
      <p class="text-center p-2 text-slate-200">Weather App</p>
      <div class="flex flex-row items-center justify-center mb-4">
        <input class='mr-1 ml-5' type="radio" id="byLatLong" checked='checked' name="weatherType" value="1" onChange={radioOnChange}/>
        <label class='text-slate-200' for="fahrenheit">Get Weather by Lat and Long</label>
        
        <input class='mr-1 ml-7 dark:text-white' type="radio" id="byLocation" name="weatherType" value="2" onChange={radioOnChange}/>
        <label class='text-slate-200' for="celsius">Get Weather by Location</label>
      </div>
      <div id='inputDiv'>
        {
          weatherType() == 1 && (
            <div>
              <p class="text-center text-slate-200 mb-4">Enter Lat and Long of desired location</p>
              <div class="flex flex-row items-center justify-center mb-4">
                <input class="mr-5 ml-5 w-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50" type="text" placeholder="Latitude" id="LatitudeInput" ></input>
                <input class="mr-5 w-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-5" type="text" placeholder="Longitude" id="LongitudeInput"></input>
              </div>
            </div>
          ) 
        }
        {
          weatherType() == 2 && (
            <div>
              <p class="text-center text-slate-200 mb-4">Enter Location of desired location</p>
              <div class="flex flex-row items-center justify-center mb-4">
                <input class="mr-5 ml-5 w-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50" type="text" placeholder="Location" id="LocationInput" ></input>
              </div>
            </div>
          )
        }
      </div>
      <div class="flex flex-col items-center justify-center">
        <button class="text-slate-200" onClick={getWeather}>Search</button>
      </div>
    </div>
  );
}

export default App;
