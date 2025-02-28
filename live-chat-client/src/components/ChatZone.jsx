import { Grid } from '@mui/material';
import OtherMsg from './OtherMsg';
import UserMsg from './UserMsg';

const ChatZone = () => {
  return (
    <Grid container className='chat-zone'>
      <OtherMsg />
      <UserMsg />
      <OtherMsg />
      <UserMsg />
      <OtherMsg />
      <UserMsg />
      <OtherMsg />
      <UserMsg />
    </Grid>
  );
};

export default ChatZone;