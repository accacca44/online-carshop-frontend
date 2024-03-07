import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Suspense, useEffect } from 'react';

import { useCars } from '../query/cars.query';
import CarCardContainer from './car/CarCardContainer';

// Home page is for listing all entities in compact form
export default function Home() {
  const { t, i18n } = useTranslation();
  useEffect(() => {}, [i18n.language]);

  const { data: cars, isLoading, isError, error } = useCars();

  if (isLoading) {
    return <div>{t('loading')}</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!Array.isArray(cars)) {
    return <div>Error: Cars are not an array</div>;
  }

  return (
    <Suspense fallback="loading">
      {cars.length === 0 && <Typography variant="body1">{t('home.no_carlisting')}</Typography>}
      <CarCardContainer cars={cars} title={t('home.car_listings')} showMoreButton={false} />
    </Suspense>
  );
}
