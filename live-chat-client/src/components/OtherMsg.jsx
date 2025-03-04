import React from 'react'
import { Grid2, Avatar, TextField } from '@mui/material';


const OtherMsg = (props1) =>{
  var props1 = {
    name: "Sumegha", 
    message: "Hello I am Sumegha",
    time: "12:30",
  }

  return (
    <Grid2 container className='othermsg-container'>
    <Grid2 item className='others-box'>
      <Avatar className='avatar-big' />

    <Grid2 item className='msg-container'>
        <p className='title'>{props1.name}</p>
        <p>{props1.message}</p>
        <p className='time-stamp'>{props1.time}</p>
    </Grid2>
    </Grid2>
    </Grid2>
  )
}

export default OtherMsg;