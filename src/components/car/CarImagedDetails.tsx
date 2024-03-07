import Grid from '@mui/material/Grid';
import PaidIcon from '@mui/icons-material/Paid';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CallIcon from '@mui/icons-material/Call';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { DetailedCar } from '../../api/cars.api';

type CarImagedDetailsProps = {
  car: DetailedCar;
};

export default function CarImagedDetails({ car }: CarImagedDetailsProps) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={8}>
      <Grid item xs={6} md={6}>
        <Stack direction="row" spacing={1}>
          <PaidIcon sx={{ padding: '10px' }} />
          <Stack spacing={0.5}>
            <Typography variant="body2">{t('car.price')}</Typography>
            <Typography variant="body2">{car.price}</Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={6} md={6}>
        <Stack direction="row" spacing={1}>
          <AddRoadIcon sx={{ padding: '10px' }} />
          <Stack spacing={0.5}>
            <Typography variant="body2">{t('car.mileage')}</Typography>
            <Typography variant="body2">
              {car.mileage} {t('car.mileage')}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={6} md={6}>
        <Stack direction="row" spacing={1}>
          <CalendarTodayIcon sx={{ padding: '10px' }} />
          <Stack spacing={0.5}>
            <Typography variant="body2">{t('car.year')}</Typography>
            <Typography variant="body2">{car.yearOfManufacture}</Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={6} md={6}>
        <Stack direction="row" spacing={1}>
          <CallIcon sx={{ padding: '10px' }} />
          <Stack spacing={0.5}>
            <Typography variant="body2">{t('car.phoneNumber')}</Typography>
            <Typography variant="body2">{car.phoneNumber}</Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
