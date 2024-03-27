import React, { useState, useContext } from 'react'
import { UserContext } from './UserContext'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'

const Signin = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [message, setMessage] = useState('');

  const [errorMessage, setErrorMessage] = useState(() => {
    if (currentUser && window.location.href.indexOf('signin') >= 0) {
      return `You are already logged in, ${currentUser.fullName}`;
    } else {
      return '';
    }
  });

  const [nextMessage, setNextMessage] = useState(() => {
    if (currentUser) {
      sessionStorage.removeItem('loginUser');
      setCurrentUser(null);
      return `You are logged out.`;
    } else {
      return '';
    }
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userName = formData.get('userName');
    const password = formData.get('password');
    loginUserAccount(userName, password);
    event.target.reset();
  }

  const loginUserAccount = (userName, password) => {
    fetch('/signin', {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: userName, password: password })
    })
      .then((res) => res.json())
      .then((jsonData) => {
        switch (jsonData.status) {
          case 200:
            setCurrentUser(jsonData.data);
            sessionStorage.setItem('loginUser', JSON.stringify(jsonData.data));
            setNextMessage('');
            setMessage(`${jsonData.message} - You are logged in.`);
            setErrorMessage('');

            setTimeout(() => {
              navigate('/');
            }, 2000);
            break;

          case 404:
            setErrorMessage(`${jsonData.message} - Something wrong. Try again.`);
            setMessage('');
            break;

          default:
            break;
        }
      })
      .catch((err) => {
        setErrorMessage(`${err} - Technical issue. Try again.`)
      });
  }

  return (
    <DivPage>
      <DivTitle>
        <h1>Sign in</h1>
      </DivTitle>

      <DivSection>
        {errorMessage ? <Perror>{errorMessage}</Perror> : ''}
        {message ? <Pconf>{message}</Pconf> : ''}
        <form onSubmit={handleSubmit}>
          <Ul>
            <Li>
              <Label htmlFor='userName'>Username: </Label>
              <Input id='userName' name='userName' type='text' placeholder='username...' required />
            </Li>
            <Li>
              <Label htmlFor='password'>Password: </Label>
              <Input id='password' name='password' type='password' autoComplete='password' placeholder='password...' required />
            </Li>
            <Li>
              <DivButton>
                <Button type='submit'>Sign in</Button>
                <Button type='reset'>Reset</Button>
              </DivButton>
            </Li>
          </Ul>
        </form>
      </DivSection>
    </DivPage>
  )
}

export default Signin

const DivPage = styled.div`
background: #6DD5FA;
display: flex;
flex-direction: column;
align-items: center;
min-height: 76vh;
`

const DivTitle = styled.div`
display: flex;
align-self: start;
align-items: center;
padding: 0 0 0 2vw;
gap: 1vw;
`

const DivSection = styled.div`
border: solid black 1px;
padding: 0 1vw 1vh 1vw;
background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9);
border-radius: 8px;
margin: 0 0 6vh 0;
box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
min-width: 94vw;
min-height: 30vh;
display: flex;
justify-content: center;
flex-direction: column;
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
max-width: 28vw;
align-items: center;
height: 6vh;
gap: 4px;

@media screen and (min-width: 320px) {
  width: 92vw;
  margin: 2vh 0 2vh 0;
  padding: 0.6vh 0 0.6vh 4vw;
  gap: 0;
  justify-content: start;
  align-self: center;
  flex-direction: column;
}
`

const Label = styled.label`
font-weight: bold;
min-width: 10vw;

@media screen and (min-width: 320px) {
  min-width: 30vw;
  margin: 0 0 0 0;
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
  min-width: 40vw;
  margin: 0 0 0 10vw;
  padding: 0 0 0 0;
  gap: 0;
  justify-content: center;
  align-self: center;
  flex-direction: column;
}
`

const DivButton = styled.div`
padding: 0 0 0 0;
width: 20.5vw;
display: flex;
justify-content: space-between;

@media screen and (min-width: 320px) {
  width: 40vw;
  margin: 0 0 0 10vw;
  padding: 0 0 0 0;
  gap: 2vw;
  justify-content: space-between;
  align-self: center;
  flex-direction: row;
}
`

const Button = styled.button`
width: 8vw;
font-weight: bold;
border-radius: 4px;

@media screen and (min-width: 320px) {
  width: 19vw;
  margin: 2vh 0 2vh 0;
  padding: 0 0 0 0;
  gap: 0;
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

@media screen and (min-width: 320px) {
  min-width: 90vw;
}
`

const Pconf = styled.p`
font-weight: bold;
background: green;
justify-content: center;
align-items: center;
display: flex;
padding: 1vh 1vw 1vh 1vw;
box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
margin: 0 0 0 2vw;
border-radius: 6px;
border: solid 1px black;

@media screen and (min-width: 320px) {
  min-width: 90vw;
}
`