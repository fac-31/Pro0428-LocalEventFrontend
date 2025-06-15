import '../styles/login.css';
import DirectButton from '../components/minor/DirectButton';
import FormInput from '../components/minor/FormInput';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { FieldErrors, login } from '../api/services/auth.ts';
import { useAuth } from '../auth/useAuth.tsx';
import { UserLogInInput } from 'models/user.model.ts';

export default function Login() {
  const [formData, setFormData] = useState<UserLogInInput>({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(' ');
  const [fieldErrorStates, setFieldErrorStates] = useState({
    username: false,
    password: false,
  });
  const [showResetLink, setShowResetLink] = useState(false);

  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const handleChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const displayErrors = (error: string | FieldErrors, type?: string) => {
    if (typeof error === 'string') {
      setFieldErrorStates({ username: false, password: false });
      setErrorMessage(error);
    } else {
      const { username, password } = error;
      const messages = [
        username && 'Username too short',
        password && 'Password too short',
      ]
        .filter(Boolean)
        .join('\n');

      setErrorMessage(messages || 'Invalid input');
      setFieldErrorStates({
        username: !!username,
        password: !!password,
      });
    }
    setShowResetLink(type === 'dbError');

    setTimeout(() => {
      setErrorMessage(' ');
    }, 6000);
  };

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const { token, errors } = await login(formData);

    if (token) {
      localStorage.setItem('token', token);
      await refreshUser();
      navigate('/userhome');
    } else if (errors) {
      switch (errors.type) {
        case 'dbError':
          displayErrors(errors.message, 'dbError');
          break;
        case 'fieldErrors':
          displayErrors(errors.fieldErrors);
          break;
        default:
          displayErrors('An unknown error occurred.');
          break;
      }
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="m-auto w-full max-w-md px-4">
        <div className="border-b-3 border-t-3">
          <DirectButton text={'HOME'} route={'/'} />
          <div className="flex mt-3 mb-3">
            <form
              className="inline-block m-auto"
              onChange={handleChange}
              onSubmit={handleLogin}
            >
              <FormInput
                name="username"
                label="Username"
                error={fieldErrorStates.username}
              />
              <FormInput
                name="password"
                label="Password"
                type="password"
                error={fieldErrorStates.password}
              />

              <div>
                <input
                  className="uppercase w-full text-[var(--color-text)] border border-[var(--color-text)]"
                  type="submit"
                  value="Log In"
                />
              </div>
            </form>
          </div>
          <DirectButton text={'SIGN UP'} route={'/signup'} />
        </div>

        {/* Show reset link only if a dbError occurred */}
        {showResetLink && (
          <div className="text-sm mt-1">
            <Link
              to="/request-password-reset"
              className="underline text-[var(--color-text)] hover:text-[var(--color-error)]"
            >
              Reset your password?
            </Link>
          </div>
        )}

        {errorMessage && (
          <div className="font-semibold min-h-[3.5rem] text-[var(--color-error)] whitespace-pre-line text-center mt-5">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}
