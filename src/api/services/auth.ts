import axios from 'axios';
import api from '../api';
import { SafeUser, UserLogInInput, UserSignUpInput } from 'models/user.model';

export interface MeResponse {
  message: string;
  user: SafeUser;
}

export type FieldErrors = Partial<{
  username: string;
  password: string;
  name_first: string;
  name_last: string;
  email: string;
}>;

export type LoginErrorDetails =
  | {
      type: 'dbError';
      message: string;
    }
  | {
      type: 'fieldErrors';
      fieldErrors: FieldErrors;
    };

export type LoginResponse = {
  token: string | null;
  errors: LoginErrorDetails | null;
};

export type SignupFieldErrors = Partial<{
  email: string;
  username: string;
  password: string;
}>;

export type SignupErrorDetails =
  | {
      type: 'dbError';
      message: string;
    }
  | {
      type: 'fieldErrors';
      fieldErrors: SignupFieldErrors;
    };

export type SignupResponse =
  | {
      insertedId: string;
      errors: null;
    }
  | {
      insertedId: null;
      errors: SignupErrorDetails;
    };

export const getMe = async (): Promise<SafeUser | null> => {
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

export const login = async (
  credentials: UserLogInInput,
): Promise<LoginResponse> => {
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
    if (
      axios.isAxiosError(error) &&
      error.response?.data?.errors?.fieldErrors
    ) {
      const fieldErrors = error.response.data.errors.fieldErrors;

      return {
        token: null,
        errors: {
          type: 'fieldErrors',
          fieldErrors: {
            username: fieldErrors.username,
            password: fieldErrors.password,
          },
        },
      };
    }
    if (axios.isAxiosError(error) && error.response?.data?.error) {
      return {
        token: null,
        errors: {
          type: 'dbError',
          message: error.response.data.error,
        },
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

export const signup = async (
  credentials: UserSignUpInput,
): Promise<SignupResponse> => {
  try {
    const { data } = await api.post<{ insertedId: string }>(
      '/auth/signup',
      credentials,
    );
    return {
      insertedId: data.insertedId,
      errors: null,
    };
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.data?.errors?.fieldErrors
    ) {
      const fieldErrors = error.response.data.errors.fieldErrors;

      return {
        insertedId: null,
        errors: {
          type: 'fieldErrors',
          fieldErrors: {
            email: fieldErrors.email,
            username: fieldErrors.username,
            password: fieldErrors.password,
          },
        },
      };
    }

    if (axios.isAxiosError(error) && error.response?.data?.error) {
      return {
        insertedId: null,
        errors: {
          type: 'dbError',
          message: error.response.data.error,
        },
      };
    }

    throw error;
  }
};
