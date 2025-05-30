import { DropDownFilterProps } from '../types';

export const DropDownFilter = <T extends string>({
  icon: Icon,
  value,
  onChange,
  options,
}: DropDownFilterProps<T>) => {
  return (
    <div className="flex items-center gap-2 w-full px-2 py-3 hover:bg-input-bg p-2 rounded-md">
      <Icon />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="bg-background border border-muted text-sm px-2 py-1 w-full outline-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
