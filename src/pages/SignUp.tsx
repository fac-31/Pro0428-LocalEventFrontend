import DirectButton from '../components/minor/DirectButton';
import FormInput from '../components/minor/FormInput';
import { useContext, useState } from 'react';
import { TokenContext } from '../config/TokenContext.tsx';
import { useNavigate } from 'react-router';

import { SendClientAPI } from '../api/util.ts';

import '../styles/login.css';

export default function SignUp() {
  const [formData, setFormData] = useState({});

  const handleChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault(); // Prevent form from submitting normally

    const result = await SendClientAPI('auth/signup', 'post', formData);

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
        <DirectButton text={'LOGIN'} route={'/login'} />
      </div>
    </div>
  );
}
