import React, { useState } from 'react'
import HomePageWidget from './HomePageWidget'

const InfoWidget = ({title, message, messageStyle}) => {

  return (
    <HomePageWidget >
        <h3>{title}</h3>
        <p style={messageStyle && messageStyle}>{message}</p>
    </HomePageWidget>
  )
}

export default InfoWidget
