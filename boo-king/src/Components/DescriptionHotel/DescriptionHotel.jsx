import React from 'react'
import './Description.scss'
import {FaParking} from "react-icons/fa"
import {BiWifi2} from "react-icons/bi"
import {BiBus} from "react-icons/bi"
import {MdFamilyRestroom} from "react-icons/md"
import {IoLogoNoSmoking} from "react-icons/io"
import {GiLift} from "react-icons/gi"
import {GiCoffeeCup} from "react-icons/gi"
import {AiFillHeart} from "react-icons/ai"
import {MdBed} from "react-icons/md"
import {useState} from "react"



const DescriptionHotel = ({clicked , data  , city}) => {



  return (
    <div className='description'>
            <div className='description_conatainer'>
              <div className='desc_left'>
                    <p id="p1" > Stay in the heart of {city} –    <span> Excellent location - show map </span> </p>
                    <p id="p2">{data} </p>
                  
                    <div className='facilities'>
                         <p>Most popular facilities</p>
                            <div className='items'>
                                                        <div className='item'> <FaParking id="icon"/>  <p> Parking</p> </div>
                                                        <div className='item'> <BiWifi2 id="icon"/>  <p> Wifi</p> </div>
                                                        <div className='item'> <BiBus id="icon"/>  <p>  Airport shuttle</p> </div>
                                                        <div className='item'> <MdFamilyRestroom id="icon"/>  <p> Family rooms</p> </div>
                                                        <div className='item'> <IoLogoNoSmoking id="icon"/>  <p>  Non-smoking rooms </p> </div>
                                                        <div className='item'> <GiLift id="icon"/>  <p> Lift</p> </div>
                                                        <div className='item'> <GiCoffeeCup id="icon"/>  <p>  Tea/coffee maker in all rooms</p> </div>
                            </div>


                    </div>
                 </div>
                 <div className='desc_right'>
                     <div className='conatainer'>
                        <div className='top'>
                              <p> Property highlights </p>
                                  <div className='display'>
                                     <AiFillHeart id="icon"/>
                                     <p> Situated in the real heart of Rome, this property has an excellent location score of 9.1</p>
                                  </div>
                                  <div className='display'>
                                  <MdBed id="icon"/>
                                  <p> Want a great night's sleep? This property was highly rated for its very comfy beds.
                                  </p>
                               </div>
                        </div>
                        <div className='bottom'>
                        <p id="p1">  Breakfast info</p>
                        <p id="p2"> Continental, Buffet</p>
                        <div className='display'>
                             <FaParking  id="icon"/>
                               <p>  Private parking available </p>
                        
                        </div>


                        </div>
                        <button onClick={()=> clicked(true)} > Reserve</button>
                     </div>
                 
              </div>
            </div>
         
    </div>
  )
}

export default DescriptionHotel