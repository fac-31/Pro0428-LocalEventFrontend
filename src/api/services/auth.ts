import axios from 'axios';
import api from '../api';
import { SafeUser, UserLogInInput, UserSignUpInput } from 'models/user.model';

export interface MeResponse {
  message: string;
  user: SafeUser;
}

export type FieldErrors = Partial<{
  username: string[];
  password: string[];
  email: string[];
  name_first: string[];
  name_last: string[];
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

export type PasswordResetFieldErrors = Partial<{
  password: string[];
  confirmedPassword: string[];
}>;

export type PasswordResetErrorDetails =
  | {
      type: 'dbError';
      message: string;
    }
  | {
      type: 'fieldErrors';
      fieldErrors: PasswordResetFieldErrors;
    };

export type PasswordResetResponse = {
  message: string | null;
  errors: PasswordResetErrorDetails | null;
};

export type SignupErrorDetails =
  | {
      type: 'dbError';
      message: string;
    }
  | {
      type: 'fieldErrors';
      fieldErrors: FieldErrors;
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

export type UpdateUserData = Partial<{
  password: string;
  confirmedPassword: string;
  username: string;
  name_first: string;
  name_last: string;
  email: string;
}>;

export type UpdateUserFieldErrors = Partial<{
  password: string[];
  confirmedPassword: string[];
  username: string[];
  name_first: string[];
  name_last: string[];
  email: string[];
}>;

export type UpdateUserErrorDetails =
  | {
      type: 'dbError';
      message: string;
    }
  | {
      type: 'fieldErrors';
      fieldErrors: UpdateUserFieldErrors;
    };

export type UpdateUserResponse = {
  message: string | null;
  errors: UpdateUserErrorDetails | null;
};

export const updateUser = async (
  userData: UpdateUserData,
): Promise<UpdateUserResponse> => {
  try {
    const { data } = await api.put<{ message: string }>('/auth/me', userData);
    return {
      message: data.message || 'User updated successfully',
      errors: null,
    };
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.data?.errors?.fieldErrors
    ) {
      const fieldErrors = error.response.data.errors.fieldErrors;
      return {
        message: null,
        errors: {
          type: 'fieldErrors',
          fieldErrors: {
            password: fieldErrors.password,
            confirmedPassword: fieldErrors.confirmedPassword,
            username: fieldErrors.username,
            name_first: fieldErrors.name_first,
            name_last: fieldErrors.name_last,
            email: fieldErrors.email,
          },
        },
      };
    }
    if (axios.isAxiosError(error) && error.response?.data?.error) {
      return {
        message: null,
        errors: {
          type: 'dbError',
          message: error.response.data.error,
        },
      };
    }
    throw error;
  }
};
