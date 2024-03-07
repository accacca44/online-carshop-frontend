import React, { useCallback, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Box, Checkbox, FormControlLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { UserIntrospect } from '../../context/AuthContext';
import { useCreateCar } from '../../query/cars.query';
import ErrorPage from '../../pages/ErrorPage';
import { LoadingPage } from '../../pages/LoadingPage';

type CarData = {
  make: string;
  model: string;
  yearOfManufacture: number;
  price: number;
  mileage: number;
  phoneNumber: string;
  images: File[];
  heatedSeats: boolean;
  automaticGearBox: boolean;
  bluetooth: boolean;
  sunroof: boolean;
};

export default function CreateCarForm() {
  // States that will be used to create a car
  const [carData, setCarData] = useState<CarData>({
    make: '',
    model: '',
    yearOfManufacture: 1999,
    price: 0,
    mileage: 0,
    phoneNumber: '',
    images: [],
    heatedSeats: false,
    automaticGearBox: false,
    bluetooth: false,
    sunroof: false,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setCarData((prevCarData) => ({
      ...prevCarData,
      images: acceptedFiles,
    }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
    },
  });

  const currentUserInfo = useContext(UserIntrospect);
  const { mutate, isError, error, isPending } = useCreateCar(currentUserInfo?.user?.userId as number);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCreateSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(carData);

    // On submit send a POST request to create a car
    mutate(carData, {
      onSuccess: () => {
        console.log('Car created successfully');
        navigate('/profile');
      },
    });
  };

  if (isError) {
    return <ErrorPage error={error} />;
  }

  if (isPending) {
    return <LoadingPage />;
  }

  return (
    <form onSubmit={handleCreateSubmit}>
      <TextField
        label={t('car.make')}
        type="text"
        fullWidth
        margin="normal"
        variant="outlined"
        value={carData.make}
        onChange={(e) => setCarData({ ...carData, make: e.target.value })}
      />
      <TextField
        label={t('car.model')}
        type="text"
        fullWidth
        margin="normal"
        variant="outlined"
        value={carData.model}
        onChange={(e) => setCarData({ ...carData, model: e.target.value })}
      />
      <TextField
        label={t('car.year')}
        type="number"
        fullWidth
        margin="normal"
        variant="outlined"
        value={carData.yearOfManufacture}
        onChange={(e) => setCarData({ ...carData, yearOfManufacture: parseInt(e.target.value, 10) || 0 })}
      />
      <TextField
        label={t('car.price')}
        type="number"
        fullWidth
        margin="normal"
        variant="outlined"
        value={carData.price}
        onChange={(e) => setCarData({ ...carData, price: parseFloat(e.target.value) || 0 })}
      />
      <TextField
        label={t('car.mileage')}
        type="number"
        fullWidth
        margin="normal"
        variant="outlined"
        value={carData.mileage}
        onChange={(e) => setCarData({ ...carData, mileage: parseFloat(e.target.value) || 0 })}
      />
      <TextField
        label={t('car.phoneNumber')}
        type="tel"
        fullWidth
        margin="normal"
        variant="outlined"
        value={carData.phoneNumber}
        onChange={(e) => setCarData({ ...carData, phoneNumber: e.target.value })}
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
          <Checkbox checked={carData.sunroof} onChange={(e) => setCarData({ ...carData, sunroof: e.target.checked })} />
        }
        label={t('car.features.sunroof')}
      />

      {/* Paper for dropzone */}
      <Paper
        variant="outlined"
        sx={{ padding: 2, marginTop: 2, marginBottom: 4, border: 2, borderStyle: 'dashed', borderColor: '#ccc' }}
      >
        <Typography variant="body1" gutterBottom>
          {t('car.dropImages')}
        </Typography>
        <div {...getRootProps()} style={{ textAlign: 'center', padding: '20px 10px' }}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography variant="body1">{t('car.dropHere')}</Typography>
          ) : (
            <Typography variant="body1">{t('car.orClick')}</Typography>
          )}
          {carData.images.map((file, index) => (
            <div key={file?.name} style={{ marginTop: 10, position: 'relative', width: '100%', height: '200px' }}>
              <Box display="flex" justifyContent="center" alignItems="center" style={{ width: '100%', height: '100%' }}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </Box>
            </div>
          ))}
        </div>
      </Paper>

      {/* Submit button */}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {t('buttons.create')}
      </Button>
    </form>
  );
}
