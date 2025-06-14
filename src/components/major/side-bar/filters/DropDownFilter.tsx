import { DropDownFilterProps } from '../types';

export const DropDownFilter = <T extends string>({
  icon: Icon,
  value,
  onChange,
  options,
}: DropDownFilterProps<T>) => {
  return (
    <div className="flex items-center gap-2 w-full px-2 py-3 p-2 rounded-md">
      <Icon />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="text-sm px-2 py-1 w-full outline-none"
        style={{
          backgroundColor: 'var(--color-background)',
          borderColor: 'var(--color-accent)',
          borderWidth: '1px',
        }}
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
