import React from 'react'
import Header from '../Components/Header/Header'
import Mail from '../Components/Mail/Mail'
import Navbar from '../Components/Navbar/Navbar'
import SearchItems from '../Components/SearchItems/SearchItems'
import Footer from '../Footer/Footer'
import './SearchList.scss'
import { useLocation } from 'react-router-dom';

const SearchList = ({type}) => {

  const location = useLocation();
  console.log(location.state , "location")
  return (
    <div className='search1'>
            <Navbar/>
            <Header type={type}/>
            <SearchItems location={location.state}/>
            <Mail/>
            <Footer/>
    </div>
  )
}

export default SearchList