import { useState } from 'react';
import './App.css';
import {WEATHER_API_URL, WEATHER_API_KEY } from './components/api';
import CurrenWeather from './components/current-weather/current-weather';
import Search from './components/search/search';

function App() {

  const [currenWeather, setCurrenWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) =>{
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`);

    const forecastWeatherFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`);

    Promise.all([currentWeatherFetch,forecastWeatherFetch])
      .then(async(response)=>{
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrenWeather({city: searchData.label, ...weatherResponse});
        setForecast({city: searchData.label, ...forecastResponse});
      })
      .catch((err)=> console.log(err));
  };
  console.log(currenWeather);
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currenWeather && <CurrenWeather data={currenWeather} />}
    </div>
  );
}

export default App;
