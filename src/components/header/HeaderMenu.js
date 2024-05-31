import React from 'react'
import { Link } from 'react-router-dom'
import './../../styles/components/header/headerMenu.scss'

const HeaderMenu = ({}) => {

  return (
    <nav className='header-menu'>
        <Link to="/HomePage">Pregled kontakta</Link>
        <Link to="/ContactForm" state={{type: "create"}}>Kontaktni obrazac</Link>
    </nav>
  )
}

export default HeaderMenu

