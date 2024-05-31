import React, { useEffect, useState } from 'react'
import './../../styles/components/contact-form/contactFormInput.scss'
import ContactFormErrorMessage from './ContactFormErrorMessage';
import { getOnlyDigits, getStringWithoutDigits } from '../../help/valueFormatter';

const ContactFormInput = ({label, name, type, placeholder, isRequired, value, width, error, resetAction}) => {
  const [inputError, setInputError] = useState(error);
  const [curretInput, setCurrentInput] = useState(value);
  const handleInput = (e) => {
    const { value } = e.target;
    let newValue = value;

    if (name === 'name' || name === 'surname') {
      newValue = getStringWithoutDigits(value)
    }else if(name === "zip"){
      newValue = getOnlyDigits(value)
      if(newValue !== "" && newValue.length > 5){
        newValue = newValue.substring(0, 5)
      }
    }

    setCurrentInput(newValue)

    if (inputError) {
      setInputError('');
    }
  };

  useEffect(() => {
    setInputError(error);
  }, [error]);

  const defaultStyle = {
    width: width
  }

  const errorStyle = {
    width: width,
    borderColor: "#EE5353"
  }

  useEffect(()=>{
    setCurrentInput(value)
  },[value])

  useEffect(()=>{
    setCurrentInput('')
  }, [resetAction])

  return (
    <div className={"contact-input-container"}>
        <label htmlFor={`contact-${name}`}>{label}</label>
        <input onInput={handleInput} id={`contact-${name}`} style={inputError ? errorStyle : defaultStyle} name={name} type={type} placeholder={placeholder} required={isRequired} value={curretInput}/>
        {inputError && <ContactFormErrorMessage error={inputError}/>}
    </div>
  )
}

export default ContactFormInput




