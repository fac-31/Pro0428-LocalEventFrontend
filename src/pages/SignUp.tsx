import DirectButton from '../components/minor/DirectButton';

import '../styles/login.css';

export default function SignUp() {
  return (
    <div className="flex min-h-screen">
      <div className="m-auto min-w-1/2 border-b-3 border-t-3">
        <DirectButton text={'HOME'} route={'/'} />
        <div className="flex">
          <form className="inline-block m-auto">
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
