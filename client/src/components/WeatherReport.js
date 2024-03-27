import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext'
import styled from 'styled-components';

const WeatherReport = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [error, setError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [weatherData, setWeatherData] = useState();

  const weatherDataHandler = async () => {
    setIsFetching(true);
    try {
      const weatherReportResponse = await fetch(`/weather/report/${currentUser._id}`);
      const weatherReportData = await weatherReportResponse.json();

      if (!weatherReportResponse.ok) {
        throw new Error('Failed to fetch the data.')
      }

      setWeatherData(weatherReportData);
      setIsFetching(false);
      return weatherReportData;

    } catch (error) {
      setError({ message: error.message || 'Failed to fetch the data.' });
    }
  }


  return (
    <div>

      <div>
        <h1>Weather Report</h1>
      </div>

      <div>
        <div>
          <h2>Get your Weather report.</h2>
          <button onClick={weatherDataHandler}>Click here</button>
        </div>
      </div>

      {weatherData
        ? <div>
          <div>
            <ul>
              <li><p>{weatherData.status}</p></li>
              <li><p>{weatherData.message}</p></li>
              <li><p>{weatherData.data[0].base}</p></li>
              <li><p>{weatherData.data[0].clouds.all}</p></li>
              <li><p>{weatherData.data[0].cod}</p></li>
              <li><p>{weatherData.data[0].coord.lat}</p></li>
              <li><p>{weatherData.data[0].coord.lon}</p></li>
              <li><p>{weatherData.data[0].currentUser.fullName}</p></li>
              <li><p>{weatherData.data[0].currentUser.userName}</p></li>
              <li><p>{weatherData.data[0].currentUser._id}</p></li>
              <li><p>{weatherData.data[0].dt}</p></li>
              <li><p>{weatherData.data[0].id}</p></li>
              <li><p>{weatherData.data[0].language}</p></li>
              <li><p>{weatherData.data[0].main.feels_like}</p></li>
              <li><p>{weatherData.data[0].main.humidity}</p></li>
              <li><p>{weatherData.data[0].main.pressure}</p></li>
              <li><p>{weatherData.data[0].main.temp}</p></li>
              <li><p>{weatherData.data[0].main.temp_max}</p></li>
              <li><p>{weatherData.data[0].main.temp_min}</p></li>
              <li><p>{weatherData.data[0].name}</p></li>

              <li><p>{weatherData.data[0].timezone}</p></li>
              <li><p>{weatherData.data[0].sys.country}</p></li>
              <li><p>{weatherData.data[0].sys.id}</p></li>
              <li><p>{weatherData.data[0].sys.sunrise}</p></li>
              <li><p>{weatherData.data[0].sys.sunset}</p></li>
              <li><p>{weatherData.data[0].sys.type}</p></li>
              <li><p>{weatherData.data[0].timezone}</p></li>
              <li><p>{weatherData.data[0].unitOfMeasure}</p></li>
              <li><p>{weatherData.data[0].visibility}</p></li>
              <li><p>{weatherData.data[0].weather[0].description}</p></li>
              <li><p>{weatherData.data[0].weather[0].icon}</p></li>
              <li><p>{weatherData.data[0].weather[0].id}</p></li>
              <li><p>{weatherData.data[0].weather[0].main}</p></li>
              <li><p>{weatherData.data[0].wind.deg}</p></li>
              <li><p>{weatherData.data[0].wind.gust}</p></li>
              <li><p>{weatherData.data[0].wind.speed}</p></li>
              <li><p>{weatherData.data[0]._id}</p></li>
              <li><p>{weatherData.data[0].message}</p></li>
              <li><p>{weatherData.data[0].status}</p></li>
            </ul>
          </div>
        </div>
        : null}

    </div>
  )
}

export default WeatherReport