import React from 'react'
import Header from '../Components/Header/Header'
import Navbar from '../Components/Navbar/Navbar'
import Search from '../Components/Search/Search'
import List from '../List/List'
import Mail from '../Components/Mail/Mail'
import Footer from '../Footer/Footer'
import './Home.scss'

const Home = () => {
  return (
    <div className='home'>
          <Navbar/>
          <Header type="list"/>
          <Search type="list"/>
          <List />
          <Mail />
          <Footer/>
    </div>
  )
}

export default Home