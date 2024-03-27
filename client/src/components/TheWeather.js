import React, { useState, useContext } from 'react'
import { UserContext } from './UserContext'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons'

const TheWeather = () => {
  
  const { currentUser } = useContext(UserContext);

  const [error, setError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [myWeatherData, setMyWeatherData] = useState();
  const [dataForm, setDataForm] = useState(null);
  const [message, setMessage] = useState(
    setTimeout(() => {
      setMessage(null);
    }, 2000)
  );
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    // Calling entries() on the FormData object gives an array of all the input, select fields and their values.
    // this will simply give an object with the key value pairs for all the input, select fields.
    const enteredData = Object.fromEntries(formData.entries());
    setDataForm(enteredData);
    fetchWeather(enteredData);
    event.target.reset();
  }

  // Fetch the weather information for section weather information via city, state code and country code
  const fetchWeather = async (data) => {
    setIsFetching(true);
    try {
      setError(false);
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data.cityWeather},${data.stateWeather},${data.countryWeather}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP}&units=${data.unitOfMeasure}&lang=${data.language}`);
      const weatherData = await weatherResponse.json();

      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data.')
      }

      if (weatherData.message === 'city not found') {
        setError(true);
      }

      setMyWeatherData(weatherData);
      setIsFetching(false);
      return weatherData;

    } catch (error) {
      setError({ message: error.message || 'Failed to fetch the data.' });
    }

  }

  const clickSave = (ev) => {
    alert('click save weather data');
    saveWeatherData();
  }

  // This is the handler that will allows the user to save his data in mongoDB & the data from the select (UoM & Language)
  const saveWeatherData = () => {
    const dataToSave = {...myWeatherData, "unitOfMeasure": dataForm.unitOfMeasure, "language": dataForm.language, "currentUser": currentUser}
    fetch('/recmyweather', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSave)
    })
    .then((res) => res.json())
    .then((jsonData) => {
      switch (jsonData.status) {
        case 201:
          setMessage(`${jsonData} - Your data has been saved.`);
          setErrorMessage('');
          break;

        case 404:
          setErrorMessage(`${jsonData.message} - Something wrong. Try again.`);
          setMessage('');
          break;

        default:
          break;
      }
      
    })
    
    .catch ((err) => {
      setError({ message: error.message || 'Failed to save the data.' });
    });
  }

  return (
    <DivPage>

      {/* // Section Title */}
      <DivTitle>
        <FontAwesomeIcon icon={faTemperatureHigh} size='2xl' color='#000' />
        <h1>Detail Weather Report</h1>
      </DivTitle>

      {/* // Section Form for weather information via city, state code and country code */}
      <DivSection>
        <form onSubmit={handleSubmit}>

          <DivCategoryTitle>
            <H2>Get your weather data via city, state, and country</H2>
          </DivCategoryTitle>

          <DivProvider>
            <DivLabelInput>
              <Label htmlFor='cityWeather'>City: </Label>
              <Input id='cityWeather' name='cityWeather' type='text' placeholder='Type city name...' required />
            </DivLabelInput>

            <DivLabelInput>
              <Label htmlFor='stateWeather'>State Code: </Label>
              <Input id='stateWeather' name='stateWeather' type='text' placeholder='Type state code...' />
            </DivLabelInput>

            <DivLabelInput>
              <Label htmlFor='countryWeather'>Country Code: </Label>
              <Input id='countryWeather' name='countryWeather' type='text' placeholder='Type country code...' />
            </DivLabelInput>

            <DivLabelInput>
              <Label htmlFor='language'>Language: </Label>
              <Select id='language' name='language'>
                <option value=''>Select a language</option>
                <option value='en'>en - English</option>
                <option value='fr'>fr - French</option>
              </Select>
            </DivLabelInput>

            <DivLabelInput>
              <Label htmlFor='unitOfMeasure'>Unit of measure: </Label>
              <Select id='unitOfMeasure' name='unitOfMeasure'>
                <option value=''>Select a unit</option>
                <option value='standard'>standard</option>
                <option value='metric'>metric</option>
                <option value='imperial'>imperial</option>
              </Select>
            </DivLabelInput>

            <DivButton>
              <Button type='submit'>Get Data</Button>
              <Button onClick={() => window.location.reload(false)}>Click to reload!</Button>
              <Button type='reset'>Reset</Button>
            </DivButton>
          </DivProvider>
        </form>
      </DivSection>

      {/* // Section Form for weather information via city, state code and country code */}
      <DivResult>
      {error ? <Perror>City not found.</Perror> : '' }
      {(isFetching && error === '') ? <p>Loading...</p> : ''}
      
        {
          myWeatherData &&
          <div>

            <div>
              <Ul>
                {/* <h3>Location and Date/Time</h3> */}
                {currentUser && currentUser.fullName.length
                ? <Btn onClick={clickSave}>Save your data</Btn>
                : null}
                
                {message 
                ? <Pconf>Your data has been saved in your account.</Pconf> 
                : ''}

                {errorMessage
                ? <Perror>{errorMessage}</Perror>
                : null}
              </Ul>

              <DivCategory>
                <Ul>
                  <DivTest>
                    <Popup>Time of data calculation, unix, UTC</Popup>
                    <Li><Span>At the time of: </Span><P>{`${new Date(myWeatherData.dt * 1000)}`}</P></Li>
                  </DivTest>

                  <DivTest>
                    <Popup>City name</Popup>
                    <Li><Span>City: </Span><P>{`${myWeatherData.name}`}</P></Li>
                  </DivTest>

                  <DivTest>
                    <Popup>Country code (GB, JP etc.)</Popup>
                    <Li><Span>Country: </Span><P>{`${myWeatherData.sys.country}`}</P></Li>
                  </DivTest>

                  <DivTest>
                    <Popup>Sunrise time, unix, UTC</Popup>
                    <Li><Span>Sunrise: </Span><P>{`${new Date(myWeatherData.sys.sunrise * 1000)}`}</P></Li>
                  </DivTest>

                  <DivTest>
                    <Popup>Sunset time, unix, UTC</Popup>
                    <Li><Span>Sunset: </Span><P>{`${new Date(myWeatherData.sys.sunset * 1000)}`}</P></Li>
                  </DivTest>

                  <DivTest>
                    <Popup>Geo location, latitude</Popup>
                    <Li><Span>Latitude: </Span><P>{`${myWeatherData.coord.lat}`}</P></Li>
                  </DivTest>

                  <DivTest>
                    <Popup>Geo location, longitude</Popup>
                    <Li><Span>Longitude: </Span><P>{`${myWeatherData.coord.lon}`}</P></Li>
                  </DivTest>
                </Ul>
              </DivCategory>

              <DivCategory>
              <Ul>
                <Li><Span>Description: </Span><P>{`${myWeatherData.weather[0].description}`}</P><Img src={`/icons/${myWeatherData.weather[0].icon}.png`} alt='displays an icon showing weather' /></Li>
                <Li><Span>Main: </Span><P>{`${myWeatherData.weather[0].main}`}</P></Li>
              </Ul>
            </DivCategory>

            </div>

            <DivCategory>
              <Ul>
                <DivTest>
                  <Popup>Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit</Popup>
                  <Li><Span>Feels like: </Span><P>{`${myWeatherData.main.feels_like}`}</P></Li>
                </DivTest>

                <DivTest>
                  <Popup>Humidity, %</Popup>
                  <Li><Span>Humidity: </Span><P>{`${myWeatherData.main.humidity}`}%</P></Li>
                </DivTest>

                <DivTest>
                  <Popup>Atmospheric pressure on the sea level, hPa</Popup>
                  <Li><Span>Pressure: </Span><P>{`${myWeatherData.main.pressure} hPa`}</P></Li>
                </DivTest>

                <DivTest>
                  <Popup>Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit</Popup>
                  <Li><Span>Temperature: </Span><P>{`${myWeatherData.main.temp}`}</P></Li>
                </DivTest>

                <DivTest>
                  <Popup>Maximum temperature at the moment. This is maximal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit</Popup>
                  <Li><Span>Temperature Max: </Span><P>{`${myWeatherData.main.temp_max}`}</P></Li>
                </DivTest>

                <DivTest>
                  <Popup>Minimum temperature at the moment. This is minimal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit</Popup>
                  <Li><Span>Temperature Min: </Span><P>{`${myWeatherData.main.temp_min}`}</P></Li>
                </DivTest>
              </Ul>
            </DivCategory>

            <DivCategory>
              <Ul>
                <DivTest>
                  <Popup>Cloudiness, %</Popup>
                  <Li><Span>Clouds: </Span><P>{`${myWeatherData.clouds.all}`}%</P></Li>
                </DivTest>

                <DivTest>
                  <Popup>Wind direction, degrees (meteorological)</Popup>
                  <Li><Span>Wind Deg: </Span><P>{`${myWeatherData.wind.deg}`}</P></Li>
                </DivTest>

                <DivTest>
                  <Popup>Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour</Popup>
                  <Li><Span>Wind Gust: </Span><P>{`${myWeatherData.wind.gust}`}</P></Li>
                </DivTest>

                <DivTest>
                  <Popup>Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour</Popup>
                  <Li><Span>Wind Speed: </Span><P>{`${myWeatherData.wind.speed}`}</P></Li>
                </DivTest>

                <DivTest>
                  <Popup>Visibility, meter. The maximum value of the visibility is 10 km</Popup>
                  <Li><Span>Visibility: </Span><P>{`${myWeatherData.visibility}`}</P></Li>
                </DivTest>
              </Ul>
            </DivCategory>

          </div>
        }
      </DivResult>

    </DivPage>
  )
}

export default TheWeather

const DivResult = styled.div`
display: flex;
align-self: start;
width: 99vw;
padding: 0 0 6vh 0;
`

const DivCategoryTitle = styled.div`
@media screen and (min-width: 320px) {
  min-width: 98vw;
  margin: 0 0 0 0;
  padding: 2vh 0 0 0;
  gap: 0;
  justify-content: center;
  align-self: center;
  display: flex;
}
`

const H2 = styled.h2`
width: 90vw;
margin: 0 0vw 0 0;
`

const DivTest = styled.div`
display: flex;
flex-direction: row-reverse;
justify-content: start;
gap: 0.4vw;
`

const Popup = styled.div`
background-color: #bdc3c7;
max-width: 20vw;
border: 1px solid black;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
display: none;
transition: opacity 0.3s;
border-radius: 8px;
margin: 0.2vh 0 0.2vh 0;
padding: 0.2vh 0.2vw 0.2vh 0.2vw;
align-self: center;

  ${DivTest}:hover & {
    display: flex;
  }
`;

const DivPage = styled.div`
background: #6DD5FA;
display: flex;
flex-direction: column;
align-items: center;
min-height: 100vh;

@media screen and (min-width: 320px) {
  min-height: 86vh;
}
`

const DivTitle = styled.div`
display: flex;
align-self: start;
align-items: center;
padding: 0 0 0 2vw;
gap: 1vw;
margin: 0 0 0 2vw;

@media screen and (min-width: 1280px) {
  margin: 0 0 0 0;
}

@media screen and (min-width: 1536px) {
  margin: 0 0 0 0;
}
`

const DivSection = styled.div`
border: solid black 1px;
padding: 0 1vw 1vh 1vw;
background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9);
border-radius: 8px;
margin: 0 0 6vh 0;
box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
min-width: 94vw;

@media screen and (min-width: 320px) {
  width: 90vw;
  margin: 2vh -2vw 2vh 0;
}

@media screen and (min-width: 1024px) {
  width: 90vw;
  margin: 2vh -1.2vw 2vh 0;
}

@media screen and (min-width: 1280px) {
  width: 90vw;
  margin: 2vh 0vw 2vh 0;
}

@media screen and (min-width: 1536px) {
  width: 90vw;
  margin: 2vh 0 2vh 0;
}
`

const DivProvider = styled.div`
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;

@media screen and (min-width: 320px) {
  width: 91.5vw;
  margin: 2vh 0 2vh 0;
  padding: 0 0 0 0;
  gap: 0;
  justify-content: center;
  align-self: center;
  flex-direction: column;
}
`

const DivLabelInput = styled.div`
padding: 1vh 0 1vh 0;
display: flex;

@media screen and (min-width: 320px) {
  width: 98vw;
  margin: 2vh 0 0 0;
  padding: 0 0 0 0;
  gap: 0;
  justify-content: center;
  align-self: center;
  flex-direction: column;
}
`

const DivButton = styled.div`
padding: 1vh 0 1vh 0;
width: 16.4vw;
display: flex;
justify-content: space-between;

@media screen and (min-width: 320px) {
  width: 92vw;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  gap: 0;
  justify-content: space-around;
  align-self: center;
  flex-direction: row;
}
`

const Label = styled.label`
font-weight: bold;
min-width: 6vw;

@media screen and (min-width: 320px) {
  width: 80vw;
  margin: 0 14vw 0 0;
  padding: 0 0 1vh 0;
  gap: 0;
  justify-content: center;
  align-self: center;
  flex-direction: column;
}
`

const Input = styled.input`
min-width: 10vw;
border-radius: 4px;

@media screen and (min-width: 320px) {
  width: 86vw;
  margin: 0 7vw 0 0;
  padding: 0 0 0 0;
  gap: 0;
  justify-content: center;
  align-self: center;
  flex-direction: column;
}
`

const Select = styled.select`
min-width: 10vw;
border-radius: 4px;

@media screen and (min-width: 320px) {
  width: 86vw;
  margin: 0 7vw 0 0;
  padding: 0 0 0 0;
  gap: 0;
  justify-content: center;
  align-self: center;
  flex-direction: column;
}
`

const Button = styled.button`
width: 4vw;
font-weight: bold;
border-radius: 4px;

@media screen and (min-width: 320px) {
  width: 26vw;
  margin: 2vh 0 2vh 0;
  padding: 0 0 0 0;
  gap: 0;
}
`

const DivCategory = styled.div`
border: solid black 1px;
border-radius: 8px;
margin: 0 0 4vh 1vw;
box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
background-color: #eef2f3;

@media screen and (min-width: 320px) {
  width: 96vw;
  margin: 2vh 0 2vh 2.6vw;
  padding: 0 0 0 0;
  gap: 0;
  justify-content: start;
  align-self: start;
  flex-direction: row;
  display: flex;
}

@media screen and (min-width: 768px) {
  width: 96vw;
  margin: 2vh 0 2vh 2.6vw;
  padding: 0 0 0 0;
  gap: 0;
  justify-content: start;
  align-self: start;
  flex-direction: row;
  display: flex;
}

@media screen and (min-width: 1280px) {
  width: 95.6vw;
  margin: 2vh 0 2vh 2vw;
  padding: 0 0 0 0;
  gap: 0;
  justify-content: start;
  align-self: start;
  flex-direction: row;
  display: flex;
}

@media screen and (min-width: 1536px) {
  width: 96vw;
  margin: 2vh 0 2vh 2vw;
  padding: 0 0 0 0;
  gap: 0;
  justify-content: start;
  align-self: start;
  flex-direction: row;
  display: flex;
}
`

const Ul = styled.ul`
list-style-type: none;
padding: 2vh 0vw 1vh 2vw

@media screen and (min-width: 320px) {
  width: 92vw;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  gap: 0;
  justify-content: start;
  align-self: start;
  flex-direction: column;
  display: flex;
}
`

const Li = styled.li`
display: flex;
max-width: 50vw;
max-height: 3vh;
align-items: start;
min-height: 2vh;
gap: 4px;
margin: 0.4vh 0 0.4vh 0;
border-radius: 8px;
padding: 0.2vh 0.8vw 0.2vh 0.8vw;

@media screen and (min-width: 320px) {
  width: 92vw;
  margin: 3vh 0 3vh 0;
  padding: 0 0 0 2vw;
  gap: 0;
  justify-content: start;
  align-self: start;
  flex-direction: column;
}
`

const Span = styled.span`
font-weight: bold;

@media screen and (min-width: 320px) {
  margin: 0 0 0 0;
  padding: 0 0 0 0;
}
`

const P = styled.p`
color: blue;
font-weight: bold;
&:hover {
    background-color: yellow;
    border-radius: 8px;
    padding: 2px 2px 2px 2px;
  }

  @media screen and (min-width: 320px) {
  width: 92vw;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
}
`

const Perror = styled.p`
font-weight: bold;
background: red;
justify-content: center;
align-items: center;
display: flex;
padding: 1vh 1vw 1vh 1vw;
box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
margin: 0 0 0 2vw;
border-radius: 6px;
border: solid 1px black;
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
`

const Btn = styled.button`
border-radius: 8px;
height: 3vh;
width: 6vw;
font-weight: bold;
text-decoration: none;

@media screen and (min-width: 320px) {
  width: 40vw;
  margin: 2vh 0 2vh 4vw;
  padding: 0 0 0 0;
  gap: 0;
}

@media screen and (min-width: 640px) {
  width: 20vw;
  margin: 2vh 0 2vh 3vw;
  padding: 0 0 0 0;
  gap: 0;
}

@media screen and (min-width: 1024px) {
  width: 14vw;
  margin: 2vh 0 2vh 3vw;
  padding: 0 0 0 0;
  gap: 0;
}

@media screen and (min-width: 1280px) {
  width: 14vw;
  margin: 2vh 0 2vh 2vw;
  padding: 0 0 0 0;
  gap: 0;
}

@media screen and (min-width: 1536px) {
  width: 14vw;
  margin: 2vh 0 2vh 2vw;
  padding: 0 0 0 0;
  gap: 0;
}
`

const Img = styled.img`
transform: scale(0.6);

@media screen and (min-width: 320px) {
  margin: -2.5vh 0 0 6vw;
  padding: 0 0 0 0;
}
`