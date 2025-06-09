import { useState, useEffect } from 'react';
import NavBar from '../components/major/nav-bar';
import { useAuth } from '../auth/useAuth';
import { Edit, Check } from 'lucide-react';
import DirectButton from '../components/minor/DirectButton';
import api from '../api/api';
import { useNavigate } from 'react-router';

export default function UserProfile() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [editField, setEditField] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(' ');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [fieldErrorStates, setFieldErrorStates] = useState({
    username: false,
    email: false,
    name_first: false,
    name_last: false,
  });

  useEffect(() => {
    if (user) {
      setEditedUser({ ...user });
    }
  }, [user]);

  const handleEditClick = (field) => {
    setEditField(field);
  };

  const handleInputChange = (e, field) => {
    setEditedUser((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSaveClick = () => {
    setEditField(null);
  };

  const handleResetClick = () => {
    setEditedUser({ ...user });
  };

  const handleSumbitClick = () => {
    setErrorMessage('This is permanent, are you sure?');
    setShowConfirmation(true);
  };

  const displayErrors = (error) => {
    if (typeof error === 'string') {
      setFieldErrorStates({
        username: false,
        email: false,
        name_first: false,
        name_last: false,
      });
      setErrorMessage(error);
    } else {
      const { username, email, name_first, name_last } = error;
      const messages = [
        username && 'Username is invalid',
        email && 'Email is invalid',
        name_first && 'First name is invalid',
        name_last && 'Last name is invalid',
      ]
        .filter(Boolean)
        .join('\n');

      setErrorMessage(messages || 'Invalid input');
      setFieldErrorStates({
        username: !!username,
        email: !!email,
        name_first: !!name_first,
        name_last: !!name_last,
      });
    }

    setTimeout(() => {
      setErrorMessage(' ');
    }, 6000);
  };

  const handleConfirmSubmit = async () => {
    try {
      setErrorMessage('Submitting...');
      const response = await api.put('/auth/me', editedUser);
      console.log('Submitted successfully:', response.data);
      displayErrors('Changes submitted.');
    } catch (error) {
      console.error('Error submitting changes:', error);
      const fieldErrors = error?.response?.data?.errors?.fieldErrors;
      const dbError = error?.response?.data?.errors?.message;

      if (fieldErrors) {
        displayErrors(fieldErrors);
      } else if (dbError) {
        displayErrors(dbError);
      } else {
        displayErrors('Failed to submit changes.');
      }
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleCancelSubmit = () => {
    setErrorMessage('');
    setShowConfirmation(false);
  };

  const renderFieldRow = (label, fieldKey) => (
    <tr className="border-b" key={fieldKey}>
      <td className="p-4 border-r-2 font-semibold text-left">{label}</td>
      <td className="p-4 text-left">
        {editField === fieldKey ? (
          <input
            type="text"
            value={editedUser?.[fieldKey] || ''}
            onChange={(e) => handleInputChange(e, fieldKey)}
            className={`border rounded px-2 py-1 w-full ${
              fieldErrorStates[fieldKey] ? 'border-red-500' : ''
            }`}
          />
        ) : (
          editedUser?.[fieldKey] || ''
        )}
      </td>
      <td className="p-4 text-center">
        {editField === fieldKey ? (
          <button
            onClick={handleSaveClick}
            className="hover:text-green-600"
            title="Save"
          >
            <Check size={18} />
          </button>
        ) : (
          <button
            onClick={() => handleEditClick(fieldKey)}
            className="hover:text-blue-600"
            title="Edit"
          >
            <Edit size={18} />
          </button>
        )}
      </td>
    </tr>
  );

  return (
    <div>
      <NavBar />

      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        {loading && <p>Loading...</p>}

        {!loading && user && editedUser && (
          <div className="w-full max-w-md">
            <h1 className="text-4xl p-4">{editedUser.username}</h1>
            <table className="table-auto w-full border border-gray-300 rounded shadow">
              <tbody>
                {renderFieldRow('Username', 'username')}
                {renderFieldRow('Email', 'email')}
                {renderFieldRow('First Name', 'name_first')}
                {renderFieldRow('Last Name', 'name_last')}
                <tr className="border-b">
                  <td
                    colSpan={3}
                    className="text-center p-4 hover:bg-[rgba(225,210,229,0.1)] transition-colors cursor-pointer"
                    onClick={() => {
                      navigate('/reset-password');
                    }}
                  >
                    <span className="text-l sm:text-xl">
                      Reset your password?
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="p-5 space-x-4 flex justify-center">
              <DirectButton
                text={'RESET'}
                onClick={handleResetClick}
                route="RESET"
              />
              <DirectButton
                text={'SUBMIT'}
                onClick={handleSumbitClick}
                route="SUBMIT"
              />
            </div>

            {errorMessage && (
              <div className="font-semibold min-h-[3.5rem] text-[var(--color-error)] whitespace-pre-line text-center mt-5">
                {errorMessage}
              </div>
            )}

            {showConfirmation && (
              <div className="text-center space-x-4 mt-2">
                <button
                  onClick={handleConfirmSubmit}
                  className="uppercase text-[var(--color-error)] hover:underline"
                >
                  CONFIRM
                </button>
                <button
                  onClick={handleCancelSubmit}
                  className="uppercase text-[var(--color-text)] hover:underline"
                >
                  CANCEL
                </button>
              </div>
            )}
          </div>
        )}

        {!loading && !user && <p>User not logged in.</p>}
      </div>
    </div>
  );
}
