import React, { useEffect, useState } from 'react'
import AddNewContactIcon from './../images/icons/add-new-contact-icon.svg'
import InfoWidget from '../components/home/InfoWidget'
import ActionWidget from '../components/home/ActionWidget'
import { useNavigate } from 'react-router-dom'
import './../styles/components/pages/homePage.scss'
import ContactTableWindow from '../components/home/ContactTableWindow'
import useContactsContext from '../hooks/useContactContext'
import useUserContext from '../hooks/useUserContext'
import { auth } from '../api/authHandle'
import { onAuthStateChanged } from 'firebase/auth'

const HomePage = ({}) => {
  const {setUserId, userData} = useUserContext()
  const navigate = useNavigate();
  const {contactsCount, fetchContacts, fetchContactsByIDs} = useContactsContext()
  const handleWidgetActionClick = () => {
      navigate("/ContactForm", { state: { type: "create"} });
  }

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

    useEffect(() => {
        if(userData && userData.status === "superadmin"){
          fetchContacts();
        }else if(userData && userData.contactsIDs){
          fetchContactsByIDs(userData.contactsIDs)
        }
        
      }, [userData]);

  return (
    <div className='home-page'>
        <div className='home-page-widget-segment'>
            <InfoWidget title={userData ? userData.name : "Nepoznat korisnik"} messageStyle={userData && userData.status === "superadmin" ? {color: "#2E6B09"} : null} message={userData ? userData.status : "-"} />
            <InfoWidget title={"Broj korisnika"} message={contactsCount ? contactsCount : "-"} />
            <ActionWidget onClick={handleWidgetActionClick}>
                <h3>Stvori novog kontakta</h3>
                <div class="home-page-aside-segemen-img-container">
                    <img alt="add-new-contact-img" src={AddNewContactIcon}/>
                </div>
            </ActionWidget>
        </div>
        <ContactTableWindow />
    </div>
  )
}

export default HomePage

