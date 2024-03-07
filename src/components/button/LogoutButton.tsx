import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { Card, CardContent, Button } from '@mui/material';
import { UserIntrospect } from '../../context/AuthContext';
import { useLogout } from '../../query/auth.query';
import { LoadingPage } from '../../pages/LoadingPage';
import ErrorPage from '../../pages/ErrorPage';

export default function LogoutButton() {
  const { logout } = useContext(UserIntrospect);
  const { mutate, isPending, isError, error } = useLogout();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    mutate();
  };

  if (isPending) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage error={error} />;
  }

  return (
    <Card style={{ maxWidth: 400, margin: 'auto', marginTop: 16 }} elevation={3}>
      <CardContent>
        <Button onClick={handleLogout} type="submit" variant="contained" color="secondary" fullWidth>
          {t('buttons.logout')}
        </Button>
      </CardContent>
    </Card>
  );
}
