import { createSignal } from "solid-js";
import LocationSearch from "../components/LocationSearch";
import { checkTimeOfDay, convertToFeirnheit, getWeatherDesc, getWeatherIcon } from "../lib/weatherutils";

const CurrentWeather = () => {
    const [image, setImage] = createSignal("");
    const [ready, setReady] = createSignal(false);

    const [weather, setWeather] = createSignal({
        temp: 0,
        windspd: 0,
        winddir: 0,
        weathercode: 0,
        is_day: 0,
    });

    const handleLocationSelected = (lat, lon) => {
        if (lat > 90 || lat < -90 || lon > 180 || lon < -180) return;
        fetchWeather(lat, lon);
    }

    const fetchWeather = async (lat, lon) => {
        fetch(`http://localhost:3001/current?lat=${lat}&lon=${lon}`)
            .then((response) => response.json())
            .then((data) => {
                setWeather({ temp: convertToFeirnheit(data.current_weather.temperature).toFixed(2), windspd: data.current_weather.windspeed, winddir: data.current_weather.winddirection, weathercode: data.current_weather.weathercode, is_day: data.current_weather.is_day })
            });
        setImage(await getWeatherIcon(weather().weathercode));
        setReady(true);
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <LocationSearch onLocationSelected={handleLocationSelected} />
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-l mt-2">
                {ready() && (
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            <img className="h-full w-full object-cover md:w-48" src={image()} alt="weather" />
                        </div>
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Temp: {weather().temp}&deg;F</div>
                            <div className="mt-2 text-indigo-400 text-sm uppercase">{getWeatherDesc(weather().weathercode)}</div>
                            <div className="mt-2 text-gray-500">Wind Speed: {weather().windspd}</div>
                            <div className="mt-2 text-gray-500">Sunset: {weather().windspd}</div>
                            <div className="mt-2 text-gray-500">Wind Direction: {weather().winddir}</div>
                            <div className="mt-2 text-gray-500">Time of Day: {checkTimeOfDay(weather())}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CurrentWeather;