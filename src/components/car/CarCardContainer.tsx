import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReducedCar } from '../../api/cars.api';
import ReducedCarListing from './ReducedCarListing';
import CreateCarListingButton from '../button/CreateCarListingButton';

export type CarCardContainerProps = {
  cars: ReducedCar[] | undefined;
  title: string;
  showMoreButton: boolean;
};

export default function CarCardContainer({ cars, title, showMoreButton }: CarCardContainerProps) {
  const { t } = useTranslation();
  console.log(title);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {t('home.car_listings')}
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="center" p={2}>
        <Grid container>
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ height: '200px', padding: '8px' }}>
            <CreateCarListingButton />
          </Grid>
          {cars?.map((carInfo) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={carInfo.id} style={{ height: '200px', padding: '8px' }}>
              <ReducedCarListing carInfo={carInfo} showMoreButton={showMoreButton} id={carInfo.id} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
