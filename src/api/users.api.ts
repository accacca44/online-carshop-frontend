import axios, { AxiosError } from 'axios';
import { ReducedCar } from './cars.api';
import { mapErrorCodeToMessage } from '../utils/errorMessages';

export const usersApi = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8080/api/users',
  headers: {
    Accept: 'application/json',
  },
});

export type DetailedUser = {
  id: number;
  fullName: string;
  email: string;
  carListings: ReducedCar[];
  username: string;
  role: string;
};

export type UpdateUser = {
  fullName: string;
  email: string;
};

export type ReducedUser = {
  id: number;
  fullName: string;
  username: string;
};

export async function fetchUsers(): Promise<ReducedUser[]> {
  try {
    const res = await usersApi.get<ReducedUser[]>('');
    return res.data;
  } catch (error) {
    let message;
    let status;
    if (error instanceof AxiosError) {
      message = mapErrorCodeToMessage('User', error?.response!.status);
      status = error?.response!.status;
    }
    throw new Error(message, { cause: status });
  }
}

export async function fetchUserById(id: number): Promise<DetailedUser> {
  try {
    const res = await usersApi.get<DetailedUser>(`/${id}`);
    return res.data;
  } catch (error) {
    let message;
    let status;
    if (error instanceof AxiosError) {
      message = mapErrorCodeToMessage('User', error?.response!.status);
      status = error?.response!.status;
    }
    throw new Error(message, { cause: status });
  }
}

export async function updateUserById(id: number, data: UpdateUser): Promise<DetailedUser> {
  try {
    const res = await usersApi.put<DetailedUser>(`/${id}`, data);
    return res.data;
  } catch (error) {
    let message;
    let status;
    if (error instanceof AxiosError) {
      message = mapErrorCodeToMessage('User', error?.response!.status);
      status = error?.response!.status;
    }
    throw new Error(message, { cause: status });
  }
}

export async function updateLangById(id: number, lang: string): Promise<DetailedUser> {
  try {
    const res = await usersApi.put(`/${id}/lang?lang=${lang}`);
    return res.data;
  } catch (error) {
    let message;
    let status;
    if (error instanceof AxiosError) {
      message = mapErrorCodeToMessage('User', error?.response!.status);
      status = error?.response!.status;
    }
    throw new Error(message, { cause: status });
  }
}

export async function updateThemeById(id: number, theme: string): Promise<DetailedUser> {
  try {
    const res = await usersApi.put(`/${id}/theme?theme=${theme}`);
    return res.data;
  } catch (error) {
    let message;
    let status;
    if (error instanceof AxiosError) {
      message = mapErrorCodeToMessage('User', error?.response!.status);
      status = error?.response!.status;
    }
    throw new Error(message, { cause: status });
  }
}
