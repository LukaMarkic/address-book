import React from 'react'
import CloseMobileMenuIcon from './../../images/icons/close-mobile-menu-icon.svg'
import './../../styles/components/header/headerMobileMenu.scss'
import { Link } from 'react-router-dom'
import useUserContext from '../../hooks/useUserContext'

const HeaderMobileMenu = ({userName, userStatus, cancelMobileMenuAction, modalRef}) => {
    const {logOutUser}  = useUserContext();
    const openModal = () => {
        modalRef.current.openModal();
      }

  return (
        <div className="header-mobile-menu">
            <div className="mobile-menu-user-info-container">
                <h3>{userName}</h3>
                <p>{userStatus}</p>
                {modalRef && <button onClick={openModal} id="mobile-menu-change-pwd-btn">Promjeni zaporku</button>}
                <button onClick={logOutUser}  id="mobile-menu-logout-btn">Odjavi se</button>
            </div>
            <nav>
                <Link to="/HomePage">Pregled kontakta</Link>
                <Link to="/ContactForm" state={{type: "create"}}>Kontaktni obrazac</Link>
            </nav>
            <button>
                <img onClick={cancelMobileMenuAction && cancelMobileMenuAction} alt="close-mobile-menu" src={CloseMobileMenuIcon}/>
            </button>
        </div>
  )
}

export default HeaderMobileMenu

