import { createContext } from 'react';
import { SafeUser } from 'models/user.model';

export type AuthContextType = {
  user: SafeUser | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
