import React from 'react'
import './SearchItems.scss'
import { useState } from 'react'
import {AiOutlineSearch} from "react-icons/ai"
import {BsCalendar2Date} from "react-icons/bs"
import format from 'date-fns/format';
import { DateRange } from 'react-date-range'
import {AiOutlinePlus} from "react-icons/ai"
import {AiOutlineMinus} from "react-icons/ai"
import {BsQuestionCircle} from "react-icons/bs"
import SearchResults from './SearchResults/SearchResults'
const SearchItems = ({location}) => {



    const [clicked , setClicked] = useState(false);
    const [clicked1 , setClicked1] = useState(false);
    const [clicked2 , setClicked2] = useState(false);
    const [clicked3 , setClicked3] = useState(false);
    const [clicked4 , setClicked4] = useState(false);

  console.log('location', location)


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
    const [sow , stShow]= useState(false);


  return (
    <div className='search_items' >
            <div className='search_items_container'>
             <div className='search_compo'>
                <div className='content'>
                     <p>Search </p>
                     <form className='form'>
                            <div className='items'>
                                    <label>Destination/property name:</label>
                                    <div className={ !clicked ?  'input_icon' : 'input_icon1'}>
                                        <div className='icon'> <AiOutlineSearch id="icon"/>  </div>
                                        <input onClick={()=>setClicked(true)} id="input" placeholder='Destination'/>
                                    </div>

                            </div>
                            <div className='items' >
                                    <label>Check-in-out date</label>
                                    <div onClick={()=>setClicked1(!clicked1)} className={ !clicked1 ?  'input_icon' : 'input_icon1'}>
                                            <BsCalendar2Date id="icon"/>
                                            <p  
                                            onClick={()=>setClicked(!clicked1)}
                                            > {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                                            date[0].endDate,
                                            "MM/dd/yyyy"
                                            )}`
                                        } </p>
                                                    { clicked1 == true &&  <DateRange
                                                        editableDateInputs={true}
                                                        onChange={item => setDate([item.selection])}
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
               <div className='search_results'>
                   <SearchResults location={location}/>
              </div>
            </div>
    </div>
  )
}

export default SearchItems