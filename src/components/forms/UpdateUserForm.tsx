import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Paper, Typography, Grid, TextField, Button } from '@mui/material';
import { DetailedUser, UpdateUser } from '../../api/users.api';
import { useUpdateUser } from '../../query/users.query';
import { LoadingPage } from '../../pages/LoadingPage';
import ErrorPage from '../../pages/ErrorPage';

export type UpdateUserFormProps = {
  user: DetailedUser | undefined;
};

export default function UpdateUserForm({ user }: UpdateUserFormProps) {
  const [updateUser, setUpdateUser] = useState({ fullName: user?.fullName, email: user?.email });
  const { mutate, isPending, isError, error } = useUpdateUser(user?.id as number);
  const { t } = useTranslation();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(updateUser);
    mutate(updateUser as UpdateUser);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  if (isPending) {
    return <LoadingPage />;
  }

  return isError ? (
    <ErrorPage error={error} />
  ) : (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h6" gutterBottom>
          {t('forms.update_user_title')}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('user.full_name')}
                name="fullName"
                value={updateUser.fullName}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('user.email')}
                name="email"
                value={updateUser.email}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {t('buttons.update')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
