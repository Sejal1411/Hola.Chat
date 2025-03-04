import {  Grid2 } from '@mui/material';
import {conversations} from '../dev-data/conversationsData.js';
import { useNavigate } from 'react-router-dom';

const Conversations = () => {
  console.log({ conversations });
  return (
    <Grid2 container className='conversations'>
      {conversations.map((conversation, i) => {
        return <conversation props={conversation} key={i}/>;
      })}
    </Grid2>
  );
};

export default Conversations;
