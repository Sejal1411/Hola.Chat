import { Grid2, TextField } from '@mui/material';

const UserMsg = (props2) => {
  var props2 = {
    name: "You",
    message: "Hey There! I am fine",
    time: "12:30",
  }
  return (
<Grid2 container className='usermsg-container'>
  <Grid2 item className='user-box'>
        <p className='title'>{props2.name}</p>
        <p className='msg'>{props2.message}</p>
        <p className='time-stamp'>{props2.time}</p>
      </Grid2>
</Grid2>
  )
}

export default UserMsg;