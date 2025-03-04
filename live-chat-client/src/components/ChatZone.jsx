import { Grid2 } from '@mui/material';
import OtherMsg from './OtherMsg';
import UserMsg from './UserMsg';

const ChatZone = () => {
  return (
    <Grid2 container className='chat-zone'>
      <OtherMsg />
      <UserMsg />
      <OtherMsg />
      <UserMsg />
      <OtherMsg />
      <UserMsg />
      <OtherMsg />
      <UserMsg />
    </Grid2>
  );
};

export default ChatZone;