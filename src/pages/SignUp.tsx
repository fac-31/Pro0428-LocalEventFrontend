import DirectButton from '../components/minor/DirectButton';
import FormInput from '../components/minor/FormInput';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { login, signup } from '../api/services/auth.ts';

import '../styles/login.css';
import { useAuth } from '../auth/useAuth.tsx';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name_first: '',
    name_last: '',
    email: '',
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const handleChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    const result = await signup(formData);

    if (result.success) {
      const { token, errors } = await login({
        username: formData.username,
        password: formData.password,
      });
      if (token) {
        localStorage.setItem('token', token);
        await refreshUser();
        navigate('/userhome');
      } else if (errors) {
        setErrorMessage(JSON.stringify(errors));
      }
    } else if (result.errors) {
      setErrorMessage(JSON.stringify(result.errors));
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="m-auto w-full max-w-md px-4">
        <div className="border-b-3 border-t-3">
          <DirectButton text={'HOME'} route={'/'} />
          <div className="flex">
            <form
              className="inline-block m-auto"
              onChange={handleChange}
              onSubmit={handleSignup}
            >
              <FormInput name="name_first" label="First Name"></FormInput>
              <FormInput name="name_last" label="Last Name"></FormInput>
              <FormInput name="email" label="Email" type="email"></FormInput>
              <FormInput name="username" label="Username"></FormInput>
              <FormInput
                name="password"
                label="Password"
                type="password"
              ></FormInput>

              <div>
                <input
                  className="uppercase w-full"
                  type="submit"
                  value="Sign Up"
                ></input>
              </div>
            </form>
          </div>
          <DirectButton text={'SIGN UP'} route={'/signup'} />
        </div>
        <p className="text-red-400">ugly errors to be fixed: {errorMessage}</p>
      </div>
    </div>
  );
}
