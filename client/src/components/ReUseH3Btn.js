import React from 'react'
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

const ReUseH3Btn = ({ feature, access, linkFeature }) => {
  return (
    <DivCntr>
      <H3>{feature}</H3>
      <Btn><NavLink to={linkFeature} style={{textDecoration: 'none'}}>{access}</NavLink></Btn>
    </DivCntr>
  )
}

export default ReUseH3Btn

const DivCntr = styled.div`
display: flex;
flex-direction: column;
align-items: center;

@media screen and (min-width: 320px) {
width: 46vw;
padding: 0 2vw 0 2vw;
}
`

const Btn = styled.button`
border-radius: 8px;
height: 3vh;
width: 6vw;
font-weight: bold;
text-decoration: none;

@media screen and (min-width: 320px) {
  width: 26vw;
}
`

const H3 = styled.h3`
`