import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserIntrospectType, getIntrospect, login, logout, register } from '../api/auth.api';

export function useIntrospect() {
  return useQuery<UserIntrospectType>({
    queryKey: [],
    queryFn: () => getIntrospect(),
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [] });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [] });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [] });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
}
