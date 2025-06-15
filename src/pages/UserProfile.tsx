import { useState, useEffect } from 'react';
import NavBar from '../components/major/nav-bar';
import { useAuth } from '../auth/useAuth';
import { Edit, Check } from 'lucide-react';
import DirectButton from '../components/minor/DirectButton';
import { useNavigate } from 'react-router';
import {
  SafeUser,
  UserUpdateSchema as UserUpdateType,
} from 'models/user.model.ts';
import { updateUser } from '../api/services/auth';
import { AxiosError } from 'axios';

type EditableField = keyof Pick<
  SafeUser,
  'username' | 'email' | 'name_first' | 'name_last'
>;
type FieldErrorState = Record<EditableField, boolean>;

export default function UserProfile() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [editField, setEditField] = useState<EditableField | null>(null);
  const [editedUser, setEditedUser] = useState<UserUpdateType | null>(null);
  const [errorMessage, setErrorMessage] = useState(' ');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [fieldErrorStates, setFieldErrorStates] = useState<FieldErrorState>({
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

  const handleEditClick = (field: EditableField) => {
    setEditField(field);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: EditableField,
  ) => {
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

  const resetForm = () => {
    setEditedUser({ ...user });
    setFieldErrorStates({
      username: false,
      email: false,
      name_first: false,
      name_last: false,
    });
  };

  const handleConfirmSubmit = async () => {
    if (!editedUser) return;

    try {
      setErrorMessage('Submitting...');
      const result = await updateUser(editedUser);

      if (result.errors) {
        resetForm();

        if (result.errors.type === 'fieldErrors') {
          const fieldErrors = result.errors.fieldErrors;

          setFieldErrorStates({
            username: !!fieldErrors.username,
            email: !!fieldErrors.email,
            name_first: !!fieldErrors.name_first,
            name_last: !!fieldErrors.name_last,
          });

          const errorMessages = [
            ...(fieldErrors.username || []),
            ...(fieldErrors.email || []),
            ...(fieldErrors.name_first || []),
            ...(fieldErrors.name_last || []),
          ];

          setErrorMessage(errorMessages.join('\n') || 'Invalid input');
        } else if (result.errors.type === 'dbError') {
          setErrorMessage(result.errors.message);
        }
      } else {
        setErrorMessage('Changes submitted.');
        setFieldErrorStates({
          username: false,
          email: false,
          name_first: false,
          name_last: false,
        });
      }
    } catch (err: unknown) {
      resetForm();

      if (err instanceof AxiosError) {
        const axiosData = err.response?.data;

        if (axiosData?.errors?.fieldErrors) {
          const fieldErrors = axiosData.errors.fieldErrors;

          setFieldErrorStates({
            username: !!fieldErrors.username,
            email: !!fieldErrors.email,
            name_first: !!fieldErrors.name_first,
            name_last: !!fieldErrors.name_last,
          });

          const errorMessages = [
            ...(fieldErrors.username || []),
            ...(fieldErrors.email || []),
            ...(fieldErrors.name_first || []),
            ...(fieldErrors.name_last || []),
          ];

          setErrorMessage(errorMessages.join('\n') || 'Invalid input');
        } else if (axiosData?.errors?.message) {
          setErrorMessage(axiosData.errors.message);
        } else {
          setErrorMessage('Failed to submit changes.');
        }
      } else {
        console.error('Unexpected error:', err);
        setErrorMessage('Unexpected error occurred.');
      }
    } finally {
      setShowConfirmation(false);
      setTimeout(() => {
        setErrorMessage(' ');
      }, 6000);
    }
  };

  const handleCancelSubmit = () => {
    setErrorMessage('');
    setShowConfirmation(false);
  };

  const renderFieldRow = (label: string, fieldKey: EditableField) => (
    <tr className="border-b" key={fieldKey}>
      <td className="p-4 border-r-2 font-semibold text-left text-[var(--color-text)]">
        {label}
      </td>
      <td className="p-4 text-left text-[var(--color-text)]">
        {editField === fieldKey ? (
          <input
            type="text"
            value={editedUser?.[fieldKey] || ''}
            onChange={(e) => handleInputChange(e, fieldKey)}
            className={`border rounded px-2 py-1 w-full bg-[var(--color-input-bg)] text-[var(--color-text)] ${
              fieldErrorStates[fieldKey]
                ? 'border-[var(--color-error)]'
                : 'border-[var(--color-text)]'
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
            className="hover:text-[var(--color-border-charity)]"
            title="Save"
          >
            <Check size={18} />
          </button>
        ) : (
          <button
            onClick={() => handleEditClick(fieldKey)}
            className="hover:text-[var(--color-border-music)]"
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
        {loading && <p className="text-[var(--color-text)]">Loading...</p>}

        {!loading && user && editedUser && (
          <div className="w-full max-w-md">
            <h1 className="text-4xl p-4 text-[var(--color-text)]">
              {editedUser.username}
            </h1>

            <table className="table-auto w-full border border-[var(--color-text)] rounded shadow">
              <tbody>
                {renderFieldRow('Username', 'username')}
                {renderFieldRow('Email', 'email')}
                {renderFieldRow('First Name', 'name_first')}
                {renderFieldRow('Last Name', 'name_last')}
                <tr className="border-b">
                  <td
                    colSpan={3}
                    className="text-center p-4 hover:bg-[var(--color-input-bg)] transition-colors cursor-pointer text-[var(--color-text)]"
                    onClick={() => navigate('/reset-password')}
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
                text="RESET"
                onClick={handleResetClick}
                route="RESET"
              />
              <DirectButton
                text="SUBMIT"
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

        {!loading && !user && (
          <p className="text-[var(--color-error)]">User not logged in.</p>
        )}
      </div>
    </div>
  );
}
