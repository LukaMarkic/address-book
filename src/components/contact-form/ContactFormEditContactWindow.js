import React, { useEffect, useRef, useState } from 'react'
import inputElements from "../../data/inputElements.json"
import './../../styles/components/contact-form/contactFormWindow.scss'
import ContactFormInput from './ContactFormInput'
import ContactFormDateInput from './ContactFormDateInput'
import ContactFormPhoneInput from './ContactFormPhoneInput'
import ModalWindow from '../shared/ModalWindow'
import AlertModalContent from '../shared/AlertModalContent'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDatabaseCollection, updateDocumentById } from '../../api/firbaseInitalization'
import { getContactInfoDataFromForm, getInputErorrs } from '../../help/contactFormValidation'
import { useNavigate } from 'react-router-dom'
import useContactsContext from '../../hooks/useContactContext'
import { getUnformatedDateInput } from '../../help/valueFormatter'
import useUserContext from '../../hooks/useUserContext'

const ContactFormEditContactWindow = ({contactId}) => {
  const modalRef = useRef();
  const navigate = useNavigate();
  const {userData} = useUserContext()
  const { contacts, fetchContacts, fetchContactsByIDs } = useContactsContext();
  const inputElementsArray = inputElements.map(item => item);
  const formRef = useRef(null);
  const [formErrors, setFormErrors] = useState({});
  const contactCollection = getDatabaseCollection('contacts');
  const [currentContactInfo, setCurrentContactInfo] = useState(null)

  const closeModal = () => {
    modalRef.current.closeModal();
  };

  const notifySucess = (message) => toast.success(message, {position: "bottom-center", autoClose: 6000, draggable: false});
  const notifyError = (message) => toast.error(message, {position: "bottom-center", autoClose: 6000, draggable: false});

  const handleSubmit = (e) => {
    e.preventDefault();
    const formElements = Array.from(formRef.current.elements);
    const errors = getInputErorrs(formElements)

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      modalRef.current.openModal();
    }
  };

  const handleUpdateContactInfo = () => {
    const formElements = Array.from(formRef.current.elements);
    const formData = getContactInfoDataFromForm(formElements)
    closeModal();
    updateDocumentById(contactCollection, contactId, formData).then(()=>{
      if(userData && userData.status === "superadmin"){
        fetchContacts();
      }else if(userData && userData.contactsIDs){
        fetchContactsByIDs(userData.contactsIDs)
      }
      notifySucess("Uspješna izmjena podataka kontakta");
      setTimeout(() => navigate("/HomePage"), 4200)
    }).catch((error) => notifyError(error))
  };

  useEffect(()=>{
    const currentContactObject = contacts.filter(contact => contact.id === contactId)
    if(currentContactObject.length > 0){
      let currentContact = {...currentContactObject[0]}
      console.log(currentContactObject)
      if(currentContact["phonenumber"].substring(0,2) === "01"){
        currentContact["tel-prefix"] = currentContact["phonenumber"].substring(0,2);
        currentContact["tel-sufix"] = currentContact["phonenumber"].substring(2, currentContact["phonenumber"].length);
      }else{
        currentContact["tel-prefix"] = currentContact["phonenumber"].substring(0,3);
        currentContact["tel-sufix"] = currentContact["phonenumber"].substring(3, currentContact["phonenumber"].length);
      }
      currentContact["birthdate"] = getUnformatedDateInput(currentContact["birthdate"]);
      setCurrentContactInfo(currentContact)
    }else{
      navigate("/HomePage")
    }
  }, [])

  return (
      <>
        <div className="contact-form-contianer">
          <h2>Obrazac uređivanja kontakta</h2>
          <form id="contact-form" ref={formRef} noValidate>
              <div className="contact-form-inputs-container">
                {inputElementsArray.map((item, index) => <ContactFormInput key={index} {...item} value={currentContactInfo ? currentContactInfo[item.name] : ''} error={formErrors[item.name]}/>)}
                <ContactFormPhoneInput telPrefix={currentContactInfo && currentContactInfo["tel-prefix"]} telSufix={currentContactInfo && currentContactInfo["tel-sufix"]}/>
                <ContactFormDateInput error={formErrors["birthdate"]} value={currentContactInfo && currentContactInfo.birthdate}/>
              </div>
              <button className="contact-form-button" type="submit" onClick={handleSubmit}>Uredi kontakt</button>
          </form>
        </div>
        <ModalWindow ref={modalRef} title="Upozorenje">
            <AlertModalContent message={"Jeste li sigurni da želite spremiti navedne izmjene?"} submitBtnAction={handleUpdateContactInfo} cancelBtnAction={closeModal}/>
        </ModalWindow>
        <ToastContainer />
      </>
  )
}

export default ContactFormEditContactWindow

