import React from 'react'
import './Reserve.scss'
import {GoVerified} from "react-icons/go"
import useFetching from "../../useFetching/useFetching"
import {IoIosBed} from "react-icons/io"
import {FaClock} from "react-icons/fa"
import {IoIosResize} from "react-icons/io"
import {BsBuilding} from "react-icons/bs"
import {GiCrosshair} from "react-icons/gi"
import {MdOutlineBathroom} from "react-icons/md"
import {AiOutlineFundProjectionScreen} from "react-icons/ai"
import {IoIosBeer} from "react-icons/io"
import {HiWifi} from "react-icons/hi"
import {IoIosPerson} from "react-icons/io"
import {CgCoffee} from "react-icons/cg"
import {ImTicket} from "react-icons/im"
import {BsDot} from "react-icons/bs"
import { useState } from 'react'
import axios from "axios"
import {AiOutlineClose} from "react-icons/ai"
import {AiOutlineRight} from "react-icons/ai"
import {AiOutlineCaretLeft} from "react-icons/ai"
import {AiOutlineCaretRight} from "react-icons/ai"
import {AiOutlineCheck} from "react-icons/ai"
import { useNavigate } from 'react-router-dom'





const Reserve = ({dataId , dataDays , dates , cityHotel}) => {


  const {data, loading, error, reFetch } = useFetching(`http://localhost:8080/api/hotels/oneRoom/${dataId}`)

  const [open , setOpen] = useState(true);
  const [IdTest , setIdTest] = useState([]);
  const [show , setShow] = useState("");
  const [selectedRooms , setSelectedRooms] = useState([]);
  const [individualRoom , setIndividualRoom] = useState(false);
  const [theId , setTheId]= useState('');
  const [image , setImage] = useState('');
  const [number , setNumber] = useState(0);
  const [validate , setValidate] = useState(false);
  const [getName , setGetName] = useState('');


  const name = JSON.parse(localStorage.getItem("user"))



console.log("DATA" , data)

  const getDatesRange = (startDate , endDate) => {

    const start = new Date(startDate);
    const end = new Date(endDate)
    const date = new Date(start.getTime());
    const allDates = [] 
    while(date <= end) {
      allDates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

      return allDates
  }


  const allDates = getDatesRange(dates[0].startDate , dates[0].endDate )


  const handleSelected = (e) => {

    const value = e.target.value
    const checked = e.target.checked
    setSelectedRooms (
      checked ? 
        [...selectedRooms , value]
        : selectedRooms.filter((item) => item !== value)
    )
  }


  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
       allDates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/room/availability/${roomId}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
      setOpen(false);
      setValidate(true);

    } catch (err) {}
  };


dates.map((date) =>{
  var date1 = new Date(date.startDate);

  var date2 = date1.getFullYear()+'-'+(date1.getMonth()+1)+'-'+date1.getDate();

})



  return (
    <div className='reserve'>
        {  validate &&
          <div className='validate'>
           <AiOutlineClose id="icon1" onClick={()=>setValidate(false)}/>
           <div className='container'>
              <div className='top'>
              <p> Booking<span>.com </span> </p>
              <div className='bop'>
                    <p id="p1"> booking number :     <span> 123456789   </span>  </p>
                    <p id="p1"> Key :  <span> 2745 </span> </p>
               </div>
              </div>
              <div className='bottom'>
                  <p id="p1"> Thank you {name?.username} !  </p>
                  <p id="p2"> Your reservation in {cityHotel.city} is confirmed  </p>
                  <div className='display'>  <AiOutlineCheck id="icon"/>  
                     <p> The establishment of  <span>{cityHotel.hotel}  </span> awaits you on <span>{
                       dates.map((date)=>  (
                            new Date(date.startDate).getFullYear()+'-'+ (new Date(date.startDate).getMonth()+1)+'-'+new Date(date.startDate).getDate()
  ))}</span> </p> 
                     
                  </div>
                  <div className='display'>  <AiOutlineCheck id="icon"/>     <p>  Your <span>  payment </span>  will be managed by the establishment on the day of your presentation</p>   </div>
              </div>
            
           </div>
        </div>
      }
       
        <div className='title'> 
        <p> Availability  </p>
        <div className='match'>
             <GoVerified id="icon"/>
              <p>  We Price Match</p>
        </div>
        </div>
        <div className='header_titles'>
             <div className='display1'>   <p> Room type	 </p>   </div>
             <div className='display2'>   <p> Sleeps	 </p>   </div>
             <div className='display3'>   <p> Price for {dataDays} nights		 </p>   </div>
             <div className='display4'>   <p> Your choices		 </p>   </div>

        </div>
        {data.map((items) => (
        <div className='infos'>
           <div className='display1'> 
            <div className='range' onClick={() => setTheId(items._id) }> 
                <a>   <p id="p1" onClick={()=> setIndividualRoom(true)}> { items?.title }</p>   </a>
                  <p id="p3">   <FaClock id="icon"/>  Only 2 rooms left on our site </p>
                  <p id="p2">1 single bed <IoIosBed style={{marginLeft:"5px", marginRight:"10px"}}/> and 1 double bed <IoIosBed style={{marginLeft:"15px"}}/><IoIosBed style={{marginLeft:"-5px", marginRight:"10px"}}/>   </p>
                  <div className='entertainment'>
                      <div className='items'> <IoIosResize id='icon'/>  <span>27 m² </span>  </div>
                      <div className='items'> <BsBuilding id='icon'/>  <span>City view </span>  </div>
                      <div className='items'> <GiCrosshair id='icon'/>  <span>Air conditioning </span>  </div>
                      <div className='items'> <MdOutlineBathroom id='icon'/>  <span>Private bathroom </span>  </div>
                      <div className='items'> <AiOutlineFundProjectionScreen id='icon'/>  <span>Flat-screen TV </span>  </div>
                      <div className='items'> <IoIosBeer id='icon'/>  <span> Minibar </span>  </div>
                      <div className='items'> <HiWifi id='icon'/>  <span>Free WiFi </span>  </div>
                  </div>
              </div>
              </div>
              <div className='display2'>  
                  {Array(items?.maxPeople)
                    ?.fill().map((_,i)=> (
                      <IoIosPerson id="icon"/> 
                    ))
                  }  
              </div>
              <div className='display3'>
                <div className="range">
                    <p id="p1"> MAD {items?.price * dataDays}  </p>
                    <p id="p2"> Includes taxes and charges  </p>
                    <p id="p3"> Getaway Deal </p>
                </div>
                  
              </div>
              <div className='display4'>
                  <div className="range">
                     <div className='items'>   <CgCoffee/> <p id="p1">Breakfast included in the price</p> </div>
                     <div className='items'>   <BsDot id="icon"/> <p id="p2">Non-refundable</p> </div>
                     <div className='items'>   <ImTicket id="icon1"/>  <p id="p3">  <span>Genuis </span> discount available</p> </div>
                     <div className='items'>   <BsDot id="icon3"/> <p id="p4">Only 1 room left on our site</p> </div>
                         <div className='items'>  
                         
                         <p id="p6" onClick={()=> setShow(items?._id) }> Choice you room number   <AiOutlineRight id="icon"/> </p>
                               { open && items?._id == show && 
                                  <div className='rooms' > 
                                        <div className='roomsNumbers'>
                                {items?.roomNumbers.map((item)=> (
                                  
                                    <div className='display'>
                                            <>
                                               <p> room </p>
                                               <input type="checkbox" id="check"  value={item?._id} onChange={handleSelected}  disabled={!isAvailable(item)} />
                                                <p>  {item?.number}</p>
                                           </>
                                    </div>
                                ))}
                                        </div>
                                        <button id="button" onClick={handleClick}>  reserve now </button>
                                </div>
}
  
                         </div>

                 </div>
              </div>

        </div>

        ) )}
        { individualRoom &&

          data.map((items) => (
           ( items._id == theId) ?
         ( <div className="individualRoom" id="individualRoom">
              <div className="container">
               <div className="close">   <AiOutlineClose id="icon" onClick={()=> setIndividualRoom(false)}  />  </div>
                  <div className="content">
                    <div className = "content_left">

                        <div className="image_display">
                            <AiOutlineCaretLeft onClick={()=> 
                              setNumber( number > 0 ?  (number-1) : 0)
                            } 
                            id="icon"
                            />
                           <img src={image != "" ? image : items?.photos[number]}/>

                              <AiOutlineCaretRight onClick={()=> 
                                setNumber(number  < items.photos.length-1 ? (number+1) : 0)
                              }
                              id="icon"
                              />
                           
                        </div>
                        <div className="images">
                            {items?.photos.map((photo)=>(

                                  <img src={photo} onClick={()=> setImage(photo)}/>
                            ))
                            }   

                        </div>


                    </div>
                    <div className = "content_right">
                       <div className="items">
                          <p> {items.title}    </p>
                            <div className="display">
                                  { items.View && <span id="span">  <BsBuilding/> {items.View}   </span>}
                                  { items.airClim == false && <span id="span">   <GiCrosshair/>  Air conditioning   </span>}
                                  { items.privatBath && <span id="span" > <MdOutlineBathroom/> Private bathroom    </span>}
                                  { items.TV && <span id="span">  <AiOutlineFundProjectionScreen/> Flat-screen TV  </span>}
                                  { items.Bar && <span id="span">  <IoIosBeer/> Minibar   </span>}
                                  { items.Wifi && <span id="span">  <HiWifi/> Free WiFi  </span>}
                                  {console.log(items)}
                            </div>
                       </div>
                       <div className="items">
                       <p> Room size   <span> {items.Size} m² </span>   </p>
                       <div className="display">
                          <p id="span1" style={{marginBottom:"15px"}}>  Comfy beds, 9.1 – Based on 370 reviews   </p>
                          <p id="span1"> This air conditioned room features a desk, wardrobe and flat-screen TV. It also comes with a private bathroom fitted with a bath and hairdryer.   </p>
                          </div>
                       </div>
                       <div className="items">
                           <p> In your private bathroom: </p>
                           <div className="display1">
                                <div className="item">   <AiOutlineCheck/> <span> Bath </span> </div>
                                <div className="item">   <AiOutlineCheck/> <span> Shower </span> </div>
                                <div className="item">   <AiOutlineCheck/> <span> Hairdryer </span> </div>
                                <div className="item">   <AiOutlineCheck/> <span> Toilet </span> </div>
                                <div className="item">   <AiOutlineCheck/> <span> Toilet paper</span> </div>
                     
                           </div>

                       </div>
                       <div className="items">
                          <p> Room facilities:    </p>
                          <div className="display1">
                                <div className="item">   <AiOutlineCheck/> <span> Wardrobe or closet </span> </div>
                                <div className="item">   <AiOutlineCheck/> <span> TV </span> </div>
                                <div className="item">   <AiOutlineCheck/> <span> Telephone </span> </div>
                                <div className="item">   <AiOutlineCheck/> <span>Air conditioning </span> </div>
                                <div className="item">   <AiOutlineCheck/> <span> Satellite channels </span> </div>
                                <div className="item">   <AiOutlineCheck/> <span>Soundproofing </span> </div>
                                <div className="item">   <AiOutlineCheck/> <span>Soundproofing </span> </div>
                                <div className="item">   <AiOutlineCheck/> <span> Flat-screen TV </span> </div>
                                <div className="item">   <AiOutlineCheck/> <span> Heating </span> </div>
                                <div className="item">   <AiOutlineCheck/> <span> Desk </span> </div>
                                <div className="item">   <AiOutlineCheck/> <span> Wake-up service </span> </div>
                          </div>


                       </div>



                    </div>



                  </div>
              </div>
          </div>
          )
          : null
        ))

        }

    </div>
  )
}

export default Reserve