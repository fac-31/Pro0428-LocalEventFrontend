import { createContext, Dispatch, SetStateAction } from 'react';

// Define the shape of our context value
type TokenContextType = {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
};

// Create context with a default value that matches the shape
export const TokenContext = createContext<TokenContextType>({
  token: null,
  setToken: () => {}, // Placeholder function for initial context
});
