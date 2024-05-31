import React, { useRef, useState } from 'react'
import './../../styles/components/login/credidentalInput.scss'
import ToggleIconButton from '../shared/ToggleIconButton'
import PasswordHiddenIcon from './../../images/icons/pswd-hidden.svg'
import PasswordVisibleIcon from './../../images/icons/pswd-visble.svg' 


const CredidentalInput = ({ type = 'email', labelContent, value, onInputChange, borderColor }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    onInputChange(name, value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

  return (
    <div className="credidential-container-input-continer" >
      <label>{labelContent ? labelContent : type === 'email' ? 'Email adresa' : 'Zaporka'}</label>
      <div style={{ borderColor }}>
        <input
          type={inputType}
          name={type}
          value={value}
          onChange={handleChange}
          placeholder={type === 'email' ? 'ime.prezime@gmail.com' : ''}
        />
        {type === 'password' && (
          <ToggleIconButton
            onClick={togglePasswordVisibility}
            addLeftDivider={true}
            inactiveImage={PasswordHiddenIcon}
            activeImage={PasswordVisibleIcon}
          />
        )}
      </div>
    </div>
  );
};

export default CredidentalInput;



