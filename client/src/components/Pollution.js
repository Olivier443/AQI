import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmog } from '@fortawesome/free-solid-svg-icons'


// See the link below for Direct geocoding and Reverse geocoding
// https://openweathermap.org/api/geocoding-api

// See the link below for Current Air Pollution
// https://openweathermap.org/api/air-pollution

const Pollution = () => {

  const airQualityIndexColor = [
    { id: '1', quality: 'Good', color: 'blue' },
    { id: '2', quality: 'Fair', color: 'green' },
    { id: '3', quality: 'Moderate', color: 'yellow' },
    { id: '4', quality: 'Poor', color: 'orange' },
    { id: '5', quality: 'Very Poor', color: 'red' }
  ]

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);
  const [coordData, setCoordData] = useState(); // via city, state, and country code
  const [coordData2, setCoordData2] = useState(); // Via zip code and country code
  const [reverseGeocodingData, setReverseGeocodingData] = useState(); // Via latitude and longitude
  const [curAirPollution, setCurAirPollution] = useState(); // Via latitude and longitude
  const [colorAqi, setColorAqi] = useState();

  // Render the color of the Air Quality Index - AQI
  {
    // colorAqi && colorAqi.length > 0
    useEffect(() => {
      const renderAirQualityIndexColor = () => {
        const AqiValue = colorAqi;

        let airQuality;
        let airValue;
        let airColor;

        switch (AqiValue) {
          case 0:
            airQuality = airQualityIndexColor[0].quality;
            airValue = airQualityIndexColor[0].id;
            airColor = airQualityIndexColor[0].color;
            setColorAqi([airQuality, airValue, airColor]);
            break;
          case 1:
            airQuality = airQualityIndexColor[1].quality;
            airValue = airQualityIndexColor[1].id;
            airColor = airQualityIndexColor[1].color;
            setColorAqi([airQuality, airValue, airColor]);
            break;
          case 2:
            airQuality = airQualityIndexColor[2].quality;
            airValue = airQualityIndexColor[2].id;
            airColor = airQualityIndexColor[2].color;
            setColorAqi([airQuality, airValue, airColor]);
            break;
          case 3:
            airQuality = airQualityIndexColor[3].quality;
            airValue = airQualityIndexColor[3].id;
            airColor = airQualityIndexColor[3].color;
            setColorAqi([airQuality, airValue, airColor]);
            break;
          case 4:
            airQuality = airQualityIndexColor[4].quality;
            airValue = airQualityIndexColor[4].id;
            airColor = airQualityIndexColor[4].color;
            setColorAqi([airQuality, airValue, airColor]);
            break;
          default:
            break;
        }
      }
      renderAirQualityIndexColor();
    }, [colorAqi])
  }


  // Store the input data into variables for section Direct geocoding via City, state, and country
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target); // Pass the <form> to FormData with event.target, and const formData will be an object including the data that was added to all the inputs in that form. This is where the name attribute (that in fact a name prop) (name="cityName") is mandatory for this to work. This will then allows to use built-in methods.
    const enteredCityName = formData.get('cityName'); // This gives the city name entered
    const enteredStateCode = formData.get('stateCode'); // This gives the state code entered
    const enteredCountryCode = formData.get('countryCode'); // This gives the country code entered
    directGeocoding(enteredCityName, enteredStateCode, enteredCountryCode); // For section Direct geocoding via City, state, and country
    event.target.reset();
  }

  // Fetch the data to get the various properties and their values for section Direct geocoding via City, state, and country:
  const directGeocoding = async (enteredCityName, enteredStateCode, enteredCountryCode) => {
    setIsFetching(true);
    try {
      const coordinatesResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${enteredCityName},${enteredStateCode},${enteredCountryCode}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP}`);
      const coordData = await coordinatesResponse.json();

      if (!coordinatesResponse.ok) {
        throw new Error('Failed to fetch coordinates');
      }

      setCoordData(coordData);
      return coordData;

    } catch (error) {
      setError({ message: error.message || 'Failed to fetch the data' })
    }

    setIsFetching(false);
  }



  // Store the input data into variables for section Direct geocoding via zip code and country code
  const handleSubmitViaZipCountry = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target); // Pass the <form> to FormData with event.target, and const formData will be an object including the data that was added to all the inputs in that form. This is where the name attribute (that in fact a name prop) (name="cityName") is mandatory for this to work. This will then allows to use built-in methods.
    const enteredZipCode = formData.get('zipCode'); // This gives the zip code entered
    const enteredCountryCode2 = formData.get('countryCode2'); // This gives the country code entered
    directGeocodingZipCountry(enteredZipCode, enteredCountryCode2); // For section Direct geocoding via City, state, and country
    event.target.reset();
  }

  // Fetch the data to get the various properties and their values for section Direct geocoding via zip code and country code:
  const directGeocodingZipCountry = async (enteredZipCode, enteredCountryCode2) => {
    setIsFetching(true);
    try {
      const coordData2Response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${enteredZipCode},${enteredCountryCode2}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP}`);
      const coordData2ResponseData = await coordData2Response.json();

      if (!coordData2Response.ok) {
        throw new Error('Failed to fetch coordinates');
      }

      setCoordData2(coordData2ResponseData);
      return coordData2;

    } catch (error) {
      setError({ message: error.message || 'Failed to fetch the data' })
    }

    setIsFetching(false);
  }

  // Store the input data into variables for section Reverse geocoding via latitude and longitude
  const handleSubmitReverseGeocoding = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target); // Pass the <form> to FormData with event.target, and const formData will be an object including the data that was added to all the inputs in that form. This is where the name attribute (that in fact a name prop) (name="cityName") is mandatory for this to work. This will then allows to use built-in methods.
    const enteredLatitude = formData.get('latitude'); // This gives the latitude entered
    const enteredLongitude = formData.get('longitude'); // This gives the longitude entered
    reverseGeocodingLatLon(enteredLatitude, enteredLongitude); // For section Reverse geocoding via latitude and longitude
    event.target.reset();
  }

  const reverseGeocodingLatLon = async (enteredLatitude, enteredLongitude) => {
    setError(false);
    setIsFetching(true);
    try {
      const reverseGeoDataResponse = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${enteredLatitude}&lon=${enteredLongitude}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP}`)
      const reverseGeoDataResponseData = await reverseGeoDataResponse.json();

      if (reverseGeoDataResponseData.length === 0) {
        setError(true);
        throw new Error('Failed to fetch reverse geocoding information');
      }

      if (!reverseGeoDataResponse.ok) {
        setError(true);
        throw new Error('Failed to fetch reverse geocoding information');
      }

      setReverseGeocodingData(reverseGeoDataResponseData);
      setError(false);
      return reverseGeocodingData;

    } catch (error) {
      setError({ message: error.message || 'Failed to fetch the data.' })
    }
    setIsFetching(false);
  }

  // Store the input data into variables for section Current Air Pollution Data
  const handleSubmitGetAirPollution = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredLatitude2 = formData.get('latitude2'); // This gives the latitude entered
    const enteredLongitude2 = formData.get('longitude2'); // This gives the longitude entered
    currentAirPollution(enteredLatitude2, enteredLongitude2) // For section Current Air Pollution Data
    event.target.reset();
  }

  const currentAirPollution = async (enteredLatitude2, enteredLongitude2, renderAirQualityIndexColor) => {
    setIsFetching(true);
    try {
      const currentAirPollutionResponse = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${enteredLatitude2}&lon=${enteredLongitude2}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP}`)
      const currentAirPollutionResponseData = await currentAirPollutionResponse.json();

      if (!currentAirPollutionResponse.ok) {
        throw new Error('Failed to fetch current air pollution data.');
      }

      setCurAirPollution(currentAirPollutionResponseData);
      setColorAqi(currentAirPollutionResponseData.list[0].main.aqi);

      return curAirPollution;

    } catch (error) {
      setError({ message: error.message || 'Failed to fetch the data' })
    }
    setIsFetching(false);
  }

  return (
    <DivPage>

      {/* // Section Title */}
      <DivTitle>
        <FontAwesomeIcon icon={faSmog} size='2xl' color='#000' />
        <h1>Air Pollution</h1>
      </DivTitle>

      {/* // Section Form for section Direct geocoding via City, state, and country */}
      <DivSection>
        <form onSubmit={handleSubmit}>
          <DivCategory>
            <H2>Get your geo coordinates via city, state, and country</H2>
          </DivCategory>

          <DivProvider>
            <DivLabelInput>
              <Label htmlFor="cityName">City Name: </Label>
              <Input id="cityName" name="cityName" type="text" placeholder='Type city name...' required />
            </DivLabelInput>

            <DivLabelInput>
              <Label htmlFor="stateCode">State Code: </Label>
              <Input id="stateCode" name="stateCode" type="text" placeholder='Type state code...' />
            </DivLabelInput>

            <DivLabelInput>
              <Label htmlFor="countryCode">Country Code: </Label>
              <Input id="countryCode" name="countryCode" type="text" placeholder='Type country code...' />
            </DivLabelInput>

            <DivButton>
              <Button type='submit'>Get data</Button>
              <Button onClick={() => window.location.reload(false)}>Click to reload!</Button>
              <Button type='reset'>Reset</Button>
            </DivButton>
          </DivProvider>
        </form>

        {/* // Section Direct Geocoding via City, state, and country */}
        <div>
          {coordData &&
            <div>
              <Ul>
                <Li><Span>City: </Span><P>{`${coordData[0].name}`}</P></Li>
                <Li><Span>State: </Span><P>{`${coordData[0].state}`}</P></Li>
                <Li><Span>Country: </Span><P>{`${coordData[0].country}`}</P></Li>
                <Li><Span>Latitude: </Span><P>{`${coordData[0].lat}`}</P></Li>
                <Li><Span>Longitude: </Span><P>{`${coordData[0].lon}`}</P></Li>
              </Ul>
            </div>
          }
        </div>
      </DivSection>

      <DivSection>
        {/* // Section Form for section Direct geocoding via zip code and country code */}
        <form onSubmit={handleSubmitViaZipCountry}>
          <DivCategory>
            <H2>Get your geo coordinates via zip code and country code</H2>
          </DivCategory>
          <DivProvider>
            <DivLabelInput>
              <Label htmlFor="zipCode">Zip Code: </Label>
              <Input id="zipCode" name="zipCode" type="text" placeholder='Type zip code...' required />
            </DivLabelInput>
            <DivLabelInput>
              <Label htmlFor="countryCode2">Country Code: </Label>
              <Input id="countryCode2" name="countryCode2" type="text" placeholder='Type country code...' required />
            </DivLabelInput>
            <DivButton>
              <Button type='submit'>Get data</Button>
              <Button onClick={() => window.location.reload(false)}>Click to reload!</Button>
              <Button type='reset'>Reset</Button>
            </DivButton>
          </DivProvider>
        </form>

        {/* // Section Direct Geocoding By Zip Code and country code */}
        <div>
          {coordData2 &&
            <div>
              <Ul>
                <Li><Span>City: </Span><P>{`${coordData2.name}`}</P></Li>
                <Li><Span>Country: </Span><P>{`${coordData2.country}`}</P></Li>
                <Li><Span>Zip code: </Span><P>{`${coordData2.zip}`}</P></Li>
                <Li><Span>Latitude: </Span><P>{`${coordData2.lat}`}</P></Li>
                <Li><Span>Longitude: </Span><P>{`${coordData2.lon}`}</P></Li>
              </Ul>
            </div>
          }
        </div>
      </DivSection>

      {/* // Section Form for section Reverse geocoding via latitude and longitude */}
      <DivSection>
        <form onSubmit={handleSubmitReverseGeocoding}>
          <DivCategory>
            <H2>Get your location information by providing your latitude and longitude (Reverse Geocoding)</H2>
          </DivCategory>
          <DivProvider>
            <DivLabelInput>
              <Label htmlFor="latitude">Latitude: </Label>
              <Input id="latitude" name="latitude" type="text" placeholder='Type latitude...' />
            </DivLabelInput>
            <DivLabelInput>
              <Label htmlFor="longitude">Longitude: </Label>
              <Input id="longitude" name="longitude" type="text" placeholder='Type longitude...' />
            </DivLabelInput>
            <DivButton>
              <Button type='submit'>Get data</Button>
              <Button onClick={() => window.location.reload(false)}>Click to reload!</Button>
              <Button type='reset'>Reset</Button>
            </DivButton>
          </DivProvider>
        </form>

        {/* // Section Reverse Geocoding By latitude and longitude */}
        <div>
          {error ? <Perror>Failed to fetch those coords. Try again.</Perror> : '' }
          {reverseGeocodingData && !error &&
            <div>
              <Ul>
                <Li><Span>City: </Span><P>{`${reverseGeocodingData[0].name}`}</P></Li>
                <Li><Span>Country: </Span><P>{`${reverseGeocodingData[0].country}`}</P></Li>

                <Li>
                  {`${reverseGeocodingData[0].zip !== undefined }` 
                  ? 
                  <><Span>Zip code: </Span><P>{`${reverseGeocodingData[0].zip}`}</P></>
                  : 
                  <><Span>Zip code: </Span><P>No postal code</P></>
                  }
                </Li>



                <Li><Span>Latitude: </Span><P>{`${reverseGeocodingData[0].lat}`}</P></Li>
                <Li><Span>Longitude: </Span><P>{`${reverseGeocodingData[0].lon}`}</P></Li>
              </Ul>
            </div>
          }
        
        </div>
      </DivSection>

      {/* // Section Current Air Pollution Data */}
      <DivSection>
        <form onSubmit={handleSubmitGetAirPollution}>
          <DivCategory>
            <H2>Current air pollution data</H2>
          </DivCategory>

          <DivProvider>
            <DivLabelInput>
              <Label htmlFor="latitude2">Latitude: </Label>
              <Input id="latitude2" name="latitude2" type="text" placeholder='Type latitude...' required />
            </DivLabelInput>
            <DivLabelInput>
              <Label htmlFor="longitude2">Longitude: </Label>
              <Input id="longitude2" name="longitude2" type="text" placeholder='Type longitude...' required />
            </DivLabelInput>
            <DivButton>
              <Button type='submit'>Get data</Button>
              <Button onClick={() => window.location.reload(false)}>Click to reload!</Button>
              <Button type='reset'>Reset</Button>
            </DivButton>
          </DivProvider>
        </form>

        {/* // Section Current Air Pollution Data */}
        <div>
          {curAirPollution &&
            <div>
              <div>
                <div>
                  <H3>Coordinates</H3>
                </div>
                <div>
                  <Ul1>
                    <Li><Span>Latitude: </Span><P>{`${curAirPollution.coord.lat}`}</P></Li>
                    <Li><Span>Longitude: </Span><P>{`${curAirPollution.coord.lon}`}</P></Li>
                  </Ul1>
                </div>
              </div>

              <div>
                <div>
                  <H3>Time</H3>
                </div>
                <div>
                  <Ul1>
                    {/* // Note: the time is provided as Data and time, Unix, UTC - So, needs to multiply by 1000 */}
                    <Li><Span>At the time of: </Span><P>{`${new Date(curAirPollution.list[0].dt * 1000)}`}</P></Li>
                  </Ul1>
                </div>
              </div>

              <div>
                <div>
                  <H3>Air Quality Index - AQI</H3>
                </div>
                <div>
                  <Ul1>
                    <Li2 style={{ backgroundColor: `${colorAqi[2]}` }}><Span>Air Quality Index - AQI: </Span><P>{colorAqi[0]} - {colorAqi[1]}</P></Li2>
                  </Ul1>
                </div>
              </div>

              <div>
                <div>
                  <H3>Components</H3>
                </div>
                <div>
                  <Ul1>
                    <Li2><Span>Concentration of CO (Carbon monoxide), μg/m3: </Span><P>{`${curAirPollution.list[0].components.co}`}</P></Li2>
                    <Li2><Span>Concentration of NH3 (Ammonia), μg/m3: </Span><P>{`${curAirPollution.list[0].components.nh3}`}</P></Li2>
                    <Li2><Span>Concentration of NO (Nitrogen monoxide), μg/m3: </Span><P>{`${curAirPollution.list[0].components.no}`}</P></Li2>
                    <Li2><Span>Concentration of NO2 (Nitrogen dioxide), μg/m3: </Span><P>{`${curAirPollution.list[0].components.no2}`}</P></Li2>
                    <Li2><Span>Concentration of O3 (Ozone), μg/m3: </Span><P>{`${curAirPollution.list[0].components.o3}`}</P></Li2>
                    <Li2><Span>Concentration of PM2.5 (Fine particles matter), μg/m3: </Span><P>{`${curAirPollution.list[0].components.pm2_5}`}</P></Li2>
                    <Li2><Span>Concentration of PM10 (Coarse particulate matter), μg/m3: </Span><P>{`${curAirPollution.list[0].components.pm10}`}</P></Li2>
                    <Li2><Span>Concentration of SO2 (Sulphur dioxide), μg/m3: </Span><P>{`${curAirPollution.list[0].components.so2}`}</P></Li2>
                  </Ul1>
                </div>
              </div>
            </div>
          }
        </div>
      </DivSection>

    </DivPage>
  )
}

export default Pollution

const DivPage = styled.div`
background: #6DD5FA;
display: flex;
flex-direction: column;
align-items: center;
`

const DivTitle = styled.div`
display: flex;
align-self: start;
align-items: center;
padding: 0 0 0 2vw;
gap: 1vw;

@media screen and (min-width: 320px) {
  width: 100vw;
  margin: 2vh 0 0 0;
  padding: 0 0 0 0;
  gap: 0;
  justify-content: center;
  align-self: center;
  flex-direction: column;
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
  margin: 2vh -5vw 2vh 0;
  padding: 0 0 0 0;
  gap: 0;
  justify-content: center;
  align-self: center;
  flex-direction: column;
}

@media screen and (min-width: 320px) {
  width: 90vw;
  margin: 2vh 5vw 2vh 0;
}
`

const DivCategory = styled.div`
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

const DivProvider = styled.div`
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;

@media screen and (min-width: 320px) {
  width: 91.5vw;
  margin: 2vh 0 2vh 1vw;
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

const Span = styled.span`
font-weight: bold;
`

const P = styled.p`
color: blue;
font-weight: bold;
`

const Perror = styled.p`
font-weight: bold;
background: red;
justify-content: center;
align-items: center;
display: flex;
padding: 1vh 0 1vh 1vw;
border-radius: 4px;
`

const Ul = styled.ul`
list-style-type: none;
padding: 2vh 0vw 1vh 2vw

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

const Li = styled.li`
display: flex;
max-width: 80vw;
align-items: center;
height: 2vh;
gap: 4px;

@media screen and (min-width: 320px) {
  width: 92vw;
  margin: 0 0 0 0;
  padding: 0.6vh 0 0.6vh 4vw;
  gap: 0;
  justify-content: start;
  align-self: center;
  flex-direction: row;
}
`

const Ul1 = styled.ul`
list-style-type: none;
padding: 0vh 0vw 2vh 2vw

@media screen and (min-width: 320px) {
  width: 92vw;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  gap: 0;
  justify-content: space-around;
  align-self: center;
  flex-direction: column;
}
`

const Li2 = styled.li`
display: flex;
max-width: 26.5vw;
align-items: center;
gap: 4px;
box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
padding: 0vh 0vw 0vh 1vw;

@media screen and (min-width: 320px) {
  min-width: 86vw;
  margin: 2vh 0 2vh 2vw;
  padding: 0.6vh 0 0.6vh 4vw;
  gap: 0;
  justify-content: start;
  align-self: center;
  flex-direction: column;
}
`

const H3 = styled.h3`
@media screen and (min-width: 320px) {
  min-width: 86vw;
  margin: 2vh 0 2vh 2vw;
  padding: 0 0 0 0;
  gap: 0;
  justify-content: start;
  align-self: center;
  flex-direction: column;
}
`