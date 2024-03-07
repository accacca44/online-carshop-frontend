import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateCar,
  DetailedCar,
  ReducedCar,
  UpdateCar,
  createCar,
  deleteById,
  fetchAllCars,
  fetchCarById,
  updateCar,
} from '../api/cars.api';

export function useCars() {
  return useQuery<ReducedCar[], Error>({
    queryKey: ['car'],
    queryFn: () => fetchAllCars(),
  });
}

export function useCarById(id: number) {
  return useQuery<DetailedCar, Error>({
    queryKey: ['car', id],
    queryFn: () => fetchCarById(id),
  });
}

export function useCreateCar(userId: number) {
  const queryClient = useQueryClient();

  return useMutation<DetailedCar, Error, CreateCar>({
    mutationFn: (data) => createCar(data, userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      queryClient.invalidateQueries({ queryKey: ['car', data.id] });
      queryClient.invalidateQueries({ queryKey: ['car'] });
    },
  });
}

export function useUpdateCar(userId: number, id: number) {
  const queryClient = useQueryClient();

  return useMutation<DetailedCar, Error, UpdateCar>({
    mutationFn: (data) => updateCar(data, userId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      queryClient.invalidateQueries({ queryKey: ['car', id] });
    },
  });
}

export function useDeleteCar(userId: number, id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteById(userId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      queryClient.invalidateQueries({ queryKey: ['car'] });
    },
  });
}
