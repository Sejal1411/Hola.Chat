import { Grid2 } from '@mui/material';
import ChatHeader from './ChatHeader';
import ChatZone from './ChatZone';
import ChatMessage from './ChatMessage';

const ChatArea = () => {
  return (
    <Grid2 container className='chat-area'>
      <ChatHeader />
      <ChatZone />
      <ChatMessage />
    </Grid2>
  );
};

export default ChatArea;