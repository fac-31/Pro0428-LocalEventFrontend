import { Search } from 'lucide-react';
import type { SearchFilterProps } from '../types';

export const SearchFilter: React.FC<SearchFilterProps> = ({
  search,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2 w-full hover:bg-input-bg p-2 rounded-md">
      <Search />
      <input
        type="text"
        value={search}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent border border-muted outline-none text-sm text-white px-2 py-1 rounded"
      />
    </div>
  );
};
