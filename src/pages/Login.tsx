import '../styles/login.css';
import DirectButton from '../components/minor/DirectButton';
import FormInput from '../components/minor/FormInput';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../api/services/auth.ts';
import { useAuth } from '../auth/useAuth.tsx';
import { UserLogInInput } from 'models/user.model.ts';

export default function Login() {
  const [formData, setFormData] = useState<UserLogInInput>({
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

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const { token, errors } = await login(formData);
    if (token) {
      localStorage.setItem('token', token);
      await refreshUser();
      navigate('/userhome');
    } else if (errors) {
      setErrorMessage(JSON.stringify(errors));
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
              onSubmit={handleLogin}
            >
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
                  value="Log In"
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
