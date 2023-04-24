import React from 'react'
import './Search.scss'
import { faBed } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useState} from 'react'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range'
import {BsCalendarDateFill} from "react-icons/bs"
import format from 'date-fns/format';
import {BsPersonFill} from "react-icons/bs"
import {AiOutlinePlus} from "react-icons/ai"
import {AiOutlineMinus} from "react-icons/ai"
import useFetching from '../../useFetching/useFetching'
import {Link} from "react-router-dom"
import {GoLocation} from "react-icons/go"
import {useContext} from "react"
import {SearchContext} from "../../SearchContext/SearchContext"
import  {useNavigate} from "react-router-dom"
const Search = () => {


  const navigate = useNavigate();

const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [clicked , setClicked] = useState(false);
  const [clicked1 , setClicked1] = useState(false);
  const [adultes , setAdultes] = useState(1);
  const [childrens , setChildrens] = useState(0);
  const [rooms , setRomms] = useState(1);
  const [destination , setDestination] = useState("");
  const [min  , setMin] = useState(0);
  const [max , setMax]= useState(0);
  const [value , setValue]= useState("");


 

  const {data , loading , error , reFetch} = useFetching( `http://localhost:8080/api/hotels/oneCity?city=${destination}&min=${min || 0}0&max=${max || 10000}&limit=`)



const {dispatch} = useContext(SearchContext);

const handleSearch = ( ) =>{

  dispatch({type:"NEW_SEARCH" , payload:{destination ,date , Option , adultes }} );
    navigate('/hotels ' ,{ state : {destination , date , days , adultes , rooms , childrens , data} })
  
}



  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(date[0].endDate, date[0].startDate);

  console.log(value)

  return (
     <div className='search'>
        <div className='search_conatiner'>
            <div  className='search_bar'>
                <FontAwesomeIcon id="icon" icon={faBed} />
                <input onChange={(e) => setDestination(e.target.value)} type="text" placeholder='Where are you going ?' />
                  { destination &&
                    data.map((item) => (
                      <div className='div_search'>
                      <div className='div_search_items'>
                            <GoLocation id="icon"/>
                            <div className='title'>
                                <p id="p1" onClick={()=> setValue(item.city) }> {item.city}</p>
                                <p id="p2">  {item.city} {item.country}</p>
                            </div>
                      </div>
                  </div>  
                  
  ))
              }
            </div>
            
              <div  className='search_date' >
            <BsCalendarDateFill id="icon" onClick={()=>setClicked(!clicked)} />
            <p  
              onClick={()=>setClicked(!clicked)}
            > {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`
          } </p>
                      { clicked == true &&  <DateRange
                          editableDateInputs={true}
                          onChange={item => setDate([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={date}
                          className="date"
                       />}
            </div>

            <div  className='search_filter'>
               <BsPersonFill id="icon"  onClick={() => setClicked1(!clicked1)}/>
               <p onClick={() => setClicked1(!clicked1)}
               > {adultes} adult  .  {childrens} children  .  {rooms} room </p>
               { clicked1 &&  <div className='oprions'>
                    <div className='items'>
                        <div className='item1'>
                            <p> Adults </p>
                        </div>
                        <div className='item2'>
                          <AiOutlineMinus   id={ adultes >= 2 ?   "icon1" : "icon"}  onClick={() => adultes >1 ?  setAdultes(childrens - 1) : setAdultes(1) }/>
                          <span>  {adultes} </span>
                          <AiOutlinePlus id="icon1" onClick={() => setAdultes(adultes +1)} />
                        </div>

                    </div>
                    <div className='items'>
                    <div className='item1'>
                        <p> Chlidrens </p>
                    </div>
                    <div className='item2'>
                      <AiOutlineMinus  id={ childrens >= 1 ?   "icon1" : "icon"} onClick={() => childrens >0 ?  setChildrens(childrens - 1) : setChildrens(0) }/>
                      <span>  {childrens} </span>
                      <AiOutlinePlus id="icon1" onClick={() => setChildrens(childrens +1)}/>
                    </div>

                </div>
                <div className='items'>
                <div className='item1'>
                    <p> Romms </p>
                </div>
                <div className='item2'>
                  <AiOutlineMinus  id={ rooms >= 1 ?   "icon1" : "icon"} onClick={() => childrens >0 ?  setRomms(rooms - 1) : setRomms(0) } />
                  <span>  {rooms}  </span>
                  <AiOutlinePlus id="icon1" onClick={() => setRomms(rooms +1)}/>
                </div>

            </div>


               </div>
                      }
            </div>
       <div  className='search_button'>

         <button onClick={handleSearch} type="submit"> Search</button>   
            </div>



        </div>
     
    </div>
  )
}

export default Search