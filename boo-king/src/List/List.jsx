import React from 'react'
import './List.scss'
import casablanca from "../images/casablanca.webp"
import izmir from "../images/izmir.jpg"
import antalya from "../images/antalya.jpg"
import ListType from '../Components/ListType/ListType'
import LitsLoved from '../Components/ListLoved/LitsLoved'
import Travlled from '../Components/Travlled/Travlled'
import useFetching from '../useFetching/useFetching'
import {AiOutlineReload} from "react-icons/ai"

import { useEffect } from 'react'

const List = () => {

  const  {data , error , loading} = useFetching("http://localhost:8080/api/hotels/countByCity?cities=Fes,Marrakech,Rabat") ;


  return (

    <div className='list'>
         {loading ? (<AiOutlineReload className="icon"/>) :  <div className='list_container'>
              <div className='list_items'>
                      <div className='list_item'>
                      <img src={data[0] &&  data[0][0]?.photos[0]}/>
                        <div className='text'>
                            <p> { data[0] &&  data[0][0]?.city }  </p>
                            <span>{ data[0] &&  data[0]?.length}  properties</span>
                            </div>
                      </div>
                      <div className='list_item'>
                      <img src={data[1] &&  data[1][0]?.photos[0]}/>
                       <div className='text'>
                            <p>  {data[1] &&  data[1][0]?.city}  </p>
                            <span>{ data[1] &&  data[1]?.length} properties</span>
                            </div>
                       </div>
                    <div className='list_item'>
                        <img src={data[2] && data[2][0]?.photos[0]}/>
                        <div className='text'>
                            <p>  { data[2] && data[2][0]?.city} </p>
                            <span>{data[2] && data[2]?.length} properties</span>
                            </div>
                       </div>
              </div>
          </div>}
          <ListType/>
          <LitsLoved/>
          <Travlled/>
    </div>
  )
}

export default List