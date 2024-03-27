import React from 'react'
import { Outlet  } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSunPlantWilt } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <FooterCntr>
      <DivTitle>
        <FontAwesomeIcon icon={faSunPlantWilt} size='xl' color='#F3F9A7' />
        <H2>MyWeatherApp</H2>
      </DivTitle>
      <Outlet />
    </FooterCntr>
  )
}

export default Footer

const FooterCntr = styled.div`
width: 100vw;
height: 16vh;
background: linear-gradient(to right, #03001e, #7303c0, #ec38bc);
display: flex;
align-items: start;

@media screen and (min-width: 1280px) {
width: 100vw;
}

@media screen and (min-width: 1536px) {
width: 100vw;
}
`

const DivTitle = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 1vw;
padding: 0 0 0 1.6vw;

@media screen and (min-width: 320px) {
gap: 4vw;
margin: 0 0 0 8vw;
}

@media screen and (min-width: 1024px) {
gap: 2vw;
margin: 0 0 0 0;
}

@media screen and (min-width: 1280px) {
gap: 2vw;
margin: 0 0 0 3vw;
}

@media screen and (min-width: 1536px) {
gap: 2vw;
margin: 0 0 0 3vw;
}
`

const H2 = styled.h2`
color: #F3F9A7;
font-weight: bold;
`