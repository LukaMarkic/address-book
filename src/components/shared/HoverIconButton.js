import React from 'react'
import './../../styles/components/shared/hoverIconButton.scss'
import { Tooltip } from '@mui/material';

const HoverIconButton = ({inactiveImage, hoverImage, onClick, tooltipMessage}) => {
  return ( 
    <Tooltip title={tooltipMessage}>
      <div className='hover-icon-container' onClick={onClick}>
          <img
              src={inactiveImage}
              className="inactive-icon-img"
          />
          <img
              src={hoverImage}
              className="hovered-icon-img"
          />
      </div>
    </Tooltip>

  )
}

export default HoverIconButton

