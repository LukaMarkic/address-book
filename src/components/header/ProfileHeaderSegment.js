import React, { useEffect, useState, useRef } from 'react';
import ProfileIcon from './../../images/icons/profile-icon.svg';
import './../../styles/components/header/profileHeaderSegment.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { logOut } from '../../api/authHandle';

const ProfileHeaderSegment = ({ userName, userStatus, modalRef }) => {
  const [isDropDownWindowOpen, setIsDropDownWindowOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const profileIconRef = useRef(null);

  const toggleDropDownWindowOpen = () => setIsDropDownWindowOpen(prev => !prev);

  const handleLogOut = () => {
    logOut().then(() => navigate("/LoginPage"));
  };

  const openModal = () => {
    modalRef.current.openModal();
  }

  const DropDownWindow = () => {
    return (
      <div id="profile-dropdown-window">
        <div id="profile-window">
          <h4 id="profile-username">{userName}</h4>
          <p id="profile-status">{userStatus}</p>
        </div>
        {modalRef && <button onClick={openModal} id="profile-dropdown-change-pwd-btn">Promjeni zaporku</button>}
        <button onClick={handleLogOut} id="profile-dropdown-logout-btn">Odjava</button>
      </div>
    );
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 560) {
        setIsDropDownWindowOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    setIsDropDownWindowOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileIconRef.current &&
        !profileIconRef.current.contains(event.target)
      ) {
        setIsDropDownWindowOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="profile-img-container">
      <img
        ref={profileIconRef}
        onClick={toggleDropDownWindowOpen}
        alt="profile-photo"
        src={ProfileIcon}
      />
      {isDropDownWindowOpen && (
        <div ref={dropdownRef}>
          <DropDownWindow />
        </div>
      )}
    </div>
  );
};

export default ProfileHeaderSegment;
