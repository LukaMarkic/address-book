import React, { useEffect, useRef, useState } from 'react';
import HeaderMobileMenu from './HeaderMobileMenu';
import ToggleMobileMenuIcon from './../../images/icons/toggle-mobile-menu.svg';
import ProfileHeaderSegment from './ProfileHeaderSegment';
import HeaderMenu from './HeaderMenu';
import './../../styles/components/header/header.scss';
import useUserContext from '../../hooks/useUserContext';
import { useLocation } from 'react-router-dom';
import ModalWindow from '../shared/ModalWindow';
import ChangePasswordForm from '../shared/ChangePasswordForm';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Header = ({ showMenu = true, showProfileSegment = true }) => {
  const [isMobileMenuShown, setIsMobileMenuShown] = useState(false);
  const { userData } = useUserContext();
  const location = useLocation();
  const modalRef = useRef();
  const notifySuccess = (message) => toast.success(message, {position: "bottom-center", autoClose: 6000, draggable: false});
  const toggleMobileMenu = () => {
    setIsMobileMenuShown(prev => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 560) {
        setIsMobileMenuShown(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuShown(false);
  }, [location]);

  const closeMobleMenu = () => {
    setIsMobileMenuShown(false);
  }

  const openModal = () => {
    modalRef.current.openModal();
  }

  const onSubmitAction = () => {
    modalRef.current.closeModal();
    notifySuccess("Uspješna izmjena zaporke")
  }

  return (
    <>
        <div className="header-bar-container">
      <div className="header-bar">
        <h1>Imenik</h1>
        <div>
          {showMenu && <HeaderMenu />}
          {showProfileSegment && <ProfileHeaderSegment userName={userData ? userData.name : "Nepoznat korisnik"} userStatus={userData ? userData.status : "-"} modalRef={modalRef}/>}
        </div>
        {showMenu && <img id="toggle-mobile-menu-icon" alt="toggle-mobile-menu-icon" src={ToggleMobileMenuIcon} onClick={toggleMobileMenu} />}
      </div>
      {(isMobileMenuShown && showMenu) && <HeaderMobileMenu cancelMobileMenuAction={closeMobleMenu} userName={userData ? userData.name : "Nepoznat korisnik"} userStatus={userData ? userData.status : "-"} modalRef={modalRef} />}
    </div>
    <ModalWindow ref={modalRef} title={"Promjena zaporke"}>
      <ChangePasswordForm onSubmitAction={onSubmitAction}/>
    </ModalWindow>
    <ToastContainer />
    </>

  );
};

export default Header;
