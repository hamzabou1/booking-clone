import React from 'react'
import './ListType.scss'
import {BsArrowLeftShort} from "react-icons/bs";
import {BsFillArrowRightCircleFill} from "react-icons/bs"
import izmir from "../../images/izmir.jpg"
import {useState} from "react"
import {AiOutlineArrowRight} from "react-icons/ai"
import {AiOutlineArrowLeft} from "react-icons/ai"
import { useEffect } from 'react';
import {AiOutlineReload} from "react-icons/ai"
import axios from 'axios';
const ListType = () => {


  const left = () =>{

    let click = document.querySelector(".scroll-images");
    if(click) {
    click.scrollBy(175 , 0);
  }


  }
  const right = () =>{

    let click = document.querySelector(".scroll-images");
    if(click) {

    click.scrollBy(-175 , 0);
  }

  }
  const  [data , setData] = useState([]);
  const [loading , setLoading] = useState(false);
  const [err , setErr] = useState(false);
  const [clicked , setCliked] = useState(false)

  useEffect(() => {
     const fetch = async () => {
      setLoading(true)
   try {
      const res = await axios.get('http://localhost:8080/api/hotels/countByType');
      setData(res.data);
   } catch (error) {
      setErr(error);
   }
   setLoading(false)
}
fetch();

  }, [])


const images = [
   "https://images.pexels.com/photos/4627612/pexels-photo-4627612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
   "https://images.pexels.com/photos/3889840/pexels-photo-3889840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
   "https://images.pexels.com/photos/4502965/pexels-photo-4502965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
   "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
   "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
   "https://images.pexels.com/photos/4627612/pexels-photo-4627612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
   "https://images.pexels.com/photos/3889840/pexels-photo-3889840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
   "https://images.pexels.com/photos/4502965/pexels-photo-4502965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
   "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
 ];


  return (
    <>
    <div id="div"> <h6> Browse by property type </h6> </div>
    <div className='list_type'  id='list_type'>
      {clicked &&
         <div className='button'>  <AiOutlineArrowLeft id="button" onClick={right} />  </div>
      }
{ loading ?   <AiOutlineReload className='icon'/>:  <>
     { data && 
                  <div className='cover'>
                  <div className='scroll-images' id="scroll-images">
              { images.map((img , i) =>(
                        <div className='child' > 
                              <img src={img}/>  
                              <div className='items1'>
                                 <>
                                    <p id="p1"> {data[i]?.type}</p>
                                    <p id="p2">{data[i]?.count}</p>
                                 </>
                            
                              </div>
                        </div>

               ))
}
                  </div>
            </div> 
           }
            </>
  }
                  <div className='button' onClick={()=> setCliked(true)} >  <AiOutlineArrowRight id="button"   onClick={left} />  </div>

    </div>
    </>
  )
}

export default ListType