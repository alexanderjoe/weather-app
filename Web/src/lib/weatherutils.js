import weathercodes from './weathercodes.json';

export const convertToFeirnheit = (temp) => {
    return (temp * 9 / 5) + 32;
}

export const convertToFixed = (temp) => {
    return convertToFeirnheit(temp).toFixed(2);
}

export const getWeatherIcon = async (weathercode) => {
    const desc = weathercodes[weathercode];
    try {
        const response = await fetch(`http://localhost:3001/gif?desc=${encodeURIComponent(desc)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getWeatherDesc = (weathercode) => {
    return weathercodes[weathercode];
}

export const checkTimeOfDay = (weather) => {
    if (weather.is_day === 1) {
        return "Day";
    } else {
        return "Night";
    }
}