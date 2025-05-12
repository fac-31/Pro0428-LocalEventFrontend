export default function Login() {
  return (
    <div className="flex min-h-screen">
      <div className="m-auto min-w-1/2">
        <div className="uppercase border-t-3 border-solid mb-8">Home</div>
        <div className="flex">
          <form className="inline-block m-auto">
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
        <div className="uppercase border-b-3 border-solid mt-8">Sign Up</div>
      </div>
    </div>
  );
}
