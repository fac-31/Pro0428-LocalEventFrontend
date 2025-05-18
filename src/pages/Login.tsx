import DirectButton from '../components/minor/DirectButton';
import { useContext } from 'react';
import { IdContext } from '../config/IdContext';
import { useNavigate } from 'react-router';

export default function Login() {
  const { setId } = useContext(IdContext);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from submitting normally
    setId(true);
    navigate('/userhome'); // Redirect to user home page
  };

  return (
    <div className="flex min-h-screen">
      <div className="m-auto min-w-1/2 border-b-3 border-t-3">
        <DirectButton text={'HOME'} route={'/'} />
        <div className="flex">
          <form className="inline-block m-auto" onSubmit={handleLogin}>
            <div className="my-2">
              <label className="pr-4" htmlFor="username">
                Username
              </label>
              <input type="text" id="username" name="username"></input>
            </div>

            <div className="my-2">
              <label className="pr-4" htmlFor="password">
                Password
              </label>
              <input type="password" id="password" name="password"></input>
            </div>

            <div className="my-2">
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
