import React from 'react';
import { Send } from '@mui/icons-material';
import { Grid2, IconButton, TextField, InputAdornment} from '@mui/material';

const ChatMessage = () => {
  return (
    <Grid2 item>
      <TextField
        className='chat-send'
        variant='filled'
        placeholder='Type a message'
        fullWidth
        hiddenLabel
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <Send />
              </IconButton>
            </InputAdornment>
          ),
          className: 'input',
        }}
      />
    </Grid2>
  );
};

export default ChatMessage;