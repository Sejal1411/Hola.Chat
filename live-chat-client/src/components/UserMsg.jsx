import { Grid, TextField } from '@mui/material';

const UserMsg = (props2) => {
  var props2 = {
    name: "You",
    message: "Hey There! I am fine",
    time: "12:30",
  }
  return (
<Grid container className='usermsg-container'>
  <Grid item className='user-box'>
        <p className='title'>{props2.name}</p>
        <p className='msg'>{props2.message}</p>
        <p className='time-stamp'>{props2.time}</p>
      </Grid>
</Grid>
  )
}

export default UserMsg;