import React from 'react'
import './Navbar.scss'
import {AiOutlineQuestionCircle} from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import {AuthContext} from "../../AuthContext/AuthContext"
import { useContext } from 'react'

const Navbar = () => {

  const [data , setData] = useState({});
  const [open , setOpen] = useState(false);
  const {dispatch , error , loading} = useContext(AuthContext)

  useEffect(() => {
     setData(JSON.parse(localStorage.getItem("user")))
  
  }, [])

  const handleClick = () => {

      try {
        dispatch({type: "LOGOUT"})
        window.location.reload(true)

      }catch(error) {
        console.log(error)
      }


  }


  console.log(dispatch , "dispo")

  return (
    <div className='navbar'>
        <div className='navbar_container'>
            <div className='container_left'>
              <a href="/" id="link">   <p>Booking.Com</p> </a>
            </div>
            { data == null || data == "" ?
            <div className='container_right'>
               <AiOutlineQuestionCircle id="icon"/>
             <a href='/sign_up'>  <button id="button"> Register  </button> </a>
             <a href='/sign_in'>    <button id="button"> Sign in  </button> </a>
            </div>
            : 
                <div className='container_right' onClick={()=> setOpen(!open) }>
                    <img src="https://static.vecteezy.com/ti/vecteur-libre/p1/2002332-ablack-man-avatar-character-isolated-icon-gratuit-vectoriel.jpg"/>
                    <p> {data.username} </p>
                 </div>
            
            } 
        </div>
        { open &&
          <div className='logout'>
              <button onClick={handleClick} type="submit" > LOGOUT </button>
        </div>}
    </div>
  )
}

export default Navbar