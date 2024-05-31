import React from 'react'
import './../../styles/components/shared/infoModalSegemnt.scss'

const InfoModalSegemnt = ({segemntIcon, message, linkTo=null }) => {

  return (
    <div className="info-modal-segemnt">
        <img src={segemntIcon} />
        {linkTo ? <a href={linkTo}>{message}</a> : <p>{message}</p>}
    </div>
  )
}

export default InfoModalSegemnt




