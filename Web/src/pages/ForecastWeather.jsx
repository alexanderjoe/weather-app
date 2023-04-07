import { createSignal } from "solid-js";
import LocationSearch from "../components/LocationSearch";
import weathercodes from "../lib/weathercodes.json";
import { convertToFixed, getWeatherIcon } from "../lib/weatherutils";

const ForecastWeather = () => {
    const [forecast, setForecast] = createSignal([]);
    const [times, setTimes] = createSignal([]);
    const [images, setImages] = createSignal([]);
    const [lat, setLat] = createSignal(0);
    const [lon, setLon] = createSignal(0);

    const handleLocationSelected = (lat, lon) => {
        setLat(lat);
        setLon(lon);
        handleSearch();
    }

    const handleSearch = () => {
        fetch(`http://localhost:3001/sevenDay?lat=${lat()}&lon=${lon()}`)
            .then((response) => response.json())
            .then((data) => {
                setForecast(data.daily);
                setTimes(data.daily.time);
                Promise.all(data.daily.weathercode.map(async (item) => {
                    const image = await getWeatherIcon(item);
                    setImages((images) => [...images, image]);
                }));
            });
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <LocationSearch onLocationSelected={handleLocationSelected} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                {times().map((item, idx) => (
                    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                        <div className="md:flex">
                            <div className="md:flex-shrink-0">
                                <img className="h-full w-full object-cover md:w-48" src={images()[idx]} alt="weather" />
                            </div>
                            <div className="p-8">
                                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{new Date(item * 1000).toLocaleDateString()}</div>
                                <div className="mt-2 text-indigo-400 text-sm uppercase">{weathercodes[forecast().weathercode[idx]]}</div>
                                <div className="mt-2 text-gray-500">High: {convertToFixed(forecast().temperature_2m_max[idx])}&deg;F</div>
                                <div className="mt-2 text-gray-500">Low: {convertToFixed(forecast().temperature_2m_min[idx])}&deg;F</div>
                                <div className="mt-2 text-gray-500">% Rain: {forecast().precipitation_probability_max[idx]}%</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ForecastWeather;