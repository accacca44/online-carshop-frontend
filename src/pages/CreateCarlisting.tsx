import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Box, Typography } from '@mui/material';
import CreateCarForm from '../components/forms/CreateCarForm';

export default function CreateCarListing() {
  const { t } = useTranslation();

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '50vh',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography component="h1" variant="h5">
          {t('forms.create_car_title')}
        </Typography>
        <CreateCarForm />
      </Box>
    </Container>
  );
}
