import React, { useEffect, useRef, useState } from 'react';
import './../../styles/components/home/contactTable.scss';
import MoveLeftIcon from './../../images/icons/go-left-icon.svg';
import MoveRightIcon from './../../images/icons/go-right-icon.svg';
import useContactsContext from '../../hooks/useContactContext';
import HoverIconButton from '../shared/HoverIconButton';
import SeeContactInfoIcon from './../../images/icons/see-contact-info.svg';
import SeeContactInfoHoverIcon from './../../images/icons/see-contact-info-hover.svg';
import EditContactInfoIcon from './../../images/icons/edit-contact-icon.svg';
import EditContactInfoHoverIcon from './../../images/icons/edit-contact-icon-hover.svg';
import DeleteContactIcon from './../../images/icons/delete-user-icon.svg';
import DeleteContactHoverIcon from './../../images/icons/delete-user-icon-hover.svg';
import { formatPhoneNumberDisplay } from '../../help/valueFormatter';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import ModalWindow from '../shared/ModalWindow';
import AlertModalContent from '../shared/AlertModalContent';
import { deleteDocumentById, getDatabaseCollection } from '../../api/firbaseInitalization';
import { useNavigate } from 'react-router-dom';
import InfoModalContent from '../shared/InfoModalContent';
import useUserContext from '../../hooks/useUserContext';

const ContactTable = ({ viewPerPage, pageNumber }) => {
  const { userData, removeIdFromContactsIDs } = useUserContext();
  const { contacts, fetchContacts, fetchContactsByIDs } = useContactsContext();
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [selectedContactId, setSelectedContactId] = useState();
  const [selectedContactInfo, setSelectedContactInfo] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (tableRef.current) {
        setMaxScroll(tableRef.current.scrollWidth - tableRef.current.clientWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        setScrollPos(tableRef.current.scrollLeft);
      }
    };

    if (tableRef.current) {
      tableRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tableRef.current) {
        tableRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleScroll = (direction) => {
    const scrollAmount = 58;
    let newScrollPos = direction === 'left' ? scrollPos - scrollAmount : scrollPos + scrollAmount;

    newScrollPos = Math.max(0, Math.min(newScrollPos, maxScroll));
    if (tableRef.current) {
      tableRef.current.scrollTo({ left: newScrollPos, behavior: 'smooth' });
    }

    setScrollPos(newScrollPos);
  };

  const notifySucess = (message) => toast.success(message, { position: "bottom-center", autoClose: 6000, draggable: false });
  const notifyError = (message) => toast.error(message, { position: "bottom-center", autoClose: 6000, draggable: false });

  const alertModalRef = useRef();
  const infoModalRef = useRef();

  const closeAlertModal = () => {
    alertModalRef.current.closeModal();
  };

  const closeInfoModal = () => {
    infoModalRef.current.closeModal();
  };

  const openInfoModalWindow = (contactInfo) => {
    setSelectedContactInfo(contactInfo);
    infoModalRef.current.openModal();
  };

  const openDeleteUserModalWindow = (id) => {
    setSelectedContactId(id);
    alertModalRef.current.openModal();
  };

  const handleDeleteInfo = () => {
    const contactCollection = getDatabaseCollection("contacts");
    closeAlertModal();
    deleteDocumentById(contactCollection, selectedContactId).then(() => {
      removeIdFromContactsIDs(userData.id, selectedContactId).then(() => {
        notifySucess("Uspješno brisanje kontakta");
        if (userData && userData.status === "superadmin") {
          fetchContacts();
        } else if (userData && userData.contactsIDs) {
          fetchContactsByIDs(userData.contactsIDs);
        }
      });
    }).catch((error) => notifyError(error));
  };

  const handleEditContact = (contactId) => {
    navigate("/ContactForm", { state: { type: "update", contactId: contactId } });
  };

  const handleDeleteContactFromModalInfo = (id) => {
    closeInfoModal();
    openDeleteUserModalWindow(id);
  };

  // Page logika
  const indexOfLastContact = pageNumber * viewPerPage;
  const indexOfFirstContact = indexOfLastContact - viewPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  return (
    <>
      <div className="contacts-table-container" ref={tableRef}>
        <table className='contact-content-table'>
          <ContactTableHeader
            handleScroll={handleScroll}
            scrollPos={scrollPos}
            maxScroll={maxScroll}
          />
          <ContactTableBody
            currentContacts={currentContacts}
            indexOfFirstContact={indexOfFirstContact}
            handleEditContact={handleEditContact}
            openInfoModalWindow={openInfoModalWindow}
            openDeleteUserModalWindow={openDeleteUserModalWindow}
            userData={userData}
          />
          </table>
      </div>
      <ModalWindow ref={infoModalRef} title="Podaci o kontaktu">
        {selectedContactInfo && (
          <InfoModalContent
            contact={selectedContactInfo}
            onEditAction={() => handleEditContact(selectedContactInfo.id)}
            onDeleteAction={userData && (userData.status === "admin" || userData.status === "superadmin") ? () => handleDeleteContactFromModalInfo(selectedContactInfo.id) : null}
          />
        )}
      </ModalWindow>
      <ModalWindow ref={alertModalRef} title="Upozorenje">
        <AlertModalContent message={"Jeste li sigurni da želite izbrisati kontakt?"} submitBtnAction={handleDeleteInfo} cancelBtnAction={closeAlertModal} />
      </ModalWindow>
      <ToastContainer />
    </>
  );
};

const ContactTableHeader = ({ handleScroll, scrollPos, maxScroll }) => {
  return (
 
      <thead>
        <tr className='head-table-row'>
          <th className="navigation-left-column-element">
            <img
              className={`scroll-btn left ${scrollPos <= 0 ? 'hidden' : ''}`}
              onClick={() => handleScroll('left')}
              src={MoveLeftIcon}
            />
          </th>
          <th className="name-column-element">Ime</th>
          <th className="surname-column-element">Prezime</th>
          <th className="birthdate-column-element">Datum rođenja</th>
          <th className="address-column-element">Ulica i kućni broj</th>
          <th className="zipnumber-column-element">Poštanski broj</th>
          <th className="tel-column-element">Broj telefona</th>
          <th className="email-column-element">Email</th>
          <th className="navigation-right-column-element">
            <img
              className={`scroll-btn right ${scrollPos >= maxScroll ? 'hidden' : ''}`}
              onClick={() => handleScroll('right')}
              src={MoveRightIcon}
            />
          </th>
          <th className="action-column-element">Akcije</th>
        </tr>
      </thead>
   
  );
};

const ContactTableBody = ({ currentContacts, indexOfFirstContact, handleEditContact, openInfoModalWindow, openDeleteUserModalWindow, userData }) => {
  return (
      <tbody>
      {(!currentContacts || currentContacts.length === 0) ? <tr><td colSpan="6">Trenutno nema dostupnih kontakata</td></tr> : currentContacts.map((contact, index) => (
                <tr key={contact.id}>
                  <td className="navigation-left-column-element">{indexOfFirstContact + index + 1}.</td>
                  <td className="name-column-element">{contact.name}</td>
                  <td>{contact.surname}</td>
                  <td>{contact.birthdate}</td>
                  <td>{contact.address}</td>
                  <td>{contact.zip}</td>
                  <td>{formatPhoneNumberDisplay(contact.phonenumber)}</td>
                  <td><a href={`mailto:${contact.email}`}>{contact.email}</a></td>
                  <td className="navigation-right-column-element"></td>
                  <td className="action-column-element">
                      <div className='action-td-container'>
                          <HoverIconButton onClick={() => openInfoModalWindow(contact)} inactiveImage={SeeContactInfoIcon} hoverImage={SeeContactInfoHoverIcon} tooltipMessage={"Detalji kontakta"}/>
                          <HoverIconButton onClick={() => handleEditContact(contact.id)} inactiveImage={EditContactInfoIcon} hoverImage={EditContactInfoHoverIcon} tooltipMessage={"Uredi kontakt"}/>
                          {userData && (userData.status === "admin" || userData.status === "superadmin") && <HoverIconButton onClick={() => openDeleteUserModalWindow(contact.id)} inactiveImage={DeleteContactIcon} hoverImage={DeleteContactHoverIcon} tooltipMessage={"Izbriši kontakt"}/>}
                      </div>
                  </td>
              </tr>
            ))}
      </tbody>

  );
};

export default ContactTable;
