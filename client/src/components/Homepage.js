import React, { useContext } from 'react'
import { UserContext } from './UserContext'
import styled from 'styled-components';
import ReUseH3Btn from './ReUseH3Btn';

const Homepage = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const CoreFeatures = [
    {
      feature: 'Get Air Pollution Data',
      access: 'Click here',
      linkFeature: '/pollution'
    },
    {
      feature: 'Get Current Weather Data',
      access: 'Click here',
      linkFeature: '/weather'
    },
    {
      feature: 'Access Weather Data',
      access: 'Click here',
      linkFeature: '/account/weather'
    },
    {
      feature: 'Access Pollution Data',
      access: 'Click here',
      linkFeature: '/account/pollution'
    }
  ]

  return (
    <DivPage>
      <DivSection>
        <DivTitle>
          <H2>The app where to find weather and air pollution data from anywhere in the world.</H2>
        </DivTitle>
        <div>

          <DivCategory>
            <DivBtn>
              <ReUseH3Btn
                {...CoreFeatures[0]}
              />
            </DivBtn>

            <DivBtn>
              {currentUser
                ? <ReUseH3Btn {...CoreFeatures[3]} />
                : null}
            </DivBtn>
          </DivCategory>

          <DivCategory>
            <DivBtn>
              <ReUseH3Btn
                {...CoreFeatures[1]}
              />
            </DivBtn>

            <DivBtn>
              {currentUser
                ? <ReUseH3Btn {...CoreFeatures[2]} />
                : null}
            </DivBtn>
          </DivCategory>

        </div>
      </DivSection>
    </DivPage>
  )
}

export default Homepage

const DivPage = styled.div`
background: linear-gradient(to right, #2980b9, #6dd5fa, #ffffff);
display: flex;
flex-direction: column;
align-items: center;

@media screen and (min-width: 320px) {
height: 64vh;
}

@media screen and (min-width: 1024px) {
height: 72vh;
width: 100vw;
}

@media screen and (min-width: 1280px) {
height: 74vh;
width: 100vw;
}

@media screen and (min-width: 1536px) {
height: 78vh;
width: 100vw;
}
`

const DivCategory = styled.div`
display: flex;
gap: 2vw;
margin: 4vh 0 0 0;
border: solid black 1px;
border-radius: 8px;
background-color: #bdc3c7;
box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
display: flex;
justify-content: center;
padding: 0 0 2vh 0;

@media screen and (min-width: 320px) {
  padding: 0 0 2vh 0;
  margin: 0 0 2vh 4vw;
  gap: 0;
  width: 90vw;
}

@media screen and (min-width: 640px) {
  margin: 6vh 0 2vh 4vw;
}

@media screen and (min-width: 768px) {
  margin: 8vh 0 2vh 1vw;
}
`

const DivBtn = styled.div`
min-width: 14vw;
display: flex;
justify-content: center;
`

const DivTitle = styled.div`
@media screen and (min-width: 320px) {
  padding: 4vh 2vw 0 2vw;
}

@media screen and (min-width: 1024px) {
  padding: 8vh 2vw 0 2vw;
}
`

const H2 = styled.h2`
@media screen and (min-width: 320px) {
  padding: 0 0 0 0;
  font-size: 2.4vh;
}
`

const DivSection = styled.section`
padding: 20vh 0 6vh 0;

@media screen and (min-width: 320px) {
  padding: 2vh 0 4vh 0;
}
`