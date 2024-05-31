
import React, { useEffect, useState } from 'react'
import './../../styles/components/contact-form/contactFormErrorMessage.scss'

const ContactFormErrorMessage = ({ error}) => {

  return (
        <span className="contact-form-error-message">{error}</span>
  )
}

export default ContactFormErrorMessage




