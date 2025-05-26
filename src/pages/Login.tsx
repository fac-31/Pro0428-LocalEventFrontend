import DirectButton from '../components/minor/DirectButton';
import { useContext } from 'react';
import { TokenContext } from '../config/TokenContext.tsx';
import { useNavigate } from 'react-router';

import { SendClientAPI } from '../api/util.ts';

import '../styles/login.css';

export default function Login() {
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault(); // Prevent form from submitting normally

    const result = await SendClientAPI('auth/login', 'post', {
      username: (document.getElementById('username') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value,
    });

    setToken(result.token);

    navigate('/userhome'); // Redirect to user home page
  }

  return (
    <div className="flex min-h-screen">
      <div className="m-auto min-w-1/2 border-b-3 border-t-3">
        <DirectButton text={'HOME'} route={'/'} />
        <div className="flex">
          <form className="inline-block m-auto" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username"></input>
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password"></input>
            </div>

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
    </div>
  );
}
