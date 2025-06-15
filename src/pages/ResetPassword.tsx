import { useLocation } from 'react-router';
import { useAuth } from '../auth/useAuth';
import { useEffect, useState } from 'react';
import FormInput from '../components/minor/FormInput';
import DirectButton from '../components/minor/DirectButton';
import { updateUser } from '../api/services/auth'; // updated import

export default function ResetPassword() {
  const location = useLocation();
  const { user, loading, refreshUser } = useAuth();
  const [tokenChecked, setTokenChecked] = useState(false);

  const [formData, setFormData] = useState({
    password: '',
    confirmedPassword: '',
  });

  const [fieldErrorStates, setFieldErrorStates] = useState({
    password: false,
    confirmedPassword: false,
  });

  const [errorMessage, setErrorMessage] = useState(' ');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      refreshUser().finally(() => setTokenChecked(true));
    } else {
      setTokenChecked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (formData.password !== formData.confirmedPassword) {
      setFieldErrorStates({ password: true, confirmedPassword: true });
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const result = await updateUser({
        password: formData.password,
        confirmedPassword: formData.confirmedPassword,
      });

      if (result.errors) {
        if (result.errors.type === 'fieldErrors') {
          setFieldErrorStates({
            password: !!result.errors.fieldErrors.password,
            confirmedPassword: !!result.errors.fieldErrors.confirmedPassword,
          });
          setErrorMessage(
            [
              ...(result.errors.fieldErrors.password || []),
              ...(result.errors.fieldErrors.confirmedPassword || []),
            ].join('\n') || 'Invalid input',
          );
        } else if (result.errors.type === 'dbError') {
          setErrorMessage(result.errors.message);
        }
      } else {
        setErrorMessage(result.message || 'Password updated successfully');
        setFieldErrorStates({ password: false, confirmedPassword: false });
      }
    } catch (error) {
      setErrorMessage('Unexpected error occurred.');
      console.error('Unexpected error:', error);
    }

    setTimeout(() => {
      setErrorMessage(' ');
    }, 6000);
  }

  if (!tokenChecked || loading) {
    return <p>Checking...</p>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-center text-3xl">
          Oops, You don't have permission to be here.
        </p>
        <DirectButton text="Take me home" route="/" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="m-auto w-full max-w-md px-4">
        <p className="text-2xl text-center ">{user.username}</p>
        <div className="border-b-3 border-t-3">
          <div className="flex">
            <form
              className="inline-block m-auto mt-4 mb-4"
              onChange={handleChange}
              onSubmit={handleSubmit}
            >
              <FormInput
                name="password"
                label="New password"
                type="password"
                error={fieldErrorStates.password}
              />
              <FormInput
                name="confirmedPassword"
                label="Confirm password"
                type="password"
                error={fieldErrorStates.confirmedPassword}
              />
              <input
                className="uppercase w-full mt-2 text-[var(--color-text)] border border-[var(--color-text)]"
                type="submit"
                value="Change password"
              />
            </form>
          </div>
        </div>
        <DirectButton text="HOME" route="/" />
        {errorMessage && (
          <p className="font-semibold min-h-[3.5rem] text-center mt-5 text-[var(--color-error)] whitespace-pre-line">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
