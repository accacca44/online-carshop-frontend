import axios, { AxiosError } from 'axios';
import { mapErrorCodeToMessage } from '../utils/errorMessages';

export const carsApi = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8080/api',
  headers: {
    Accept: 'application/json',
  },
});

export type ReducedCar = {
  id: number;
  make: string;
  model: string;
  price: number;
};

export async function fetchAllCars(): Promise<ReducedCar[]> {
  const res = await carsApi.get<ReducedCar[]>('/carlistings');
  return res.data;
}

export type CarImage = {
  name: string;
  content: Uint8Array;
};

export type CreateCar = {
  make: string;
  model: string;
  price: number;
  mileage: number;
  yearOfManufacture: number;
  phoneNumber: string;
  images: File[];
  heatedSeats: boolean;
  automaticGearBox: boolean;
  bluetooth: boolean;
  sunroof: boolean;
};

export type UpdateCar = {
  make: string;
  model: string;
  price: number;
  mileage: number;
  yearOfManufacture: number;
  phoneNumber: string;
  heatedSeats: boolean;
  automaticGearBox: boolean;
  bluetooth: boolean;
  sunroof: boolean;
};

export type DetailedCar = {
  id: number;
  make: string;
  model: string;
  price: number;
  mileage: number;
  yearOfManufacture: number;
  phoneNumber: string;
  images: CarImage[];
  heatedSeats: boolean;
  automaticGearBox: boolean;
  bluetooth: boolean;
  sunroof: boolean;
};

export async function createCar(data: CreateCar, userId: number): Promise<DetailedCar> {
  try {
    const formData = new FormData();
    formData.append('make', String(data.make));
    formData.append('model', String(data.model));
    formData.append('yearOfManufacture', String(data.yearOfManufacture));
    formData.append('price', String(data.price));
    formData.append('mileage', String(data.mileage));
    formData.append('phoneNumber', String(data.phoneNumber));
    formData.append('heatedSeats', String(data.heatedSeats));
    formData.append('automaticGearBox', String(data.automaticGearBox));
    formData.append('bluetooth', String(data.bluetooth));
    formData.append('sunroof', String(data.sunroof));

    data.images.forEach((image) => {
      formData.append('images', image); // Ensure 'images' key is used
    });

    const res = await carsApi.post<DetailedCar>(`/users/${userId}/carlistings`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure proper Content-Type header
      },
    });
    return res.data;
  } catch (error) {
    let message;
    let status;
    if (error instanceof AxiosError) {
      message = mapErrorCodeToMessage('Car', error?.response!.status);
      status = error?.response!.status;
    }
    throw new Error(message, { cause: status });
  }
}

export async function updateCar(data: UpdateCar, userId: number, id: number): Promise<DetailedCar> {
  try {
    console.log(`Update car: ${id} from user: ${userId} with data: ${JSON.stringify(data)}`);
    const res = await carsApi.put<DetailedCar>(`/users/${userId}/carlistings/${id}`, data);
    return res.data;
  } catch (error) {
    let message;
    let status;
    if (error instanceof AxiosError) {
      message = mapErrorCodeToMessage('Car', error?.response!.status);
      status = error?.response!.status;
    }
    throw new Error(message, { cause: status });
  }
}

export async function fetchCarById(id: number): Promise<DetailedCar> {
  try {
    const res = await carsApi.get<DetailedCar>(`/carlistings/${id}`);
    const bytes = res.data.images[0].content;
    console.log(`Bytes: ${bytes}`);
    return res.data;
  } catch (error) {
    let message;
    let status;
    if (error instanceof AxiosError) {
      message = mapErrorCodeToMessage('Car', error?.response!.status);
      status = error?.response!.status;
    }
    throw new Error(message, { cause: status });
  }
}

export async function deleteById(userId: number, id: number) {
  try {
    const res = await carsApi.delete(`/users/${userId}/carlistings/${id}`);
    return res.data;
  } catch (error) {
    let message;
    let status;
    if (error instanceof AxiosError) {
      message = mapErrorCodeToMessage('Car', error?.response!.status);
      status = error?.response!.status;
    }
    throw new Error(message, { cause: status });
  }
}
