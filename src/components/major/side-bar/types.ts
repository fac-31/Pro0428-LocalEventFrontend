import { LucideIcon } from 'lucide-react';

// --- Modes & Filters ---

export type ModeId = 'music' | 'charity' | 'sports' | 'other';

export type Mode = {
  id: ModeId;
  label: string;
  icon: LucideIcon;
};

export type DateString = 'today' | 'this week' | 'this month' | 'this year';

export type FiltersState = {
  selectedModes: ModeId[];
  search: string;
  price: number;
  distance: number;
  date: DateString;
};

// --- Props for Main Components ---

export type SideBarProps = {
  filters: FiltersState;
  updateFilters: (updates: Partial<FiltersState>) => void;
};

export type FiltersProps = {
  filters: FiltersState;
  updateFilters: (updates: Partial<FiltersState>) => void;
  className?: string;
};

// --- Filter Component Props ---

export type MenuButtonProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ModeButtonsProps = {
  modes: Mode[];
  selectedModes: ModeId[];
  toggleModeSelect: (id: ModeId) => void;
  open: boolean;
};

export type BaseFilterProps = {
  icon: LucideIcon;
  label: string;
};

export type GenericFilterProps<T> = BaseFilterProps & {
  value: T;
  onChange: (value: T) => void;
};

export type RangeFilterProps = GenericFilterProps<number> & {
  max: number;
  suffix: string;
};

export type DropDownFilterProps<T extends string = string> =
  GenericFilterProps<T> & {
    options: { value: T; label: string }[];
  };

export type SearchFilterProps = {
  search: string;
  onChange: (value: string) => void;
};
