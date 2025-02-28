import { Grid } from '@mui/material';
import ChatHeader from './ChatHeader';
import ChatZone from './ChatZone';
import ChatMessage from './ChatMessage';

const ChatArea = () => {
  return (
    <Grid container className='chat-area'>
      <ChatHeader />
      <ChatZone />
      <ChatMessage />
    </Grid>
  );
};

export default ChatArea;