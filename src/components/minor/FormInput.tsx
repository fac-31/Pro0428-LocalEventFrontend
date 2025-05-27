import { Dispatch, SetStateAction } from 'react';

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
      <input type={type} id={name} name={name}></input>
    </div>
  );
}
