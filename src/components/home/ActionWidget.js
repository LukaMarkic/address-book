import React, { useState } from 'react'
import './../../styles/components/home/actionWidget.scss'
import HomePageWidget from './HomePageWidget';

const ActionWidget = ({children, onClick}) => {
    
  return (
        <div className='action-widget-contianer' onClick={onClick}>
            <HomePageWidget>
                {children}
            </HomePageWidget>
        </div>
  )
}

export default ActionWidget

