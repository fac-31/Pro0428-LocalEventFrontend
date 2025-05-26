import { RangeFilterProps } from '../types';

export const RangeFilter = ({
  icon: Icon,
  label,
  value,
  max,
  onChange,
}: RangeFilterProps) => {
  return (
    <div className="hover:bg-input-bg p-2 rounded-md">
      <div className="flex items-center gap-2 mb-1 ">
        <Icon />
        <p className="text-sm font-medium">
          {label}: {value === max ? `${max}+` : value}
        </p>
      </div>
      <input
        type="range"
        min="0"
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 rounded-lg bg-muted accent-primary appearance-none cursor-pointer"
        style={{
          WebkitAppearance: 'none',
          appearance: 'none',
        }}
      />
    </div>
  );
};
