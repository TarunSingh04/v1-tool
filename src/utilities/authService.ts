import { LoginRequest, SignupRequest, TokenResponse } from '@/types/auth';
import apiClient from './apiClient';

export const signupUser = async (data: SignupRequest): Promise<{ message: string }> => {
  const response = await apiClient.post('/auth/signup', data);
  return response.data;
};

export const loginUser = async (data: LoginRequest): Promise<TokenResponse> => {
  const response = await apiClient.post('/auth/login', data);
  return response.data;
};

export const validateEmail = async (email: string): Promise<{ exists: boolean }> => {
  const response = await apiClient.post('/auth/validate-email', { email });
  return response.data;
};

export const resetPassword = async (data: { email: string; new_password: string }): Promise<{ message: string }> => {
  const response = await apiClient.post('/auth/reset-password', data);
  return response.data;
};

export const refreshToken = async (refreshToken: string): Promise<TokenResponse> => {
  const response = await apiClient.post('/auth/refresh-token', { refresh_token: refreshToken });
  return response.data;
};

export const validateAccessToken = async (token: string): Promise<{ valid: boolean; user_id: string; email: string }> => {
  const response = await apiClient.get('/auth/validate-token', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
