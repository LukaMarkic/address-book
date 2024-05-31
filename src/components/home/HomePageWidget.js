import React from 'react'
import './../../styles/components/home/homePageWidget.scss'

const HomePageWidget = ({children}) => {

  return (
    <div className="home-page-widget">
        {children}
    </div>
  )
}

export default HomePageWidget

