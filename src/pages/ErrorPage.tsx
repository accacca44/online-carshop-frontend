import { Box, Paper, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { UserIntrospect } from '../context/AuthContext';

export type ErrorProps = {
  error: Error | null;
};

export default function ErrorPage({ error }: ErrorProps) {
  const { logout } = useContext(UserIntrospect);

  useEffect(() => {
    console.log(`Error: ${error?.cause}`);
    if (error && error.cause === 401) {
      console.log('Error 401, redirecting to login page');
      setTimeout(() => {
        logout();
      }, 3000); // 3 seconds delay
    }
  }, [error]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Error
        </Typography>
        {error && (
          <>
            <Typography variant="body1">{error.message}</Typography>
            <Typography variant="body2">{error.name}</Typography>
          </>
        )}
        {error?.cause === 401 && <Typography variant="body1">You will be redirected to the login page.</Typography>}
        <Typography variant="body1">Please try again later.</Typography>
      </Paper>
    </Box>
  );
}
