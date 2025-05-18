import { useState, ReactNode } from 'react';
import { IdContext } from './IdContext';

export const IdProvider = ({ children }: { children: ReactNode }) => {
  const [id, setId] = useState<boolean>(false);

  return (
    <IdContext.Provider value={{ id, setId }}>{children}</IdContext.Provider>
  );
};
