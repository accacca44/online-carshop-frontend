import { useParams } from 'react-router-dom';
import { Stack, Divider, Paper, Grid } from '@mui/material';

import { useCarById } from '../query/cars.query';
import { LoadingPage } from './LoadingPage';
import ErrorPage from './ErrorPage';
import { EmblaCarousel } from '../components/image/EmblaCarousel';
import CarImagedDetails from '../components/car/CarImagedDetails';
import CarExtras from '../components/car/CarExtras';
import CarInteractions from '../components/car/CarInteractions';

export default function DeatiledCarPage() {
  const { id } = useParams();
  const { data: car, isPending, isError, error } = useCarById(Number(id));

  if (isPending) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage error={error} />;
  }

  return (
    <Stack
      spacing={{ xs: 1, sm: 2, md: 4 }}
      divider={<Divider orientation="vertical" flexItem />}
      maxWidth="30%"
      margin="auto"
    >
      <Paper elevation={3} style={{ padding: 16 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <EmblaCarousel images={car.images} />
          </Grid>
          <Grid item xs={4}>
            <CarInteractions carMake={car.make} carModel={car.model} carId={car.id} />
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} style={{ padding: 16 }}>
        <CarImagedDetails car={car} />
      </Paper>
      <Paper elevation={3} style={{ padding: 16 }}>
        <CarExtras car={car} />
      </Paper>
    </Stack>
  );
}
