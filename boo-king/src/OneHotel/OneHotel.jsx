import React from 'react'
import Header from '../Components/Header/Header'
import Hotel from '../Components/Hotel/Hotel'
import Mail from '../Components/Mail/Mail'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Footer/Footer'
import { useLocation } from 'react-router-dom'
import './OneHotel.scss'
const OneHotel = ({type}) => {

  const location = useLocation();

  return (
    <div className='one'>
        <Navbar/>
        <Header type={type}/>
          <Hotel className="lol" location={location.state}/>
          <Mail/>
          <Footer/>
    </div>
  )
}

export default OneHotel