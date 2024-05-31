import React from 'react'
import './../../styles/components/shared/alertModalContent.scss'

const AlertModalContent = ({message, submitBtnAction, cancelBtnAction }) => {

  return (
        <div className="alert-modal-content">
            <p id="modal-window-message">{message}</p>
            <div className="modal-window-buttons-container">
                <button onClick={submitBtnAction} className="confirm-btn">Da</button>
                <button onClick={cancelBtnAction} className="cancel-btn">Poništi</button>
            </div>
        </div>
  )
}

export default AlertModalContent




