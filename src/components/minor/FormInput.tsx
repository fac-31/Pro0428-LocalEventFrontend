type InputType = 'text' | 'email' | 'password';

interface FormInputProps {
  name: string;
  label: string;
  type?: InputType;
}

export default function FormInput({
  name,
  label,
  type = 'text',
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        className="bg-[var(--color-input-bg)] text-[var(--color-text)] outline-none"
        required
      ></input>
    </div>
  );
}
