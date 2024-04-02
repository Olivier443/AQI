import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext'
import styled from 'styled-components';

const WeatherReport = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [error, setError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [weatherData, setWeatherData] = useState();
  const [isDeleted, setIsDeleted] = useState();

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

  // User wants to delete one of the records he saved
  const deleteWeatherRecord = (_, index, weatherReportData) => {
    const dataToDelete = weatherData.data[index];
    const weatherDataId = dataToDelete._id;

    fetch(`/weather/report/del/${weatherDataId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then((res) => res.json())
    .then((jsonData) => {
      if (jsonData.status === 200) {
        setIsDeleted(`Weather record Id = ${weatherDataId} successfullly deleted.`);
        setTimeout(() => {
          setIsDeleted(null);
          weatherDataHandler();
        }, 2000)
      }
    })
  }

  return (
    <DivPage>

      <DivTitle>
        <h1>Weather Report</h1>
      </DivTitle>

      <div>
        {isDeleted ? <Pconf>{isDeleted}</Pconf> : null}
      </div>

        <DivButton>
          <h2>Get your Weather report.</h2>
          <Button onClick={weatherDataHandler}>Click here</Button>
        </DivButton>

      {(weatherData && weatherData.data.length > 0)
        ? (
          <div>
            <DivReportCntr>
              <Ul>
                <li><Span>Staus: </Span>{weatherData.status}</li>
                <li><Span>Message: </Span>{weatherData.message}</li>
              </Ul>
            </DivReportCntr>
            <DivMap>
              {weatherData.data.map((aData, index) => (
                <DivReportCntr>
                  <Ul key={index}>
                    <li><Btn onClick={() => { window.confirm( 'Are you sure you want to delete this Weather record? If deleted, you won\'t get it back.') && deleteWeatherRecord(weatherData.data, index) }}>Delete this record</Btn></li>
                    <Li><p><Span>Base: </Span>{aData.base}</p></Li>
                    <Li><p><Span>Get Date (or day): </Span>{`${(new Date(aData.dt * 1000)).getDate()}`}</p></Li>
                    <Li><p><Span>Get Month: </Span>{`${(new Date(aData.dt * 1000)).getMonth() + 1}`}</p></Li>
                    <Li><p><Span>Get Year: </Span>{`${(new Date(aData.dt * 1000)).getFullYear()}`}</p></Li>
                    <Li><p><Span>Clouds: </Span>{aData.clouds.all}</p></Li>
                    <Li><p><Span>Latitude: </Span>{aData.coord.lat}</p></Li>
                    <Li><p><Span>Longitude: </Span>{aData.coord.lon}</p></Li>
                    <Li><p><Span>Full Name: </Span>{aData.currentUser.fullName}</p></Li>
                    <Li><p><Span>Username: </Span>{aData.currentUser.userName}</p></Li>
                    <Li><p><Span>At the time of: </Span>{`${new Date(aData.dt * 1000)}`}</p></Li>
                    <Li><p><Span>Language: </Span>{aData.language}</p></Li>
                    <Li><p><Span>Feels like: </Span>{aData.main.feels_like}</p></Li>
                    <Li><p><Span>Humidity: </Span>{aData.main.humidity}</p></Li>
                    <Li><p><Span>Pressure: </Span>{aData.main.pressure}</p></Li>
                    <Li><p><Span>Temperature: </Span>{aData.main.temp}</p></Li>
                    <Li><p><Span>Temperature Max: </Span>{aData.main.temp_max}</p></Li>
                    <Li><p><Span>Temperature Min: </Span>{aData.main.temp_min}</p></Li>
                    <Li><p><Span>City: </Span>{aData.name}</p></Li>
                    <Li><p><Span>Country: </Span>{aData.sys.country}</p></Li>
                    <Li><p><Span>Sunrise: </Span>{`${new Date(aData.sys.sunrise * 1000)}`}</p></Li>
                    <Li><p><Span>Sunset: </Span>{`${new Date(aData.sys.sunset * 1000)}`}</p></Li>
                    <Li><p><Span>Type: </Span>{aData.sys.type}</p></Li>
                    <Li><p><Span>Timezone: </Span>{aData.timezone}</p></Li>
                    <Li><p><Span>Unit of measure: </Span>{aData.unitOfMeasure}</p></Li>
                    <Li><p><Span>Visibility: </Span>{aData.visibility}</p></Li>
                    <Li><p><Span>Description: </Span>{aData.weather[0].description}</p></Li>
                    <Li><p><Span>Main: </Span>{aData.weather[0].main}</p></Li>
                    <Li><p><Span>Wind Deg: </Span>{aData.wind.deg}</p></Li>
                    <Li><p><Span>Wind Gust: </Span>{aData.wind.gust}</p></Li>
                    <Li><p><Span>Wind Speed: </Span>{aData.wind.speed}</p></Li>
                    <Li><p><Span>Id: </Span>{aData._id}</p></Li>
                  </Ul>
                </DivReportCntr>
              ))}
            </DivMap>
          </div>
        )
        : (
          null
        )}
    </DivPage>
  )
}

export default WeatherReport

const DivPage = styled.div`
background: #6DD5FA;
margin: -0.4vh 0 0 0;
min-height: 72.4vh;
`

const DivTitle = styled.div`
padding: 2vh 0 0 2vw;
`

const Pconf = styled.p`
font-weight: bold;
background: green;
justify-content: center;
align-items: center;
display: flex;
padding: 1vh 1vw 1vh 1vw;
border-radius: 4px;
min-height: 4vh;
max-width: 18vw;
border-style: dashed solid;
margin: 0 0 0 2vw;
`

const DivButton = styled.div`
padding: 0 0 2vh 2vw;
`

const Button = styled.button`
border-radius: 6px;
`

const DivMap = styled.div`
display: flex;
`

const DivReportCntr = styled.div`
border: solid black 1px;
margin: 0 0 2vh 2vw;
width: 21vw;
box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
padding: 0 0 0 2vw;
border-radius: 8px;
background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9);
`

const Ul = styled.ul`
list-style-type: none;
`

const Li = styled.li`
box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9);
padding: 0 1vw 0 1vw;
width: 17vw;
border-radius: 2px;

  :hover { background: yellow; }
`

const Btn = styled.button`
border-radius: 8px;
pointer: cursor;
padding: 0.2vh 0.2vw 0.2vh 0.2vw;
margin: 2vh 0 0 -0.2vw;
color: red;
font-weight: bold;
font-size: 14px;

&:hover {
    background-color: yellow;
  }
`

const Span = styled.span`
font-weight: bold;
`