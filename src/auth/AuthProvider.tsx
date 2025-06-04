// context/AuthProvider.tsx
import { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { getMe } from '../api/services/auth';
import { User } from './types';

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    setLoading(true);
    try {
      const user = await getMe();
      setUser(user);
    } catch (err) {
      console.error('Failed to load user:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
