import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from './UserContext'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSunPlantWilt, faUser, faHome, faUserPlus, faPersonHiking } from '@fortawesome/free-solid-svg-icons'

const Banner = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [message, setMessage] = useState(currentUser || null);

  const navigate = useNavigate();

  function clickSignOut() {
    sessionStorage.removeItem('loginUser');
    setCurrentUser(null);
    alert("You are signed out.");
    navigate('/');
  }

  // To display the signin message in the banner
  useEffect(() => {
    if (currentUser) {
      setMessage(`Welcome ${currentUser.userName}`);
    }
  }, [currentUser])

  return (
    <div>
      <BannerCntr>
        <DivTitle>
          <DivName>
            <FontAwesomeIcon icon={faSunPlantWilt} size='2xl' color='#F3F9A7' />
            <H1>MyWeatherApp</H1>
          </DivName>

          {currentUser ? <DivMessage><H1>{message}</H1></DivMessage> : null}

        </DivTitle>
        <ButtonDiv>
          <Btn><NavLink to='/' style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faHome} size='sm' /> Home</NavLink></Btn>

          {!currentUser
            ? <Btn><NavLink to='/signin' style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faUser} size='sm' /> Sign in</NavLink></Btn>
            : null}

          {currentUser && currentUser.fullName.length
            ? <Btn onClick={clickSignOut}><FontAwesomeIcon icon={faPersonHiking} size='lg' /> Sign out</Btn>
            : null}

          {!currentUser
            ? <Btn><NavLink to='/signup' style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faUserPlus} size='sm' /> Sign up</NavLink></Btn>
            : null}

        </ButtonDiv>
      </BannerCntr>
      <Outlet />
    </div>
  )
}

export default Banner

const BannerCntr = styled.div`
width: 100vw;
background: linear-gradient(to right, #03001e, #7303c0, #ec38bc);
display: flex;

@media screen and (min-width: 320px) {
  height: 18vh;
  flex-direction: column;
  margin: 0 0 0 0;
  padding: 0 0 2vh 0;
  gap: 0;
}

@media screen and (min-width: 1024px) {
  height: 8vh;
  flex-direction: row;
  align-items: center;
  padding: 0 0 4vh 0;
}

@media screen and (min-width: 1280px) {
width: 100vw;
}

@media screen and (min-width: 1536px) {
width: 100vw;
}
`

const DivTitle = styled.div`
width: 81vw;
display: flex;
justify-content: start;
align-items: center;
gap: 2vw;
padding: 0 0 0 2vw;

@media screen and (min-width: 320px) {
  width: 100vw;
  min-height: 8vh;
  margin: 2vh 0 0 4vw;
  padding: 0 0 0 0;
  gap: 0;
  justify-content: center;
  align-self: center;
  flex-direction: column;
}

@media screen and (min-width: 640px) {
  justify-content: center;
  align-self: center;
  min-height: 8vh;
  margin: 0 0 0 0;
}

@media screen and (min-width: 1024px) {
  width: 68vw;
  justify-content: start;
  padding: 0 0 0 2vw;
}

@media screen and (min-width: 1280px) {
  width: 70vw;
}

@media screen and (min-width: 1536px) {
  width: 76vw;
}
`

const DivName = styled.div`
@media screen and (min-width: 320px) {
  height: 0vh;
  width: 100vw;
  margin: -2vh 0 0 0;
  padding: 0 0 0 0;
  gap: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

@media screen and (min-width: 640px) {
  justify-content: center;
  height: 8vh;
  margin: 0 0 0 0;
  gap: 2vw;
}

@media screen and (min-width: 1024px) {
  justify-content: start;
  margin: 0 0 0 30vw;
}

@media screen and (min-width: 1280px) {
  justify-content: start;
  margin: 0 0 0 36vw;
}

@media screen and (min-width: 1536px) {
  justify-content: start;
  margin: 0 0 0 24vw;
}
`

const DivMessage = styled.div`
@media screen and (min-width: 320px) {
  height: 0;
  margin: 2vh 0 0 0;
  padding: 0 0 0 0;
  gap: 0;
}

@media screen and (min-width: 640px) {
  align-content: center;
}
`

const H1 = styled.h1`
color: #F3F9A7;
margin: -2vh 0 0 0

@media screen and (min-width: 640px) {
  margin: 0 0 0 0;
}
`

const ButtonDiv = styled.div`
display: flex;
height: 4vh;
width: 16vw;
justify-content: space-between;
padding: 0 1vw 0 1vw;
align-items: center;

@media screen and (min-width: 320px) {
  width: 100vw;
  justify-content: space-around;
  margin: 5vh 0 0 2.4vw;
  padding: 0 0 0 0;
  gap: 0;
  height: 3vh;
}

@media screen and (min-width: 1024px) {
  width: 30vw;
  justify-content: space-around;
  margin: 0 5vw 0 0;
}

@media screen and (min-width: 1280px) {
  width: 30vw;
}

@media screen and (min-width: 1536px) {
  width: 24vw;
  gap: 1vw;
}
`

const Btn = styled.button`
border-radius: 8px;
height: 3vh;
width: 4.4vw;
font-weight: bold;
text-decoration: none;
border: none;

@media screen and (min-width: 320px) {
  width: 28vw;
}

@media screen and (min-width: 640px) {
  width: 14vw;
}

@media screen and (min-width: 768px) {
  width: 12vw;
}

@media screen and (min-width: 1024px) {
  width: 8vw;
}

@media screen and (min-width: 1280px) {
  width: 7vw;
}

@media screen and (min-width: 1536px) {
  width: 6vw;
}
`