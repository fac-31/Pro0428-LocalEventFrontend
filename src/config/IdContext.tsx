import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Define the shape of our context value
type IdContextType = {
  id: boolean;
  setId: Dispatch<SetStateAction<boolean>>;
};

// Create context with a default value that matches the shape
export const IdContext = createContext<IdContextType>({
  id: false,
  setId: () => {}, // Placeholder function for initial context
});

export const IdProvider = ({ children }: { children: ReactNode }) => {
  const [id, setId] = useState<boolean>(false);

  return (
    <IdContext.Provider value={{ id, setId }}>
      {children}
    </IdContext.Provider>
  );
};
