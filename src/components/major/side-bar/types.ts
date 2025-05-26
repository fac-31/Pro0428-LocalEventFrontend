import { LucideIcon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

export type ModeId = 'music' | 'charity' | 'sports' | 'other';

export type Mode = {
  id: ModeId;
  label: string;
  icon: LucideIcon;
};

export type DateString = 'today' | 'this week' | 'this month' | 'this year';

export type SideBarProps = {
  selectedModes: ModeId[];
  setSelectedModes: Dispatch<SetStateAction<ModeId[]>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  price: number;
  setPrice: Dispatch<SetStateAction<number>>;
  distance: number;
  setDistance: Dispatch<SetStateAction<number>>;
  date: DateString;
  setdate: Dispatch<SetStateAction<DateString>>;
};

export type MenuButtonProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export type ModeButtonsProps = {
  modes: Mode[];
  selectedModes: ModeId[];
  toggleModeSelect: (id: ModeId) => void;
  open: boolean;
};

export type FiltersProps = Omit<
  SideBarProps,
  'selectedModes' | 'setSelectedModes'
> & {
  className?: string;
};

export type BaseFilterProps = {
  icon: LucideIcon;
  label: string;
};

export type GenericFilterProps<T> = BaseFilterProps & {
  value: T;
  onChange: Dispatch<SetStateAction<T>>;
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
  setSearch: Dispatch<SetStateAction<string>>;
};
