import React from 'react'
import EditContactIcon from './../../images/icons/edit-icon.svg'
import DeleteContactIcon from './../../images/icons/delete-icon.svg'
import ProfileIcon from './../../images/icons/profile-icon.svg'
import BirthdateIcon from './../../images/icons/bith-date-icon.svg'
import EmailIcon from './../../images/icons/email-icon.svg'
import PhoneNumberIcon from './../../images/icons/phone-number-icon.svg'
import AddressIcon from './../../images/icons/address-icon.svg'
import ZipCodeNumberIcon from './../../images/icons/zip-icon.svg'
import InfoModalSegemnt from './InfoModalSegemnt'
import { formatPhoneNumberDisplay } from '../../help/valueFormatter'
import './../../styles/components/shared/infoModalContent.scss'

const InfoModalContent = ({contact, onEditAction, onDeleteAction=null}) => {

  return (
        <div className="info-modal-content">
            <div className="info-modal-content-main">
                <div className="modal-window-contact-info-header">
                    <img alt="profile-image-icon" src={ProfileIcon} />
                    <h2 id="fullname-text">{contact.name + " " + contact.surname}</h2>
                </div>
                <div className="modal-window-contact-info-segemnt-container">
                    <div>
                        {contact.birthdate && <InfoModalSegemnt segemntIcon={BirthdateIcon} message={contact.birthdate}/>}
                        {contact.email && <InfoModalSegemnt segemntIcon={EmailIcon} message={contact.email} linkTo={`mailto:${contact.email}`}/>}
                        {contact.phonenumber && <InfoModalSegemnt segemntIcon={PhoneNumberIcon} message={formatPhoneNumberDisplay(contact.phonenumber)}/>}
                    </div>
                    <div>
                        {contact.address && <InfoModalSegemnt segemntIcon={AddressIcon} message={contact.address} />}
                        {contact.zip && <InfoModalSegemnt segemntIcon={ZipCodeNumberIcon} message={contact.zip} />}
                    </div>
                </div>
            </div>
            <div className="info-modal-window-buttons-container">
                <button className="edit-contact-btn" onClick={onEditAction && onEditAction}>
                    <img alt="edit-contact" src={EditContactIcon} />
                    <p>Uredi kontakt</p>
                </button>
                {onDeleteAction &&  
                    <button className="delete-contact-btn" onClick={onDeleteAction}>
                        <img alt="delete-contact" src={DeleteContactIcon} />
                        <p>Izbriši kontakt</p>
                    </button>
                    }
            </div>
        </div>
  )
}

export default InfoModalContent




