import React from 'react'
import './Mail.scss'
const Mail = () => {
  return (
    <div className='mail'>
            <div className='mail_container'>
                        <div className='container_top'>
                             <p id="p1"> Save time, save money! </p>
                             <p id="p2"> Sign up and we'll send the best deals to you</p>
                        </div>
                        <div className='container_bottom'>
                            <div className='formulaire'>
                              <form id="form">
                                    <input placeholder='Your email'/>
                                    <button> Subscribe  </button>
                              </form>
                              <div className='verify'>
                                <input type="checkbox"/>
                                <p>  Send me a link to get the FREE Booking.com app! </p>
                              </div>
                            </div>

                        </div>
            </div>
        
    </div>
  )
}

export default Mail