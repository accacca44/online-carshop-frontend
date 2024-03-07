import { Card, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DetailedUser } from '../../api/users.api';

export type UserProfileCardProps = {
  user: DetailedUser | undefined;
};

export default function UserProfileCard({ user }: UserProfileCardProps) {
  const { t } = useTranslation();

  return (
    <Card style={{ maxWidth: 400, margin: 'auto', marginTop: 16 }} elevation={3}>
      <CardContent>
        <Typography variant="h6">{user?.fullName}</Typography>
        <Typography variant="body1">
          {t('user.email')}: {user?.email}
        </Typography>
        <Typography variant="body1">
          {t('user.username')}: {user?.username}
        </Typography>
        <Typography variant="body1">
          {t('user.role')}: {user?.role}
        </Typography>
      </CardContent>
    </Card>
  );
}
