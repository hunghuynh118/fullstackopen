import axios from 'axios';
import { useEffect, useState } from 'react';

const Weather = ({ city }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState('');

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
      )
      .then(response => {
        setWeather(response.data);
      });
  }, []);

  if (weather)
    return (
      <div>
        <h3>Weather in {city}</h3>
        <p>temperature {weather.main.temp} Celcius</p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    );
};

export default Weather;
