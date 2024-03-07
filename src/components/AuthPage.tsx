// AuthPage.js
import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import LoginForm from './forms/LoginForm';
import RegisterForm from './forms/RegisterForm';

export default function AuthPage() {
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            <LoginForm />
          </Grid>

          {/* Registration Form */}
          <Grid item xs={6}>
            <Typography variant="h4" gutterBottom>
              Register
            </Typography>
            <RegisterForm />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
