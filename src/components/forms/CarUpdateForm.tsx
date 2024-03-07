import { Button, Checkbox, Container, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ChangeEvent, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpdateCar } from '../../query/cars.query';
import ErrorPage from '../../pages/ErrorPage';
import { UserIntrospect } from '../../context/AuthContext';
import { DetailedCar, UpdateCar } from '../../api/cars.api';
import { LoadingPage } from '../../pages/LoadingPage';
import { useUserById } from '../../query/users.query';

type CarUpdateFormProps = {
  car: DetailedCar;
};

export default function CarUpdateForm({ car }: CarUpdateFormProps) {
  const currentUserInfo = useContext(UserIntrospect);
  const [carData, setCarData] = useState({
    make: car?.make,
    model: car?.model,
    yearOfManufacture: car?.yearOfManufacture,
    price: car?.price,
    mileage: car?.mileage,
    phoneNumber: car?.phoneNumber,
    heatedSeats: car?.heatedSeats,
    automaticGearBox: car?.automaticGearBox,
    bluetooth: car?.bluetooth,
    sunroof: car?.sunroof,
  });

  // Check if user has permission to access this page
  const user = useUserById(currentUserInfo?.user?.userId as number);
  const userCarIds = user?.data?.carListings?.map((it) => it.id);
  const error = new Error('You do not have permission to access this page');
  const isOwner = userCarIds?.includes(car.id);

  const {
    mutate,
    isError: isUpdateError,
    error: updateError,
    isPending: isUpdatePending,
  } = useUpdateCar(currentUserInfo?.user?.userId as number, car?.id as number);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(carData);

    mutate(carData as UpdateCar, {
      onSuccess: () => {
        console.log('Car created successfully');
        navigate(`/carlistings/${car.id}`);
      },
    });
  };

  if (isUpdatePending) {
    return <LoadingPage />;
  }

  if (isUpdateError) {
    return <ErrorPage error={updateError} />;
  }

  if (!isOwner) {
    return <ErrorPage error={error} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h6" gutterBottom>
          {t('forms.update_car_title')}
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('car.make')}
                name="make"
                value={carData.make}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('car.model')}
                name="model"
                value={carData.model}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('car.price')}
                name="price"
                type="number"
                value={carData.price}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('car.mileage')}
                name="mileage"
                type="number"
                value={carData.mileage}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('car.year')}
                name="yearOfManufacture"
                type="number"
                value={carData.yearOfManufacture}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('car.phoneNumber')}
                name="phoneNumber"
                value={carData.phoneNumber}
                onChange={handleChange}
                variant="outlined"
                required
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={carData.heatedSeats}
                    onChange={(e) => setCarData({ ...carData, heatedSeats: e.target.checked })}
                  />
                }
                label={t('car.features.heatedSeats')}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={carData.automaticGearBox}
                    onChange={(e) => setCarData({ ...carData, automaticGearBox: e.target.checked })}
                  />
                }
                label={t('car.features.automaticGearbox')}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={carData.bluetooth}
                    onChange={(e) => setCarData({ ...carData, bluetooth: e.target.checked })}
                  />
                }
                label={t('car.features.bluetooth')}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={carData.sunroof}
                    onChange={(e) => setCarData({ ...carData, sunroof: e.target.checked })}
                  />
                }
                label={t('car.features.sunroof')}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                {t('buttons.submit')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
