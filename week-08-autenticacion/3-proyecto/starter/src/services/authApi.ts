import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export interface AuthLoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
}

export async function loginRequest(username: string, password: string): Promise<AuthLoginResponse> {
  const res = await axios.post<AuthLoginResponse>(`${BASE_URL}/auth/login`, {
    username: username.trim(),
    password: password.trim(),
    expiresInMins: 30,
  });
  return res.data;
}

export async function getProfileRequest(token: string) {
  const res = await axios.get(`${BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data as { id: number; firstName: string; lastName: string; email: string };
}

export async function refreshRequest(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
  const res = await axios.post(`${BASE_URL}/auth/refresh`, {
    refreshToken,
    expiresInMins: 30,
  });
  return res.data as { accessToken: string; refreshToken: string };
}