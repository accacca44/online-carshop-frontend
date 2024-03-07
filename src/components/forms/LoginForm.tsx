import React, { useContext, useState } from 'react';
import { TextField, Button, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoginProp } from '../../api/auth.api';
import { useLogin } from '../../query/auth.query';
import { UserIntrospect } from '../../context/AuthContext';

export type LoginFormProps = {
  onSubmit: (data: LoginProp) => void;
};

export default function LoginForm() {
  const { login } = useContext(UserIntrospect);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const { mutate, isPending, isError } = useLogin();
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const navigate = useNavigate();

  const handleLoginSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(loginData);

    mutate(loginData, {
      onSuccess: (userData) => {
        login({
          lang: userData.lang,
          username: userData.username,
          userId: userData.id,
          role: userData.role,
          theme: userData.theme,
        });
        navigate('/');
      },
      onError: (loginError) => {
        setSnackbarMessage(loginError.message);
      },
    });
  };

  return (
    <>
      <Snackbar
        open={isError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message={snackbarMessage}
        autoHideDuration={2000}
      />
      <form onSubmit={handleLoginSubmit}>
        <TextField
          label="Username"
          type="name"
          fullWidth
          margin="normal"
          variant="outlined"
          value={loginData.username}
          onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={isPending}>
          {isPending ? 'Logging In...' : 'Login'}
        </Button>
      </form>
    </>
  );
}
