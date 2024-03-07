import { useContext } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { UserIntrospect } from '../../context/AuthContext';
import { useUserById } from '../../query/users.query';
import { LoadingPage } from '../../pages/LoadingPage';
import ErrorPage from '../../pages/ErrorPage';
import { useDeleteCar } from '../../query/cars.query';

type CarInteractionsProps = {
  carMake: string;
  carModel: string;
  carId: number;
};

export default function CarInteractions({ carMake, carModel, carId }: CarInteractionsProps) {
  const userInfo = useContext(UserIntrospect);
  const { userId } = userInfo!.user!;
  const { data, isLoading, isError, error } = useUserById(userId);
  const userCarListingIds = data?.carListings.map((car) => car.id) || [];
  const userHasCar = userCarListingIds.includes(carId);
  const {
    mutate,
    isError: isDeleteError,
    error: deleteError,
    isPending: isDeletePending,
  } = useDeleteCar(userId, carId);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        navigate('/');
      },
    });
  };

  if (isLoading || isDeletePending) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage error={error} />;
  }
  if (isDeleteError) {
    return <ErrorPage error={deleteError} />;
  }

  return (
    <>
      <Typography variant="h4">{carMake}</Typography>
      <Typography variant="h6">{carModel}</Typography>
      {userHasCar && (
        <Stack spacing={2} direction="row" sx={{ margin: 'auto' }}>
          <Button variant="contained" color="secondary" fullWidth onClick={handleDelete}>
            {t('buttons.delete')}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => {
              console.log('update');
              navigate(`/carlistings/${carId}/update`);
            }}
          >
            {t('buttons.update')}
          </Button>
        </Stack>
      )}
    </>
  );
}
