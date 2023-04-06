import { createEffect, createSignal } from "solid-js";
import LocationSearch from "./LocationSearch";

const Weather = () => {
    const [location, setLocation] = createSignal("");
    const [forecast, setForecast] = createSignal([]);
    const [lat, setLat] = createSignal(0);
    const [lon, setLon] = createSignal(0);

    const handleLocationSelected = (lat, lon) => {
        setLat(lat);
        setLon(lon);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        let part = "minutely,hourly,alerts";

        // fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat()}&lon=${lon()}&exclude=${part}&appid=API_KEY`)
        // .then((res) => res.json())
        // .then((data) => {
        //     console.log(data)
        //     setWeather(data);
        //     setForecast(data.daily);
        // });
    };

    createEffect(() => {
        // this is just temporary, using static data from a previous fetch
        const res = { "lat": 40, "lon": -79, "timezone": "America/New_York", "timezone_offset": -14400, "current": { "dt": 1680666639, "sunrise": 1680605724, "sunset": 1680651738, "temp": 56.17, "feels_like": 55.2, "pressure": 1018, "humidity": 79, "dew_point": 49.77, "uvi": 0, "clouds": 0, "visibility": 10000, "wind_speed": 8.05, "wind_deg": 200, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }] }, "daily": [{ "dt": 1680627600, "sunrise": 1680605724, "sunset": 1680651738, "moonrise": 1680646860, "moonset": 1680604020, "moon_phase": 0.45, "temp": { "day": 61.86, "min": 45.16, "max": 68.27, "night": 56.16, "eve": 63.07, "morn": 45.16 }, "feels_like": { "day": 60.89, "night": 55.27, "eve": 62.69, "morn": 41.67 }, "pressure": 1015, "humidity": 67, "dew_point": 51.19, "wind_speed": 12.82, "wind_deg": 244, "wind_gust": 32.91, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "clouds": 75, "pop": 0.36, "uvi": 4.14 }, { "dt": 1680714000, "sunrise": 1680692028, "sunset": 1680738199, "moonrise": 1680737100, "moonset": 1680691680, "moon_phase": 0.48, "temp": { "day": 74.73, "min": 53.96, "max": 75.67, "night": 62.28, "eve": 69.4, "morn": 53.96 }, "feels_like": { "day": 74.44, "night": 62.06, "eve": 69.15, "morn": 53.33 }, "pressure": 1017, "humidity": 54, "dew_point": 57.54, "wind_speed": 14.97, "wind_deg": 214, "wind_gust": 32.7, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "clouds": 92, "pop": 0.68, "rain": 1.38, "uvi": 2.9 }, { "dt": 1680800400, "sunrise": 1680778333, "sunset": 1680824659, "moonrise": 1680827400, "moonset": 1680779400, "moon_phase": 0.5, "temp": { "day": 51.33, "min": 40.48, "max": 63.88, "night": 40.48, "eve": 45.81, "morn": 56.8 }, "feels_like": { "day": 50.49, "night": 35.53, "eve": 39.15, "morn": 56.75 }, "pressure": 1023, "humidity": 92, "dew_point": 49.44, "wind_speed": 17.72, "wind_deg": 244, "wind_gust": 37.83, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "clouds": 100, "pop": 0.92, "rain": 2.32, "uvi": 1.97 }, { "dt": 1680886800, "sunrise": 1680864638, "sunset": 1680911119, "moonrise": 1680917880, "moonset": 1680867240, "moon_phase": 0.55, "temp": { "day": 46.36, "min": 32.41, "max": 46.45, "night": 39.63, "eve": 40.5, "morn": 32.41 }, "feels_like": { "day": 41.81, "night": 39.63, "eve": 40.5, "morn": 28.58 }, "pressure": 1031, "humidity": 36, "dew_point": 20.89, "wind_speed": 9.26, "wind_deg": 335, "wind_gust": 21.97, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "clouds": 100, "pop": 0, "uvi": 6.72 }, { "dt": 1680973200, "sunrise": 1680950943, "sunset": 1680997580, "moonrise": 1681008480, "moonset": 1680955200, "moon_phase": 0.58, "temp": { "day": 51.55, "min": 36.7, "max": 52.2, "night": 41.79, "eve": 42.96, "morn": 37.9 }, "feels_like": { "day": 48.56, "night": 38.07, "eve": 37.99, "morn": 35.47 }, "pressure": 1028, "humidity": 46, "dew_point": 31.68, "wind_speed": 8.43, "wind_deg": 12, "wind_gust": 18.81, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "clouds": 100, "pop": 0, "uvi": 4.93 }, { "dt": 1681059600, "sunrise": 1681037249, "sunset": 1681084040, "moonrise": 1681099200, "moonset": 1681043520, "moon_phase": 0.62, "temp": { "day": 54.05, "min": 34.43, "max": 55.76, "night": 41.11, "eve": 45.82, "morn": 37.08 }, "feels_like": { "day": 51.03, "night": 39.02, "eve": 45.82, "morn": 37.08 }, "pressure": 1030, "humidity": 40, "dew_point": 30.38, "wind_speed": 3.94, "wind_deg": 34, "wind_gust": 3.85, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "clouds": 3, "pop": 0, "uvi": 0.35 }, { "dt": 1681146000, "sunrise": 1681123556, "sunset": 1681170501, "moonrise": 0, "moonset": 1681132380, "moon_phase": 0.65, "temp": { "day": 59.54, "min": 38.19, "max": 60.62, "night": 45.97, "eve": 49.78, "morn": 41.49 }, "feels_like": { "day": 57.13, "night": 43.16, "eve": 47.91, "morn": 38.57 }, "pressure": 1027, "humidity": 41, "dew_point": 36.34, "wind_speed": 11.1, "wind_deg": 267, "wind_gust": 14.56, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "clouds": 80, "pop": 0, "uvi": 1 }, { "dt": 1681232400, "sunrise": 1681209863, "sunset": 1681256961, "moonrise": 1681189860, "moonset": 1681221780, "moon_phase": 0.69, "temp": { "day": 61.48, "min": 41.81, "max": 62.42, "night": 49.89, "eve": 52.16, "morn": 44.67 }, "feels_like": { "day": 59.49, "night": 46.29, "eve": 50.5, "morn": 41.41 }, "pressure": 1023, "humidity": 46, "dew_point": 40.44, "wind_speed": 13.38, "wind_deg": 259, "wind_gust": 29.75, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "clouds": 80, "pop": 0, "uvi": 1 }] };
        setForecast(res.daily)
    })

    return (
        <div className="flex flex-col items-center justify-center">
            <LocationSearch onLocationSelected={handleLocationSelected} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                {forecast().map((item) => (
                    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                        <div className="md:flex">
                            <div className="md:flex-shrink-0">
                                <img className="h-48 w-full object-cover md:w-48" src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`} alt="weather" />
                            </div>
                            <div className="p-8">
                                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{new Date(item.dt * 1000).toLocaleDateString()}</div>
                                <div className="mt-2 text-indigo-400 text-sm uppercase">{item.weather[0].description}</div>
                                <div className="mt-2 text-gray-500">Sunrise: {new Date(item.sunrise * 1000).toLocaleTimeString()}</div>
                                <div className="mt-2 text-gray-500">Sunset: {new Date(item.sunset * 1000).toLocaleTimeString()}</div>
                                <div className="mt-2 text-gray-500">High: {item.temp.max}&deg;F</div>
                                <div className="mt-2 text-gray-500">Low: {item.temp.min}&deg;F</div>
                                <div className="mt-2 text-gray-500">Day: {item.temp.day}&deg;F</div>
                            </div>
                        </div>
                    </div>
                    // <div key={item.dt} className="bg-white p-4 rounded-lg shadow-lg">
                    //     <p className="font-bold">{new Date(item.dt * 1000).toLocaleDateString()}</p>
                    //     <p className="text-gray-500">Sunrise: {new Date(item.sunrise * 1000).toLocaleTimeString()}</p>
                    //     <p className="text-gray-500">Sunset: {new Date(item.sunset * 1000).toLocaleTimeString()}</p>
                    //     <div className="flex items-center justify-center">
                    //         {/* <img
                    //             src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                    //             alt={item.weather[0].description}
                    //             className="w-12 h-12 mr-4"
                    //         /> */}
                    //         <div>
                    //             <p>{item.weather[0].description}</p>
                    //             <p className="font-bold">Morning: {item.temp.morn}°F</p>
                    //             <p className="font-bold">Day: {item.temp.day}°F</p>
                    //             <p className="font-bold">Night: {item.temp.night}°F</p>

                    //         </div>
                    //     </div>
                    // </div>
                ))}
            </div>
        </div>
    );
}

export default Weather;