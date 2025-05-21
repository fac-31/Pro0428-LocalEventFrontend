import { Calendar, HandCoins, MapPin } from 'lucide-react';
import { SearchFilter } from './SearchFilter';
import { NumberFilter } from './NumberFilter';
import { DropDownFilter } from './DropDownFilter';
import { FiltersProps } from '../types';

export const Filters = ({
  className,
  search,
  setSearch,
  price,
  setPrice,
  distance,
  setDistance,
  date,
  setdate,
}: FiltersProps) => {
  return (
    <div className={className}>
      <hr className="w-full border-t border-muted" />

      <SearchFilter search={search} setSearch={setSearch} />

      <DropDownFilter
        icon={Calendar}
        label="Pick a date"
        value={date}
        onChange={setdate}
        options={[
          { value: 'today', label: 'Today' },
          { value: 'this week', label: 'This week' },
          { value: 'this month', label: 'This month' },
          { value: 'this year', label: 'This year' },
        ]}
      />

      <NumberFilter
        icon={HandCoins}
        label="Max Price (£)"
        value={price}
        max={50}
        suffix="£"
        onChange={setPrice}
      />

      <NumberFilter
        icon={MapPin}
        label="Max Distance (km)"
        value={distance}
        max={20}
        suffix="km"
        onChange={setDistance}
      />
    </div>
  );
};
