import React, { useRef, useState } from 'react';
import CredidentalInput from './CredidentalInput';
import WarriningFeedback from '../shared/WarriningFeedback';
import './../../styles/components/login/credidentalLoginWindow.scss';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../api/authHandle';
import { useNavigate } from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext';

const CredidentalLoginWindow = ({}) => {
  const {setUserId, fetchUserData} = useUserContext()
  const credidentalFormRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [inputBorders, setInputBorders] = useState({ email: '', password: '' });
  const navigate = useNavigate()

  const handleInputChange = (name, value) => {
    setErrorMessage('')
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setInputBorders((prevBorders) => ({
      ...prevBorders,
      [name]: '',
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBorders = { email: '', password: '' };
    let hasError = false;

    for (const key in formValues) {
      if (formValues[key] === '') {
        newBorders[key] = '#EE5353';
        hasError = true;
      }
    }

    setInputBorders(newBorders);
    if (hasError) {
      setErrorMessage('Obavezno polje');
    } else {
      setErrorMessage('');
      signInWithEmailAndPassword(auth, formValues.email, formValues.password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUserId(user.uid);
          fetchUserData(user.uid).then(()=>{
            navigate('/HomePage')
          })
        })
        .catch((error) => {
          const errorMessage = getFirebaseErrorByCode(error.code);
          setErrorMessage(errorMessage);
        });
    }
  };

  const getFirebaseErrorByCode = (errorCode) => {
    let errorMessage = ""
    if(errorCode === "auth/invalid-email"){
      errorMessage = "Neispravna email adresa"
    }else if(errorCode === "auth/invalid-credential"){
      errorMessage= "Neispravni prodaci"
    }else{
      errorMessage = "Pogreška pri prijavi. Pokušajte ponovno."
    }

    return errorMessage;
  }

  return (
    <div className="credidential-container">
      <h2>Prijava korisnika</h2>
      <form id="creditental-form" ref={credidentalFormRef} onSubmit={handleSubmit} noValidate>
        <div>
          <CredidentalInput
            type="email"
            value={formValues.email}
            onInputChange={handleInputChange}
            borderColor={inputBorders.email}
          />
          <CredidentalInput
            type="password"
            value={formValues.password}
            onInputChange={handleInputChange}
            borderColor={inputBorders.password}
          />
        </div>
        {errorMessage && <WarriningFeedback message={errorMessage} />}
        <button type="submit">Prijavi se</button>
      </form>
    </div>
  );
};

export default CredidentalLoginWindow;
