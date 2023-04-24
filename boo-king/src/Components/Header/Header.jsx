import React from 'react'
import './Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed } from '@fortawesome/free-solid-svg-icons'
import { faCar } from '@fortawesome/free-solid-svg-icons'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faTaxi } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import SearchList from '../../SearchList/SearchList'
import { useEffect } from 'react'



const Header = ({type}) => {

    const [clicked , setClicked] = useState("stays");
     const [data , setData] = useState({}) 

    useEffect(() => {
      setData(JSON.parse(localStorage.getItem('user')))

    }, [])

    console.log("data" , data)

  return (
    <div className="header">
        <div className='header_container'>
            <div  onClick={(e)=> setClicked("stays")} className={ clicked == "stays" ?  'items'  : "items1"}>
               <FontAwesomeIcon id="icons" icon={faBed} />
                 <p> Stays </p>
            </div>
               <div  onClick={(e)=> setClicked("flight")} className={ clicked == "flight" ?  'items'  : "items1"}>
               <FontAwesomeIcon id="icons" icon={faPlane} />
                 <p> Flight </p>
            </div>   <div onClick={(e)=> setClicked("car")} className={ clicked == "car" ?  'items'  : "items1"}>
            <FontAwesomeIcon id="icons" icon={faCar} />
              <p  > Car rentals </p>
         </div>  
          <div   onClick={(e)=> setClicked("attractions")} className={ clicked == "attractions" ?  'items'  : "items1"}>
         <FontAwesomeIcon id="icons" icon={faGear} />
           <p> Attractions </p>
      </div>
      <div onClick={(e)=> setClicked("taxi")}   className={ clicked == "taxi" ?  'items'  : "items1"}>
      <FontAwesomeIcon id="icons" icon={faTaxi} />
        <p > Airports taxis </p>
   </div>
        </div>
        {type !="type" && data == null ?
          <div className= 'header_container1'>
             <h1>  A lifetime of discounts? It's Genius. </h1>
             <p> Get rewarded for your travels – unlock instant savings of 10% or more with a free Booking.com account</p>
             <button> Sign in / Register </button>
         </div>
         :
       (  <div className= 'header_container1'>
      {  data && <h1> Where to next {data.username} ? </h1>}
         <p> Find exclusive Genius rewards in every corner of the world!</p>
     </div>)
  }
    </div>
  )
}

export default Header