import { Grid2, IconButton, Avatar } from '@mui/material';

const ChatHeader = ({ props }) => {
  return (
    <Grid2 container className='chat-header'>
      <Grid2 item>
        <Avatar className='avatar-medium' />
      </Grid2>
    </Grid2>
  );
};

export default ChatHeader;