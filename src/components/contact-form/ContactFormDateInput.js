import React, { useEffect, useState } from 'react'
import './../../styles/components/contact-form/contactFormDateInput.scss'
import ContactFormErrorMessage from './ContactFormErrorMessage';

const ContactFormDateInput = ({error, value, resetAction }) => {

  const [inputError, setInputError] = useState(error);
  const [curretInput, setCurrentInput] = useState(value);
  
  const handleChange = (e) => {
    const { value } = e.target;
    let newValue = value;
    const selectedDate = new Date(value);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    if (selectedDate > today) {
      newValue = today.toISOString().split('T')[0];
    }

    setCurrentInput(newValue);
    if (inputError) {
      setInputError('');
    }
  };

  useEffect(() => {
    setInputError(error);
  }, [error]);

  useEffect(()=>{
    setCurrentInput(value)
  },[value])

  const errorStyle = {
    borderColor: "#EE5353"
  }

  useEffect(()=>{
    setCurrentInput('')
  }, [resetAction])

  const today = new Date().toISOString().split('T')[0];
  return (
    <div className="contact-form-date-input">
      <label htmlFor="contact-birthdate">Datum rođenja</label>
      <input onChange={handleChange} id="contact-birthdate" style={inputError ? errorStyle: {}} name="birthdate" type="date" max={today} value={curretInput} required/>
      {inputError && <ContactFormErrorMessage error={inputError}/>}
    </div>
  )
}

export default ContactFormDateInput

