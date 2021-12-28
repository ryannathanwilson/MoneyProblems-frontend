import React from 'react';
import {
  TextField, Box,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

export default function Home() {
  return (
    <div>
      HOME!!!
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-input"
          label="Username"
        />
        <TextField
          id="outlined-input"
          label="Email"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
        />
        <TextField
          id="outlined-password-input"
          label="Confirm password"
          type="password"
        />
        <LoadingButton
          endIcon={<SendIcon />}
          loading={false}
          loadingPosition="end"
          variant="contained"
        >
          Create Account
        </LoadingButton>
      </Box>
    </div>
  );
}
