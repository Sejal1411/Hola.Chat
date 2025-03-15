import { Grid2, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Conversation = ({ name, lastMessage, timeStamp }) => {
  const navigate = useNavigate();

  return (
    <Grid2 container className='conversation' onClick={() => {
      navigate("/app/chats");
    }}>
      <Grid2 item>
        <Avatar className='avatar big' />
      </Grid2>
      <Grid2 item>
        <p>{name || "Unknown User"}</p>
        <p>{lastMessage || "No messages yet"}</p>
        <p>{timeStamp || "Unknown time"}</p>
      </Grid2>
    </Grid2>
  );
};

export default Conversation;