import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import { ReducedCar } from '../../api/cars.api';
import { SelectedCarContext } from '../../context/SelectedCarContext';

export type ReducedCarListingProps = {
  carInfo: ReducedCar | undefined;
  showMoreButton: boolean;
  id: number;
};

export default function ReducedCarListing(car: ReducedCarListingProps) {
  const carInfo = car.carInfo as ReducedCar;
  const { setShowSelected, setSelectedCar, setShowUpdate } = useContext(SelectedCarContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Card elevation={3} style={{ height: '100%' }}>
      <CardActionArea
        style={{ height: '100%' }}
        onClick={() => {
          setSelectedCar(carInfo.id);
          setShowSelected(true);
          setShowUpdate(false);
          navigate(`/carlistings/${car.id}`);
        }}
      >
        <CardContent>
          <Typography variant="h6">
            {carInfo?.make} {carInfo?.model}
          </Typography>
          <Typography variant="body1">
            {t('car.price')}: ${carInfo?.price}
          </Typography>
          <Typography variant="body2">ID: {carInfo?.id}</Typography>
          <DriveEtaIcon style={{ fontSize: 40, color: 'primary' }} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
