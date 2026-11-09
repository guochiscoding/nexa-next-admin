import axios from 'axios';

export const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  timeout: 12000,
});

request.interceptors.request.use((config) => {
  if (typeof window === 'undefined') return config;
  const raw = window.localStorage.getItem('nexa-next-admin:auth') ?? window.sessionStorage.getItem('nexa-next-admin:auth');
  if (!raw) return config;

  try {
    const session = JSON.parse(raw) as { token?: { access_token?: string; token_type?: string } };
    const accessToken = session.token?.access_token;
    if (accessToken) {
      config.headers.Authorization = `${session.token?.token_type ?? 'Bearer'} ${accessToken}`;
    }
  } catch {
    return config;
  }
  return config;
});
