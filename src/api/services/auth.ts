import axios from 'axios';
import api from '../api';
import { SafeUser, UserLogInInput, UserSignUpInput } from 'models/user.model';

import {
  MeSuccessResponse,
  LoginSuccessResponse,
  LoginErrorResponse,
  LoginResponse,
  SignupSuccessResponse,
  SignupErrorResponse,
  SignupResponse,
} from 'services/auth.service.ts';
import { ErrorResponse } from 'services/general.service.ts';

export const getMe = async (): Promise<SafeUser | null> => {
  try {
    const { data } = await api.get<MeSuccessResponse>('/auth/me');
    return data.user;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};

export const login = async (
  credentials: UserLogInInput,
): Promise<LoginResponse> => {
  try {
    const { data } = await api.post<LoginSuccessResponse>(
      '/auth/login',
      credentials,
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.errors) {
      return error.response.data as LoginErrorResponse;
    }

    if (axios.isAxiosError(error) && error.response?.data?.error) {
      return error.response.data as ErrorResponse;
    }

    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    localStorage.clear();
    console.log('cleared....');
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

export const signup = async (
  credentials: UserSignUpInput,
): Promise<SignupResponse> => {
  try {
    const { data } = await api.post<SignupSuccessResponse>(
      '/auth/signup',
      credentials,
    );
    return data as SignupSuccessResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.errors) {
      return error.response.data as SignupErrorResponse;
    }

    if (axios.isAxiosError(error) && error.response?.data?.error) {
      return error.response.data as ErrorResponse;
    }

    throw error;
  }
};
