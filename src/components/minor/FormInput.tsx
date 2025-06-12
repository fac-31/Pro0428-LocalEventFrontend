type InputType = 'text' | 'email' | 'number' | 'password';

interface FormInputProps {
  name: string;
  label: string;
  def?: string | number;
  type?: InputType;
  error?: boolean;
}

export default function FormInput({
  name,
  label,
  def = '',
  type = 'text',
  error = false,
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={def}
        required
        className={`bg-[var(--color-input-bg)] text-[var(--color-text)] outline-none pl-1 border ${
          error
            ? 'border border-[var(--color-error)]'
            : 'border border-transparent'
        }`}
      />
    </div>
  );
}
