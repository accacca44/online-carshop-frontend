import { useParams } from 'react-router-dom';
import { useCarById } from '../query/cars.query';
import ErrorPage from './ErrorPage';
import { LoadingPage } from './LoadingPage';
import CarUpdateForm from '../components/forms/CarUpdateForm';

export default function UpdateCarPage() {
  const { id } = useParams();
  const { data: car, isPending, isError, error } = useCarById(Number(id));

  if (isPending) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage error={error} />;
  }

  return (
    <>
      <h1>UpdateCarPage</h1>
      <CarUpdateForm car={car} />
    </>
  );
}
