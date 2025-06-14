import DirectButton from '../components/minor/DirectButton';
import FormInput from '../components/minor/FormInput';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { login, signup } from '../api/services/auth.ts';
import {
  LoginResponse,
  SignupErrorDetails,
  SignupResponse,
} from 'services/auth.service.ts';

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
  const [fieldErrorStates, setFieldErrorStates] = useState({
    username: false,
    password: false,
    email: false,
  });

  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const handleChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const displayErrors = (error: string | SignupErrorDetails) => {
    if (typeof error === 'string') {
      if (error.includes('email')) {
        setFieldErrorStates({
          username: false,
          password: false,
          email: true,
        });
        setErrorMessage(error);
      }
      if (error.includes('username')) {
        setFieldErrorStates({
          username: true,
          password: false,
          email: false,
        });
        setErrorMessage(error);
      }
    } else {
      const { username, password } = error.fieldErrors;
      const messages = [
        username && `Username too short`,
        password && `Password too short`,
      ]
        .filter(Boolean)
        .join('\n');

      setErrorMessage(messages || 'Invalid input');
      setFieldErrorStates({
        username: !!username,
        password: !!password,
        email: false,
      });
    }
    setTimeout(() => {
      setErrorMessage(' ');
    }, 6000);
  };

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    const signupResult: SignupResponse = await signup(formData);

    if ('insertedId' in signupResult) {
      const loginResult: LoginResponse = await login({
        username: formData.username,
        password: formData.password,
      });

      if ('token' in loginResult) {
        localStorage.setItem('token', loginResult.token);
        await refreshUser();
        navigate('/userhome');
      } else if ('errors' in loginResult) {
        displayErrors(loginResult.errors);
      } else if ('error' in loginResult) {
        displayErrors(loginResult.error);
      } else {
        displayErrors('An unknown error occurred.');
      }
    } else if ('errors' in signupResult) {
      displayErrors(signupResult.errors);
    } else if ('error' in signupResult) {
      displayErrors(signupResult.error);
    } else {
      displayErrors('An unknown error occurred during signup.');
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="m-auto w-full max-w-md px-4">
        <div className="border-b-3 border-t-3">
          <DirectButton text={'HOME'} route={'/'} />
          <div className="flex mt-3 mb-3">
            <form
              className="inline-block m-auto"
              onChange={handleChange}
              onSubmit={handleSignup}
            >
              <FormInput
                name="name_first"
                label="First Name"
                error={false}
              ></FormInput>
              <FormInput
                name="name_last"
                label="Last Name"
                error={false}
              ></FormInput>
              <FormInput
                name="email"
                label="Email"
                type="email"
                error={fieldErrorStates.email}
              ></FormInput>
              <FormInput
                name="username"
                label="Username"
                error={fieldErrorStates.username}
              ></FormInput>
              <FormInput
                name="password"
                label="Password"
                type="password"
                error={fieldErrorStates.password}
              ></FormInput>

              <div>
                <input
                  className="uppercase w-full text-[var(--color-text)] border border-[var(--color-text)]"
                  type="submit"
                  value="Sign Up"
                ></input>
              </div>
            </form>
          </div>
          <DirectButton text={'LOG IN'} route={'/login'} />
        </div>
        {errorMessage && (
          <div className="font-semibold min-h-[3.5rem] text-[var(--color-error)] whitespace-pre-line text-center mt-5">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}
