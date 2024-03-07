import axios, { AxiosError } from 'axios';
import { mapErrorCodeToMessage } from '../utils/errorMessages';

export const authApi = axios.create({
  baseURL: 'http://localhost:8080/api/auth',
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
});

export type LoginProp = {
  username: string;
  password: string;
};

export type RegisterProp = {
  fullName: string;
  username: string;
  password: string;
  email: string;
  role: string;
};

export type UserInfo = {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  role: string;
  lang: string;
  theme: string;
};

export type UserIntrospectType = {
  theme: string;
  lang: string;
  username: string;
  userId: number;
  role: string;
};

export type RegisterInfo = {
  message: string;
};

export async function getIntrospect(): Promise<UserIntrospectType> {
  try {
    const res = await authApi.get<UserIntrospectType>('/introspect');
    console.log(res.data.username, res.data.userId, res.data.role);
    return res.data;
  } catch (error) {
    let message = '';
    if (error instanceof AxiosError) {
      message = mapErrorCodeToMessage('Auth', error?.response!.status);
    }
    throw new Error(message);
  }
}

export async function login(data: LoginProp): Promise<UserInfo> {
  try {
    const res = await authApi.post<UserInfo>('/login', data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = mapErrorCodeToMessage('Login', error?.response!.status);
    }
    throw new Error(message);
  }
}

export async function register(data: RegisterProp): Promise<UserInfo> {
  try {
    const res = await authApi.post<UserInfo>('/register', data);
    return res.data;
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      const messageFromServer = error.response?.data.message || '';
      message = `${mapErrorCodeToMessage('Register', error?.response!.status)}. ${messageFromServer}`;
    }
    throw new Error(message);
  }
}

export async function logout(): Promise<void> {
  try {
    await authApi.post<UserInfo>('/logout');
  } catch (error) {
    let message;
    let status;
    if (error instanceof AxiosError) {
      const messageFromServer = error.response?.data.message || '';
      message = `${mapErrorCodeToMessage('Logout', error?.response!.status)}. ${messageFromServer}`;
      status = error.response?.status as number;
    }
    throw new Error(message, { cause: status });
  }
}
