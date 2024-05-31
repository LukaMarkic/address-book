import React, { useRef, useState } from 'react'
import inputElements from "../../data/inputElements.json"
import './../../styles/components/contact-form/contactFormWindow.scss'
import ContactFormInput from './ContactFormInput'
import ContactFormDateInput from './ContactFormDateInput'
import ContactFormPhoneInput from './ContactFormPhoneInput'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc } from 'firebase/firestore'
import { getDatabaseCollection } from '../../api/firbaseInitalization'
import { getContactInfoDataFromForm, getInputErorrs } from '../../help/contactFormValidation'
import useContactsContext from '../../hooks/useContactContext'
import useUserContext from '../../hooks/useUserContext'

const ContactFormCreateContactWindow = () => {

  const inputElementsArray = inputElements.map(item => item);
  const formRef = useRef(null);
  const [formErrors, setFormErrors] = useState({});
  const {userData, updateUserContactIDs} = useUserContext()
  const contactCollection = getDatabaseCollection('contacts');
  const { fetchContacts, fetchContactsByIDs } = useContactsContext();
  const [resetAction, setResetAction] = useState(null);

  const notifySuccess = (message) => toast.success(message, {position: "bottom-center", autoClose: 6000, draggable: false});
  const notifyError = (message) => toast.error(message, {position: "bottom-center", autoClose: 6000, draggable: false});

  const handleSubmit = (e) => {
    e.preventDefault();
    const formElements = Array.from(formRef.current.elements);
    const errors = getInputErorrs(formElements);

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      saveContact();
    }
  };

  const saveContact = async () => {
    const formElements = Array.from(formRef.current.elements);
    const formData = getContactInfoDataFromForm(formElements); 
    try {
      const newContactRef = await addDoc(contactCollection, formData);
      notifySuccess("Kontakt je uspješno dodan");
      setResetAction(prev => !prev);
      if (userData && userData.status === "superadmin") {
        await fetchContacts();
      } else if (userData) {
        await updateUserContactIDs(userData.id, newContactRef.id);
        if (userData.contactsIDs) {
          await fetchContactsByIDs(userData.contactsIDs);
        }
      }
    } catch (error) {
      notifyError("Greška pri spremanju kontakta");
    }
    
  };

  return (
    <>
      <div className="contact-form-contianer">
        <h2>Obrazac stvaranja kontakta</h2>
        <form id="contact-form" ref={formRef} noValidate>
          <div className="contact-form-inputs-container">
            {inputElementsArray.map((item, index) => <ContactFormInput key={index} {...item} error={formErrors[item.name]} resetAction={resetAction}/>)}
            <ContactFormPhoneInput resetAction={resetAction}/>
            <ContactFormDateInput resetAction={resetAction} error={formErrors["birthdate"]}/>
          </div>
          <button className="contact-form-button" type="submit" onClick={handleSubmit}>Dodaj kontakt</button>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default ContactFormCreateContactWindow;
