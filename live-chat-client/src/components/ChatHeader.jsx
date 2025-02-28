import { Grid, IconButton, Avatar } from '@mui/material';

const ChatHeader = ({ props }) => {
  return (
    <Grid container className='chat-header'>
      <Grid item>
        <Avatar className='avatar-medium' />
      </Grid>
    </Grid>
  );
};

export default ChatHeader;