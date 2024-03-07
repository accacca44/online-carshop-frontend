import { CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export function LoadingPage() {
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
      <Typography variant="body1" style={{ marginLeft: '10px' }}>
        {t('loading')}
      </Typography>
    </div>
  );
}
