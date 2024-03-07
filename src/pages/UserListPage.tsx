import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useUsers } from '../query/users.query';
import { LoadingPage } from './LoadingPage';
import ErrorPage from './ErrorPage';

export default function UserListPage() {
  const { data, isPending, isError, error } = useUsers();
  const { t } = useTranslation();

  if (isPending) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage error={error} />;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>{t('user.full_name')}</TableCell>
            <TableCell>{t('user.username')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
