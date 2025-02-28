import { Grid, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Conversation = ({ props }) => {
  const navigate = useNavigate();

  return (
    <Grid container className='conversation' onClick={() => {
      navigate("chats");
    }}>
      <Grid item>
        <Avatar className='avatar big' />
      </Grid>
      <Grid item>
        <p>{props.name}</p>
        <p>{props.lastMessage}</p>
        <p>{props.timeStamp}</p>
      </Grid>
    </Grid>
  );
};

export default Conversation;