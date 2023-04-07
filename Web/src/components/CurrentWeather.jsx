import { createEffect, createSignal } from "solid-js"
import LocationSearch from "./LocationSearch"

const CurrentWeather = () => {

    const [lat, setLat] = createSignal(100)
    const [lon, setLon] = createSignal(200)

    const [weather, setWeather] = createSignal({
        temp: 0,
        windspd: 0,
        winddir: 0,
        weathercode: 0,
        is_day: 0,
    })

    const convertToFeirnheit = (temp) => {
        return (temp * 9/5) + 32
    }

    const handleLocationSelected = (lat, lon) => {
        setLat(lat)
        setLon(lon)
    }

    const fetchWeather = async (lat, lon) => {
        fetch(`http://localhost:3001/current?lat=${lat}&lon=${lon}`)
            .then((response) => response.json())
            .then((data) => {
                setWeather({temp: convertToFeirnheit(data.current_weather.temperature).toFixed(2), windspd: data.current_weather.windspeed, winddir: data.current_weather.winddirection, weathercode: data.current_weather.weathercode, is_day: data.current_weather.is_day})
            })
    }

    createEffect(() => {
        if (lat() > 90 || lat < -90 || lon() > 180 || lon() < -180) return
        fetchWeather(lat(), lon())
    }, [setLat, setLon])

    const checkTimeOfDay = () => {
        if (weather().is_day === 1) {
            return "Day"
        } else {
            return "Night"
        }
    }




    return (
        <>
            <LocationSearch onLocationSelected={handleLocationSelected}/>
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-l mt-2">
                        <div className="md:flex">
                            <div className="md:flex-shrink-0">
                                <img className="h-48 w-full object-cover md:w-48 mt-8 ml-3" src={"https://static.vecteezy.com/system/resources/thumbnails/009/664/902/small/dark-cloud-raining-free-free-png.png"} alt="weather" />
                            </div>
                            <div className="p-8">
                                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold"></div>
                                <div className="mt-2 text-indigo-400 text-sm uppercase">{weather().temp}&deg;F</div>
                                <div className="mt-2 text-gray-500">Wind Speed: {weather().windspd}</div>
                                <div className="mt-2 text-gray-500">Sunset: {weather().windspd}</div>
                                <div className="mt-2 text-gray-500">Wind Direction: {weather().winddir}</div>
                                <div className="mt-2 text-gray-500">Weather Code: {weather().weathercode}</div>
                                <div className="mt-2 text-gray-500">Time of Day: {checkTimeOfDay}</div>
                            </div>
                        </div>
                    </div>
        </>
    )

}

export default CurrentWeather