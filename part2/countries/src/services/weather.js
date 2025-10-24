import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const api_key = import.meta.env.VITE_WEATHER_KEY;
console.log("API KEY:", import.meta.env.VITE_WEATHER_KEY);

const getWeather = (capital) => {
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${api_key}`;
    return axios.get(geoUrl)
        .then(response => {
            const { lat, lon } = response.data[0];
            const weatherUrl = `${baseUrl}?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${api_key}`;
            return axios.get(weatherUrl);
        })
        .then(response => response.data);
};

export default { getWeather };
