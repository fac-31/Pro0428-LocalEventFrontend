import axios from 'axios';
import api from '../api';
import { User } from '../../auth/types';

export interface MeResponse {
  message: string;
  user: User;
}

type LoginBody = {
  username: string;
  password: string;
};

type LoginErrorDetails = {
  formErrors: string[];
  fieldErrors: {
    [key: string]: string[];
  };
};

export type LoginResult = {
  token: string | null;
  errors: LoginErrorDetails | null;
};

type SignupBody = {
  username: string;
  password: string;
  email: string;
  name_first: string;
  name_last: string;
};

type SignupSuccessResponse = {
  acknowledged: boolean;
  insertedId: string;
};

type SignupErrorDetails = {
  formErrors: string[];
  fieldErrors: {
    [key: string]: string[];
  };
};

type SignupResult = {
  success: boolean;
  insertedId?: string;
  errorMessage?: string;
  errors?: SignupErrorDetails;
};

export const getMe = async (): Promise<User | null> => {
  try {
    const { data } = await api.get<MeResponse>('/auth/me');
    return data.user;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};

export const login = async (credentials: LoginBody): Promise<LoginResult> => {
  try {
    const { data } = await api.post<{ token: string }>(
      '/auth/login',
      credentials,
    );
    return {
      token: data.token,
      errors: null,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.errors) {
      return {
        token: null,
        errors: error.response.data.errors,
      };
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

export const signup = async (formData: SignupBody): Promise<SignupResult> => {
  try {
    const { data } = await api.post<
      SignupSuccessResponse | { error: string; errors?: SignupErrorDetails }
    >('/auth/signup', formData);
    if ('acknowledged' in data && data.acknowledged) {
      return { success: true, insertedId: data.insertedId };
    }
    if ('error' in data) {
      return {
        success: false,
        errorMessage: data.error,
        errors: data.errors,
      };
    }
    return {
      success: false,
      errorMessage: 'Unknown response format',
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data;
      return {
        success: false,
        errorMessage: apiError?.error || 'Unexpected error',
        errors: apiError?.errors,
      };
    }
    throw error;
  }
};
