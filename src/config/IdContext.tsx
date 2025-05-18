import { createContext, Dispatch, SetStateAction } from 'react';

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
