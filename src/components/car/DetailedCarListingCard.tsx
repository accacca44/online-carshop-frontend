import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { SelectedCarContext } from '../../context/SelectedCarContext';
import { useCarById, useDeleteCar } from '../../query/cars.query';
import ErrorPage from '../../pages/ErrorPage';
import { LoadingPage } from '../../pages/LoadingPage';
import { UserIntrospect } from '../../context/AuthContext';

export default function DetailedCarListingCard() {
  const { t } = useTranslation();
  const currentUserInfo = useContext(UserIntrospect);
  const { selectedCar, setShowUpdate, setShowSelected } = useContext(SelectedCarContext);
  const { data, error, isError, isPending } = useCarById(selectedCar as number);
  const [firstPicSrc, setFirstPicSrc] = useState<string>('');
  const {
    mutate,
    isError: isDeleteError,
    error: deleteError,
    isPending: isDeletePending,
  } = useDeleteCar(currentUserInfo?.user?.userId as number, selectedCar as number);

  useEffect(() => {
    if (!data) return;
    setFirstPicSrc(`data:image/jpeg;base64,${Buffer.from(data!.images[0].content).toString('base64')}`);
    console.log(firstPicSrc);
  }, [data]);

  const handleUdpate = () => {
    setShowUpdate(true);
  };
  const handleDelete = () => {
    mutate();
    setShowSelected(false);
  };

  if (isPending || isDeletePending) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage error={error} />;
  }
  if (isDeleteError) {
    return <ErrorPage error={deleteError} />;
  }

  return (
    <Card
      style={{ maxWidth: 400, margin: 'auto', marginTop: 16, display: 'flex', flexDirection: 'column' }}
      elevation={3}
    >
      <CardContent>
        <Typography variant="h6">
          {data?.make} {data?.model}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          ID: {data?.id}
        </Typography>
        <Typography color="textSecondary">
          {t('car.price')}: ${data?.price}
        </Typography>
        <Typography color="textSecondary">
          {t('car.mileage')}: {data?.mileage} miles
        </Typography>
        <Typography color="textSecondary">
          {t('car.year')}: {data?.yearOfManufacture}
        </Typography>
        <Typography color="textSecondary">
          {t('car.phoneNumber')}: {data?.phoneNumber}
        </Typography>

        <img src={firstPicSrc} alt="car" style={{ width: '100%', marginTop: 16 }} />
      </CardContent>
      <Grid container spacing={2} justifyContent="center" style={{ marginBottom: 16 }}>
        <Grid item xs={3}>
          <Button type="submit" variant="contained" color="primary" onClick={handleUdpate}>
            {t('buttons.update')}
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button type="submit" variant="contained" color="secondary" onClick={handleDelete}>
            {t('buttons.delete')}
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
