import React, { useState } from 'react'
import  './../../styles/components/login/backgroundImageHolder.scss'

const BackgroundImageHolder = ({children, coverImage}) => {

  return (
    <div className='background-image-holder'>
        <div>
          {children}
        </div>
        <img
          src={coverImage}
        />
    </div>
  )
}

export default BackgroundImageHolder

