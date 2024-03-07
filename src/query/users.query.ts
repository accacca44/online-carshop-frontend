import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  DetailedUser,
  UpdateUser,
  fetchUserById,
  updateUserById,
  ReducedUser,
  fetchUsers,
  updateLangById,
} from '../api/users.api';

export function useUsers() {
  return useQuery<ReducedUser[], Error>({
    queryKey: ['user'],
    queryFn: () => fetchUsers(),
  });
}

export function useUserById(id: number) {
  return useQuery<DetailedUser, Error>({
    queryKey: ['user', id],
    queryFn: () => fetchUserById(id),
  });
}

export function useUpdateUser(id: number) {
  const queryClient = useQueryClient();

  return useMutation<DetailedUser, Error, UpdateUser>({
    mutationFn: (data) => updateUserById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    },
  });
}

export function useUpdateLang(id: number) {
  const queryClient = useQueryClient();

  return useMutation<DetailedUser, Error, string>({
    mutationFn: (lang) => updateLangById(id, lang),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    },
  });
}
