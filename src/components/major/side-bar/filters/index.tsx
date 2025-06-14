import { Calendar, HandCoins, MapPin } from 'lucide-react';
import { SearchFilter } from './SearchFilter';
import { RangeFilter } from './RangeFilter';
import { DropDownFilter } from './DropDownFilter';
import { FiltersProps } from '../types';

export const Filters = ({
  className,
  filters,
  updateFilters,
}: FiltersProps) => {
  const { search, price, distance, date } = filters;

  return (
    <div className={className}>
      <hr className="w-full border-t border-muted" />

      <SearchFilter
        search={search}
        onChange={(val) => updateFilters({ search: val })}
      />

      <DropDownFilter
        icon={Calendar}
        label="Pick a date"
        value={date}
        onChange={(val) => updateFilters({ date: val })}
        options={[
          { value: 'today', label: 'Today' },
          { value: 'this week', label: 'This week' },
          { value: 'this month', label: 'This month' },
          { value: 'this year', label: 'This year' },
        ]}
      />

      <RangeFilter
        icon={HandCoins}
        label="Max Price (£)"
        value={price}
        max={50}
        suffix="£"
        onChange={(val) => updateFilters({ price: val })}
      />

      <RangeFilter
        icon={MapPin}
        label="Max Distance (km)"
        value={distance}
        max={30}
        suffix="km"
        onChange={(val) => updateFilters({ distance: val })}
      />
    </div>
  );
};
