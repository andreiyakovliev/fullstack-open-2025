import { useState, useEffect } from "react";
import weatherService from "../services/weather";

const CountryDetails = ({ country }) => {
   const [weather, setWeather] = useState(null);

   useEffect(() => {
      if (country.capital && country.capital.length > 0) {
         weatherService.getWeather(country.capital[0])
            .then(data => setWeather(data))
            .catch(err => console.error(err));
      }
   }, [country]);

   return (
      <div>
         <h2>{country.name.common}</h2>
         <p>Capital: {country.capital}</p>
         <p>Area: {country.area}</p>

         <h3>Languages</h3>
         <ul>
            {Object.values(country.languages || {}).map(lang => (
               <li key={lang}>{lang}</li>
            ))}
         </ul>

         <img
            src={`https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`}
            alt={`Flag of ${country.name.common}`}
            width="120"
         />

         {weather && weather.main && (
            <div>
               <h3>Weather in {country.capital[0]}</h3>
               <p>Temperature {weather.main.temp} °C</p>
               <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
               />
               <p>Wind {weather.wind.speed} m/s</p>
            </div>
         )}

      </div>
   );
};

export default CountryDetails;
