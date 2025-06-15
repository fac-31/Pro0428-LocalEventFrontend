import '../styles/login.css';
import DirectButton from '../components/minor/DirectButton.tsx';
import FormInput from '../components/minor/FormInput.tsx';
import { useState } from 'react';
import api from '../api/api.ts';

export default function ResetRequest() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSending(true);
    setErrorMessage('');
    setSuccess(false);

    try {
      const res = await api.post('/auth/request-password-reset', { email });

      if (res?.data?.message) {
        setSuccess(true);
        setErrorMessage(res.data.message);
      } else {
        setErrorMessage('Unexpected response from server.');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Error sending reset link. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="m-auto w-full max-w-md px-4">
        <div className="border-b-3 border-t-3">
          <DirectButton text="HOME" route="/" />
          <div className="flex mt-3 mb-3">
            <form
              className="inline-block m-auto"
              onSubmit={handleSubmit}
              onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            >
              <FormInput
                name="email"
                label="Email"
                type="email"
                disabled={success || isSending}
              />
              {!success && (
                <input
                  className="uppercase w-full mt-1 text-[var(--color-text)] border border-[var(--color-text)] cursor-pointer"
                  type="submit"
                  value="Send Request"
                  disabled={isSending}
                />
              )}
            </form>
          </div>
          <DirectButton text="LOG IN" route="/login" />
        </div>
        {isSending && !success && (
          <div className="font-semibold min-h-[3.5rem] text-center mt-5 text-[var(--color-text)]">
            Sending...
          </div>
        )}
        {!isSending && errorMessage && (
          <div
            className={`font-semibold min-h-[3.5rem] text-center mt-5 ${
              success ? 'text-green-500' : 'text-[var(--color-error)]'
            }`}
          >
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}
