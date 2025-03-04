import { Grid2, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Conversation = ({ props }) => {
  const navigate = useNavigate();

  return (
    <Grid2 container className='conversation' onClick={() => {
      navigate("chats");
    }}>
      <Grid2 item>
        <Avatar className='avatar big' />
      </Grid2>
      <Grid2 item>
        <p>{props.name}</p>
        <p>{props.lastMessage}</p>
        <p>{props.timeStamp}</p>
      </Grid2>
    </Grid2>
  );
};

export default Conversation;