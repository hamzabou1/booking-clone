import React from 'react'
import '../Sign-in/Sign_in.scss'
import {useState} from "react"
import {useEffect} from "react"
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const Sign_up = () => {

      const [username , setUsername] = useState("");
      const [password , setPassword] = useState("");
      const [email , setEmail] = useState("");
      const [go  , setGo] = useState(false);
      const navigate = useNavigate();

      const handleClick = async (e) => {
           e.preventDefault()

        try {
          await axios.post('http://localhost:8080/api/users/register' , {email , username  , password});
          setGo(true)
          
        } catch (error) {
            console.log(error)
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
                  <form className='form' >
                  <div className='items'>
                        <label> Username </label>
                        <input onChange={(e)=>  setUsername(e.target.value)} type="text" name="username"/>
                      </div>
                        <div className='items'>
                              <label> Email address </label>
                              <input onChange={(e)=>  setEmail(e.target.value)} type="text" name="email"/>
                        </div>
                        <div className='items'>
                              <label> Password </label>
                              <input onChange={(e)=>  setPassword(e.target.value)} type="password" name="password"/>
                         </div>
                    
                         
                          <button onClick={handleClick} > Create account    </button>
                  </form>
                  <p id="p1"> By signing in or creating an account, you agree with our   <span> Terms & conditions </span>  and <span>  Privacy statement </span> </p>

           </div>
    </div>
  { go &&
      <div className='go'>
       <div className='content'>

          <p> Welcome   <span> {username}   </span> your account has been successfully created   </p>
          <button onClick={()=> navigate("/sign_in")}> Sign_in   </button>

       </div>
    </div>
  }
    


</div>
  )
}

export default Sign_up