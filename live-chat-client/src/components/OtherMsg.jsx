import React from 'react'
import { Grid, Avatar, TextField } from '@mui/material';


const OtherMsg = (props1) =>{
  var props1 = {
    name: "Sumegha", 
    message: "Hello I am Sumegha",
    time: "12:30",
  }

  return (
    <Grid container className='othermsg-container'>
    <Grid item className='others-box'>
      <Avatar className='avatar-big' />

    <Grid item className='msg-container'>
        <p className='title'>{props1.name}</p>
        <p>{props1.message}</p>
        <p className='time-stamp'>{props1.time}</p>
    </Grid>
    </Grid>
    </Grid>
  )
}

export default OtherMsg;