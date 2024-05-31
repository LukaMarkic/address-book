import React, { useEffect } from 'react'
import CoverImage from './../images/address-books_blur-img.png'
import CredidentalLoginWindow from '../components/login/CredidentalLoginWindow'
import BackgroundImageHolder from '../components/login/BackgroundImageHolder'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../api/authHandle'
import useUserContext from '../hooks/useUserContext'

const LoginPage = ({}) => {
  const navigate = useNavigate();
  const {setUserId} = useUserContext()
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          setUserId(uid)
          navigate("/HomePage")
        }
      });
      
}, [])

  return (
    <BackgroundImageHolder coverImage={CoverImage}>
        <CredidentalLoginWindow />
    </BackgroundImageHolder>
  )
}

export default LoginPage

