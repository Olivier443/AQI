import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const Signup = () => {

  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const signupData = Object.fromEntries(formData.entries());
    createUserAccount(signupData);
    event.target.reset();
  }



  const createUserAccount = (signupData) => {
    fetch("/signup", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData)
    })
      .then((res) => res.json())
      .then((jsonData) => {
        switch (jsonData.status) {
          case 201:
            setMessage(`${jsonData.message} - You can sign in. you will be redirected automatically to the sign up page in 2 seconds.`);
            setErrorMessage('');

            setTimeout(() => {
              navigate('/signin');
            }, 2000);
            break;

          case 404:
            setErrorMessage(`${jsonData.message}, ${jsonData.status} - Something wrong. Try again.`);
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
        <h1>New user? Sign up to access the site.</h1>
      </DivTitle>

      <DivSection>
        {(message && message.length) ? <Pconf>{message}</Pconf> : ''}
        {(errorMessage && errorMessage.length) ? <Perror>{errorMessage}</Perror> : ''}
        <form onSubmit={handleSubmit}>
          <Ul>
            <Li>
              <Label htmlFor='userName'>Create your username: </Label>
              <Input id='userName' name='userName' type='text' placeholder='Create your username...' required />
            </Li>
            <Li>
              <Label htmlFor='password'>Create your password: </Label>
              <Input id='password' name='password' type='password' autoComplete='password' placeholder='Create your password...' required />
            </Li>
            <Li>
              <Label htmlFor='fullName'>Full Name: </Label>
              <Input id='fullName' name='fullName' type='text' placeholder='Provide your full name...' required />
            </Li>
            <Li>
              <DivButton>
                <Button type='submit'>Submit and create your account</Button>
                <Button type='reset'>Reset</Button>
              </DivButton>
            </Li>
          </Ul>
        </form>
      </DivSection>
    </DivPage>
  )
}

export default Signup

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
  margin: 0 0 0 8vw;
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

@media screen and (min-width: 320px) {
  min-width: 90vw;
}
`

const Perror = styled.p`
font-weight: bold;
background: red;
justify-content: center;
align-items: center;
display: flex;
padding: 1vh 1vw 1vh 1vw;
border-radius: 4px;
min-height: 4vh;
max-width: 18vw;
border-style: dashed solid;

@media screen and (min-width: 320px) {
  min-width: 90vw;
}
`