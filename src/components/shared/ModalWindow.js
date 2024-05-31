import React, { forwardRef, useImperativeHandle, useState } from "react";
import CloseModalIcon from "./../../images/icons/close-btn.svg";
import "./../../styles/components/shared/modalWindow.scss"

const ModalWindow = forwardRef(({ children, title, submitBtnAction }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
  
    useImperativeHandle(ref, () => ({
        openModal,
        closeModal
    }));

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    };
  
    return (
      <div className={`modal-window-container ${isOpen ? 'show-modal' : ''}`}>
        <div className="modal-window">
          <div className="modal-window-header">
            <h3>{title}</h3>
            <img
              alt="cancel-btn"
              src={CloseModalIcon}
              onClick={closeModal}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    );
  });
  
  export default ModalWindow;