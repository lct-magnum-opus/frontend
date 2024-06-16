import { AxiosInstance } from 'axios';

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export function login(client: AxiosInstance, data: LoginInput) {
  return client.post<LoginResponse>('/auth/token/', data);
}
