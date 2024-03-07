// RegisterForm.js
import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Snackbar } from '@mui/material';
import { RegisterProp } from '../../api/auth.api';
import { useRegister } from '../../query/auth.query';

export type RegisterFormProps = {
  onSubmit: (data: RegisterProp) => void;
};
export default function RegisterForm() {
  const [registerData, setRegisterData] = useState({
    fullName: '',
    username: '',
    password: '',
    email: '',
    role: 'User', // Default role is 'User'
  });

  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const { mutate, isPending, isError, isSuccess } = useRegister();

  const handleRegisterSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(registerData);

    mutate(registerData, {
      onSuccess: () => {
        setSnackbarMessage('Registration successful! Please login.');
      },
      onError: (loginError) => {
        setSnackbarMessage(loginError.message);
      },
    });
  };

  return (
    <>
      <Snackbar
        open={isError || isSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message={snackbarMessage}
        autoHideDuration={2000}
      />
      <form onSubmit={handleRegisterSubmit}>
        <TextField
          label="Full Name"
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
          value={registerData.fullName}
          onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
        />
        <TextField
          label="Username"
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
          value={registerData.username}
          onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={registerData.password}
          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={registerData.email}
          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            label="Role"
            value={registerData.role}
            onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
          >
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={isPending}>
          {isPending ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </>
  );
}
