import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext'
import styled from 'styled-components';

const PollutionReport = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [pollutionData, setPollutionData] = useState();

  const pollutionDataHandler = () => {
    fetch('')
  }

  return (
    <div>

      <div>
        <h1>Pollution Report</h1>
      </div>

      <div>
        <div>
          <h2>Get your pollution report.</h2>
          <button onClick={pollutionDataHandler}>Click here</button>
        </div>
      </div>
      
    </div>
  )
}

export default PollutionReport
