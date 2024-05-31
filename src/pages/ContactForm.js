import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './../styles/components/pages/contactForm.scss'
import ContactFormCreateContactWindow from '../components/contact-form/ContactFormCreateContactWindow';
import ContactFormEditContactWindow from '../components/contact-form/ContactFormEditContactWindow';
import useUserContext from '../hooks/useUserContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../api/authHandle';

const ContactForm = ({}) => {
    const {setUserId} = useUserContext()
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              setUserId(uid)
            } else {
              setUserId(null)
              navigate("/LoginPage")
            }
          });
        }, [])

    if (location.state === null) {
        navigate("/ContactForm", { state: { type: "create"} });
        return null;
    }


    const {type}  = location.state;
    
    return (
        <div className='contact-form'>
           {type === "update" ? <ContactFormEditContactWindow contactId={location.state.contactId}/> : <ContactFormCreateContactWindow />}
        </div>
    )
}

export default ContactForm

