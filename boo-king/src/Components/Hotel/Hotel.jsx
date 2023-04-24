import React from 'react'
import './Hotel.scss'
import {GoVerified} from "react-icons/go";
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import {AiOutlineSearch} from "react-icons/ai"
import {BsCalendar2Date} from "react-icons/bs"
import format from 'date-fns/format';
import {AiOutlinePlus} from "react-icons/ai"
import {AiOutlineMinus} from "react-icons/ai"
import {BsQuestionCircle} from "react-icons/bs"
import {BsDot} from "react-icons/bs";
import {MdOutlineLocalAirport} from "react-icons/md";
import {AiTwotoneLike} from "react-icons/ai"
import {ImLocation} from "react-icons/im"
import {BsHeart} from "react-icons/bs"
import {BsFillShareFill} from "react-icons/bs"
import izmir from "../../images/izmir.jpg"
import antalya from "../../images/antalya.jpg"
import  {AiOutlineArrowLeft} from "react-icons/ai"
import  {AiOutlineArrowRight} from "react-icons/ai"
import  {MdCancel} from "react-icons/md"
import casablanca from "../../images/casablanca.webp"
import DescriptionHotel from '../DescriptionHotel/DescriptionHotel';
import Reserve from '../reserve/Reserve';

 
const Hotel = ({location}) => {


    const [clicked , setClicked] = useState(false);
    const [clicked1 , setClicked1] = useState(false);
    const [clicked2 , setClicked2] = useState(false);
    const [clicked3 , setClicked3] = useState(false);
    const [clicked4 , setClicked4] = useState(false);
    const [clicked5 , setClicked5] = useState(false);


    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);

    const [adult , setAdult] = useState(1);
    const [children , setChlidren] = useState(0);
    const [room , setRoom] = useState(1);


     //   class: "image-grid-col-2 image-grid-row-2"
    const [slider  , setSlider] = useState(0);
    const [open , setOpen] = useState(false);

    const handleClick = (i) => {
        setSlider(i);
        setOpen(true)
    }


    console.log('location' , location)
  return (
    <div className='hotel' >
      
   
      {  open  &&
            <div className='slider' id="slider">
            <MdCancel id="cancel" onClick={()=> setOpen(false)}/>
            <AiOutlineArrowLeft id="left" onClick={()=> !slider <= 0 ? setSlider(slider-1) : setSlider(location?.item.photos.length -1)}/>
                 <img src={location.item.photos[slider]}  className="img"/>
                <AiOutlineArrowRight id="right" onClick={()=> slider  != (location?.item.photos.length -1) ?  setSlider(slider+1) : setSlider(0)}/>
            </div>}
    
        <div className='hotel_container'>
             <div className='hotel_infos_top'>
                <div className='infos_search'>
                    <div className='check_price'>
                    <GoVerified id="icon"/> 
                     <p>    We Price Match</p>

                    </div>
                    <div className='content'>
                    <p>Search </p>
                    <form className='form'>
                           <div className='items'>
                                   <label>Destination/property name:</label>
                                   <div className={ !clicked ?  'input_icon' : 'input_icon1'}>
                                       <div className='icon'> <AiOutlineSearch id="icon"/>  </div>
                                       <input onClick={()=>setClicked(!clicked)} id="input" placeholder='Destination'/>
                                   </div>

                           </div>
                           <div className='items' >
                                   <label>Check-in-out date</label>
                                   <div onClick={()=>setClicked1(!clicked1)} className={ !clicked1 ?  'input_icon' : 'input_icon1'}>
                                           <BsCalendar2Date id="icon"/>
                                           <p  
                                           onClick={()=>setClicked1(!clicked1)}
                                           > {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                                           date[0].endDate,
                                           "MM/dd/yyyy"
                                           )}`
                                       } </p>
                                                   { clicked1 == true &&  <DateRange
                                                       editableDateInputs={true}
                                                       onChange={item => setDate([item?.selection])}
                                                       moveRangeOnFirstSelection={false}
                                                       ranges={date}
                                                       className="date"
                                                   />}
                               </div>
                               <div className='items'>
                               <label>Options</label>
                               <div className={ !clicked2 ?  'input_icon' : 'input_icon1'}>
                               <p onClick={()=> setClicked2(!clicked2)}>  {adult} Adults . {children} Childrens . {room} Rooms </p>
                                       { clicked2 &&
                                           <div className=  'props'>
                                             <div className='props_content'>
                                                    <div className='each-item'>
                                                       <p> Adults </p>
                                                       <div className='handle'>
                                                       <AiOutlineMinus id={ (adult != 1) ? "icon" : "icon1"} onClick={()=> adult> 1 ? setAdult(adult -1) : setAdult(1)}/>
                                                           <p> {adult} </p>
                                                           <AiOutlinePlus id="icon" onClick={()=> setAdult(adult +1)}/>
                                                           </div>
                                                    </div>
                                                    <div className='each-item'>
                                                    <p> Childrens </p>
                                                    <div className='handle'>
                                                    <AiOutlineMinus id={ (children != 0) ? "icon" : "icon1"} onClick={()=> children >0 ? setChlidren(children -1) : setChlidren(0)}/>
                                                        <p> {children}</p>
                                                        <AiOutlinePlus id="icon" onClick={()=> setChlidren(children +1)}/>
                                                        </div>
                                                 </div>
                                                 <div className='each-item'>
                                                 <p> Rooms </p>
                                                 <div className='handle'>
                                                    <AiOutlineMinus id={ (room != 1) ? "icon" : "icon1"} onClick={()=> room >1 ? setRoom(room -1) : setRoom(1)}/>
                                                     <p> {room} </p>
                                                     <AiOutlinePlus id="icon" onClick={()=> setRoom(room +1)}/>
                                                 </div>
                                              </div>

                                             </div>
                                       </div>}
                               </div>

                       </div>
                       <div className='price' >
                       <div className='left'>
                         <label>min-price</label>
                         <input onClick={()=> setClicked3(!clicked3)} id={clicked3 && "input"  } placeholder='min-price'/>
                       </div>
                       <div className='left'>
                         <label>max-price</label>
                         <input  onClick={()=> setClicked4(!clicked4)} id={clicked4 && "input"  }  placeholder='max-price'/>
                       </div>
                       </div>
                       <div className='check'>
                          <div className='first'>
                             <input type="checkbox"/>
                              <p>Entire homes & apartments</p>
                          </div>
                          <BsQuestionCircle className='seconde'/>
                       </div>
                          <div className='check' style={{marginTop:"-5px"}}>
                          <div className='first'>
                             <input  type="checkbox"/>
                              <p>Entire homes & apartments</p>
                          </div>
                          <BsQuestionCircle className='seconde'/>
                       </div>
                       <div className='search_button'>
                        <button>Search</button>

                       </div>

                   </div>
                    </form>


               </div>
                
                </div>
                <div className='infos_pictures'>
                    <div className='infos_links'>
                    <p>Infos & prices</p>
                    <p>Facilities</p> 
                     <p>House rules</p>
                     <p>Guest reviews (2,123)</p>
                    </div>
                    <div className='pictures'>
                         <div className='title'>
                             <div className='title_left'>
                                <div className='first'>
                                     <p id="p1"> Hotel </p>
                                     <p id="p2"> {location?.item.name}</p>
                                     <p id="p3">  <BsDot id="icon"/>  <BsDot id="icon"/><BsDot id="icon"/><BsDot id="icon"/>  </p>
                                    <AiTwotoneLike id="like"/>
                                    <div className='airport'> <MdOutlineLocalAirport id="air"/> <p> Airport Shuttle </p> </div>
                                </div>
                                <div className='seconde'>
                                    <ImLocation style={{color:"#0071c2" , marginRight:"4px" , fontSize:"20px"}}/>
                                    <p>{location?.item.adress}  <span> – Excellent location - show map </span> </p>

                                </div>


                              </div>
                                <div className='title_right'>
                                    <div className='top'>
                                            <BsHeart id='heart'/>
                                            <BsFillShareFill id="share"/>
                                            <button onClick={()=> setClicked5(!clicked5)}>  Reserve  </button>
                                    </div>
                                     <div className='bottom'>
                                        <GoVerified id="icon"/>
                                        <p> We Price Math</p>
                                    </div>

                              </div>

                         </div>
                           <div className='image-grid'>
                                  {location?.item.photos?.map((item1 ,i)=> (
                                       <img onClick={() => handleClick(i)} key={i} src={item1} />
                           ))
                        }
                  

                         </div>

                    </div>

                </div>
                
             </div>
          
        </div>
        <div className='lolp'>
                 <DescriptionHotel clicked={clicked5} data= {location?.item?.desc} city={location?.item?.city}/>
        </div>
        { clicked5 &&
            <div className='pm'>
                 <Reserve clicked={clicked5} cityHotel= {{city: location.item.city , hotel:location.item.name}} dataDays={location.days} dataId= {location?.item._id} dates={location?.dates}/>
        </div>}
    
    </div>
  )
}

export default Hotel