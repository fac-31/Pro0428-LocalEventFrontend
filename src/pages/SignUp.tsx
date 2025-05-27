import DirectButton from '../components/minor/DirectButton';
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
          <form className="inline-block m-auto" onSubmit={handleSignup}>
            <div>
              <label htmlFor="name_first">First Name</label>
              <input
                type="text"
                id="name_first"
                name="name_first"
                onChange={handleChange}
              ></input>
            </div>

            <div>
              <label htmlFor="name_last">Last Name</label>
              <input
                type="text"
                id="name_last"
                name="name_last"
                onChange={handleChange}
              ></input>
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
              ></input>
            </div>

            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
              ></input>
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
              ></input>
            </div>

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
