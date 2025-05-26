import DirectButton from '../components/minor/DirectButton';
import { useContext } from 'react';
import { TokenContext } from '../config/TokenContext.tsx';
import { useNavigate } from 'react-router';

import { SendClientAPI } from '../api/util.ts';

import '../styles/login.css';

export default function SignUp() {
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault(); // Prevent form from submitting normally

    const body: { [key: string]: string } = {};
    const inputs = ['name_first', 'name_last', 'email', 'username', 'password'];

    for (const input in inputs) // Loop through each inputs and get its value
      body[input] = (document.getElementById(input) as HTMLInputElement).value;

    const result = await SendClientAPI('auth/signup', 'post', body);

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
              <input type="text" id="name_first" name="name_first"></input>
            </div>

            <div>
              <label htmlFor="name_last">Last Name</label>
              <input type="text" id="name_last" name="name_last"></input>
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email"></input>
            </div>

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
