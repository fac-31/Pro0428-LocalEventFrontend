import { useLocation } from 'react-router';
import { useAuth } from '../auth/useAuth';
import { useEffect, useState } from 'react';
import FormInput from '../components/minor/FormInput';

export default function ResetPassword() {
  const location = useLocation();
  const { user, loading, refreshUser } = useAuth();
  const [tokenChecked, setTokenChecked] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmedPassword: '',
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      refreshUser().finally(() => setTokenChecked(true));
    } else {
      setTokenChecked(true);
    }
  }, []);

  if (!tokenChecked || loading) {
    return <p>Checking...</p>;
  }

  if (!user) {
    return <p>Oops, token is invalid or expired.</p>;
  }

  const handleChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(
      formData,
      'this needs to go to non-existant update user route with auth',
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="m-auto w-full max-w-md px-4">
        <p className="text-2xl text-center">{user.username}</p>
        <div className="border-b-3 border-t-3">
          <div className="flex">
            <form
              className="inline-block m-auto mt-4 mb-4"
              onChange={handleChange}
              onSubmit={handleSubmit}
            >
              <FormInput
                name="password"
                label="new password"
                type="password"
              ></FormInput>
              <FormInput
                name="confirmedPassword"
                label="confirm password"
                type="password"
              ></FormInput>

              <input
                className="uppercase w-full mt-2"
                type="submit"
                value="Change password"
              ></input>
            </form>
          </div>
        </div>
        <p className="text-red-400">ugly errors to be fixed: </p>
      </div>
    </div>
  );
}
