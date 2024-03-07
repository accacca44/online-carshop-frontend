import { useTranslation } from 'react-i18next';
import { DetailedCar } from '../../api/cars.api';

type CarExtrasProps = {
  car: DetailedCar;
};

export default function CarExtras({ car }: CarExtrasProps) {
  const { t } = useTranslation();

  return (
    <div style={{ width: '100%' }}>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>{t('car.features.extra')}</th>
            <th>{t('car.features.availability')}</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ backgroundColor: 'lightgray' }}>
            <td>{t('car.features.automaticGearbox')}</td>
            <td style={{ textAlign: 'right' }}>{car.automaticGearBox ? '✔️' : '❌'}</td>
          </tr>
          <tr>
            <td>{t('car.features.heatedSeats')}</td>
            <td style={{ textAlign: 'right' }}>{car.heatedSeats ? '✔️' : '❌'}</td>
          </tr>
          <tr style={{ backgroundColor: 'lightgray' }}>
            <td>{t('car.features.bluetooth')}</td>
            <td style={{ textAlign: 'right' }}> {car.bluetooth ? '✔️' : '❌'}</td>
          </tr>
          <tr>
            <td>{t('car.features.sunroof')}</td>
            <td style={{ textAlign: 'right' }}>{car.sunroof ? '✔️' : '❌'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
