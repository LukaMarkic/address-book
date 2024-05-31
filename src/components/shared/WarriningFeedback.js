import React from 'react'
import './../../styles/components/shared/warriningFeedback.scss'

const WarriningFeedback = ({message="Upozoranje"}) => {
  return (
    <p id="warrning-feedback-message">{message}</p>
  )
}

export default WarriningFeedback