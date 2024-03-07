import { useTranslation } from 'react-i18next';
import React, { useContext, useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import { UserIntrospect } from '../context/AuthContext';
import { useUserById } from '../query/users.query';
import ErrorPage from './ErrorPage';
import UserProfileCard from '../components/user/UserProfileCard';
import { LoadingPage } from './LoadingPage';
import UpdateUserForm from '../components/forms/UpdateUserForm';
import { ReducedCar } from '../api/cars.api';
import CarCardContainer from '../components/car/CarCardContainer';
import { SelectedCarContext } from '../context/SelectedCarContext';
import LogoutButton from '../components/button/LogoutButton';

export default function ProfilePage() {
  const userInfo = useContext(UserIntrospect);
  const userId = userInfo?.user?.userId as number;

  const { data, error, isError, isPending } = useUserById(userId);
  const cars = data?.carListings as ReducedCar[];

  const [showSelected, setShowSelected] = useState(false);
  const [selectedCar, setSelectedCar] = useState<number>();
  const [showUpdate, setShowUpdate] = useState(false);
  const { t } = useTranslation();

  const contextValue = useMemo(
    () => ({ selectedCar, setSelectedCar, showSelected, setShowSelected, showUpdate, setShowUpdate }),
    [selectedCar, setSelectedCar, showSelected, setSelectedCar, showUpdate, setShowUpdate],
  );

  if (isPending) {
    return <LoadingPage />;
  }
  return isError ? (
    <ErrorPage error={error} />
  ) : (
    <SelectedCarContext.Provider value={contextValue}>
      <Grid container spacing={4}>
        <Grid item xs={6} md={4}>
          <>
            <UserProfileCard user={data} />
            <UpdateUserForm user={data} />
            <LogoutButton />
          </>
        </Grid>
        <Grid item xs={6} md={4}>
          <CarCardContainer cars={cars} title={t('user.your_car_listings')} showMoreButton={false} />
        </Grid>
      </Grid>
    </SelectedCarContext.Provider>
  );
}
