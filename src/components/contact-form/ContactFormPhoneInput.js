import React, { useEffect, useState } from 'react';
import phonePrefixs from "../../data/phonePrefix.json";
import './../../styles/components/contact-form/contactFormPhoneInput.scss';
import { getFormattedTelSufix, getOnlyDigits } from '../../help/valueFormatter';

const ContactFormPhoneInput = ({ telPrefix, telSufix, resetAction }) => {
  const prefixArray = phonePrefixs.map(item => item.prefix);
  const maxLength = 8;
  const [curretTelPrefixInput, setCurrentTelPrefixInput] = useState(telPrefix);
  const [curretTelSufixInput, setCurrentTelSufixInput] = useState(telSufix);

  const handelSufixInput = (e) => {
    const { value } = e.target;
    let newValue = getOnlyDigits(value);
    newValue = getFormattedTelSufix(newValue);
    if (newValue.length > maxLength) {
      newValue = newValue.substring(0, maxLength);
    }
    setCurrentTelSufixInput(newValue);
  };

  useEffect(() => {
    setCurrentTelPrefixInput(telPrefix);
  }, [telPrefix]);

  useEffect(() => {
    if (telSufix) {
      setCurrentTelSufixInput(getFormattedTelSufix(telSufix));
    }
  }, [telSufix]);


  useEffect(()=>{
    setCurrentTelSufixInput('')
  }, [resetAction])

  return (
    <div className="contact-tel-input-container">
      <label htmlFor="contact-tel-sufix">Broj telefona</label>
      <div>
        <select
          id="contact-tel-prefix"
          name="tel-prefix"
          value={curretTelPrefixInput}
          onChange={(e) => setCurrentTelPrefixInput(e.target.value)}
        >
          {prefixArray.map((value, index) => (
            <option value={value} key={index}>
              {value}
            </option>
          ))}
        </select>
        <input
          onInput={handelSufixInput}
          value={curretTelSufixInput}
          id="contact-tel-sufix"
          name="tel-sufix"
          type="tel"
          placeholder="111-2222"
          maxLength="8"
        />
      </div>
    </div>
  );
};

export default ContactFormPhoneInput;
