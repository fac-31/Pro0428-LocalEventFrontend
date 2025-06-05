import DirectButton from '../components/minor/DirectButton';
import FormInput from '../components/minor/FormInput';
import { useContext, useState } from 'react';
import { TokenContext } from '../config/TokenContext.tsx';
import { useNavigate } from 'react-router';

import { SendClientAPI } from '../api/util.ts';

import '../styles/login.css';

export default function Login() {
  const [formData, setFormData] = useState({});

  const handleChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault(); // Prevent form from submitting normally

    const result = await SendClientAPI('auth/login', 'post', formData);

    if (result.token) {
      setToken(result.token);
      navigate('/userhome'); // Redirect to user home page
    } else if (result.error) {
      alert(result.error);
    } else {
      alert('Unexpected error occured');
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="m-auto min-w-1/2 border-b-3 border-t-3">
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
                className="uppercase w-full text-[var(--color-text)] border border-[var(--color-text)]"
                type="submit"
                value="Log In"
              ></input>
            </div>
          </form>
        </div>
        <DirectButton text={'SIGN UP'} route={'/signup'} />
      </div>
    </div>
  );
}
