import React, { useState } from 'react';
import './../../styles/components/shared/changePasswordForm.scss'; // Create a corresponding SCSS file for styling
import { auth } from '../../api/authHandle';
import CredidentalInput from '../login/CredidentalInput';
import { reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';

const ChangePasswordForm = ({ onSubmitAction }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (name, value) => {
    if (name === 'oldPassword') {
      setOldPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!oldPassword || !newPassword) {
      setError('Obavezno polje');
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      setError('Ni jedan korinsik nije trenutno prijavljen');
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, oldPassword);

    try {
      // Re-authenticate the user
      await reauthenticateWithCredential(user, credential);

      // Update the password
      await updatePassword(user, newPassword);
      if(onSubmitAction) onSubmitAction();
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      setError(getAuthFeedbackByErrorCode(error.code));
    }
  };

  const getAuthFeedbackByErrorCode = (errorCode) => {
    let errorMessage = ""
    if(errorCode === "auth/invalid-credential"){
      errorMessage = "Neispravni podaci"
    }else if(errorCode === "auth/weak-password"){
      errorMessage = "Zaporka je preslaba. Potebno je najmanje 6 znakova."
    }else{
      errorMessage = "Pogreška pri izmjeni"
    }

    return errorMessage;
  }

  return (
    <div className="change-password-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <CredidentalInput
            type="password"
            labelContent="Trenutna zaporka"
            value={oldPassword}
            onInputChange={(name, value) => handleInputChange('oldPassword', value)}
          />
        </div>
        <div className="form-group">
          <CredidentalInput
            type="password"
            labelContent="Nova zaporka"
            value={newPassword}
            onInputChange={(name, value) => handleInputChange('newPassword', value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Promjeni zaporku</button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
