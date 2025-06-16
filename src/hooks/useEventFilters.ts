import { useState } from 'react';
import { FiltersState } from '../components/major/side-bar/types';

export const useEventFilters = () => {
  const [filters, setFilters] = useState<FiltersState>({
    selectedModes: [],
    search: '',
    price: 50,
    distance: 20,
    date: 'this month',
  });

  const updateFilters = (updates: Partial<FiltersState>) => {
    setFilters((prev) => ({
      ...prev,
      ...updates,
    }));
  };
  return { filters, updateFilters };
};
