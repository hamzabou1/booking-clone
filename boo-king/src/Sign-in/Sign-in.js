import React from 'react'
import './Sign_in.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios"
import { AuthContext } from '../AuthContext/AuthContext';
import { useContext } from 'react';
import {useNavigate } from "react-router-dom"

const Sign_in = () => {

    const navigate = useNavigate();
    const [dataInfos , setDataInfos ] = useState({
    });
    const {dispatch , error , loading} = useContext(AuthContext)

    const handleInfos =  (e) =>{
              setDataInfos((prev) => ({ ...prev,  [e.target.name]: e.target.value }))
    }

    console.log(dataInfos)

    const handleClick = async (e) =>{
        e.preventDefault();

        dispatch({type : "LOGIN_START"});
        try {

            const res = await axios.post('http://localhost:8080/api/users/login' , dataInfos)
            dispatch({type:"LOGIN_SUCCESS" , payload :res.data.details});
            navigate('/')

        }catch(err) {
            dispatch({type:"LOGIN_FAILURE" , paylod:err.response.data})
        }

    }



  return (
    <div className='sign_in'>

              <div className='top_header'>
                      <a href='/'> <p> Booking.com</p>  </a>
              </div>
              <div className='conatiner'>
                     <div className='content'>
                            <p> Sign in or create an account </p>
                            <form className='form' onSubmit={handleClick}>
                                  <div className='items'>
                                        <label> Email address </label>
                                        <input type="text" name="email"  onChange={handleInfos} />
                                  </div>
                                  <div className='items'>
                                        <label> Password </label>
                                        <input  name="password" type="password" onChange={handleInfos}/>
                                   </div>
                                   
                                    <button > Create account    </button>
                            </form>
                            <p id="p1"> By signing in or creating an account, you agree with our   <span> Terms & conditions </span>  and <span>  Privacy statement </span> </p>

                     </div>
              </div>
    
    </div>
  )
}

export default Sign_in