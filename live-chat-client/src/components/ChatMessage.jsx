import { Send } from '@mui/icons-material';
import { Grid, IconButton, TextField } from '@mui/material';

const ChatMessage = () => {
  return (
    <Grid item>
      <TextField
        className='chat-send'
        variant='filled'
        placeholder='Type a message'
        fullWidth
        hiddenLabel
        InputProps={{
          endAdornment: (
            <IconButton>
              <Send />
            </IconButton>
          ),
          className: 'input',
        }}
      />
    </Grid>
  );
};

export default ChatMessage;