import React, { useState } from 'react'
import './../../styles/components/shared/toggleIconButton.scss'

const ToggleIconButton = ({inactiveImage, activeImage, onClick, addLeftDivider=false}) => {

  const [isBtnActive, setIsBtnActive] = useState(false);
  const toggleButton = () => setIsBtnActive( prev => !prev);

  return ( 
    <div className={addLeftDivider ? 'toggle-icon-container border-left' : 'toggle-icon-container'} onClick={()=> {
      if(onClick) onClick();
      toggleButton();
    }}>
        {!isBtnActive && <img src={inactiveImage} className="toogle-icon-img" />}
        {isBtnActive &&  <img src={activeImage} className="toogle-icon-img" />}
    </div>
  )
}

export default ToggleIconButton

