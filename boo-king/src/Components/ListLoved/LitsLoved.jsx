import React from 'react'
import './ListLoved.scss'
import izmir from "../../images/izmir.jpg"
import { useState } from 'react';
import {AiOutlineArrowLeft} from "react-icons/ai"
import {AiOutlineArrowRight} from "react-icons/ai"
import axio from 'axios';
import { useEffect } from 'react';
import axios from 'axios';
import {AiOutlineReload} from "react-icons/ai"


const LitsLoved = () => {
  
    const left = () =>{

        let click = document.querySelector(".scroll-images1");
        if(click) {
        click.scrollBy(265 , 0);
      }
    
    
      }
      const right = () =>{
    
        let click = document.querySelector(".scroll-images1");
        if(click) {
    
        click.scrollBy(-265 , 0);
      }
    
      }
    
      const [clicked , setCliked] = useState(false)
      const [data , setData] = useState([]);
      const [loading , setLoading] = useState(false);
      const [err , setErr] = useState(false);
      const [featrured , setFeatrued] = useState({})
      const [ro , setRo] = useState([]);
      useEffect(() => {
        
        const fecthData = async () => {
          setLoading(true)
          try {
          const res = await axios.get('http://localhost:8080/api/hotels/find');
          setData(res.data);
            
          } catch (error) {
              setErr(error)
          }
setLoading(false);
        }
        fecthData();
      }, [random])

 

        const generate = (min , max) => {
              let randomNumber = Math.random();
              let totalPossibilities = max-min+1
              randomNumber = randomNumber*totalPossibilities;
              randomNumber = randomNumber +min
              randomNumber = Math.floor(randomNumber)
          return randomNumber
      }
      var random = []
          for(let i= 0 ; i<5 ;  i++) {
              let randomNumbres = generate(0 , data?.length);
              random.push({ran :randomNumbres});
          }
         
      return (
        <>
        <div id="div"> <h6> Great destinations for a beach holiday </h6> </div>
        <div className='list_type1'  id='list_type1'>
    
          {clicked &&
             <div className='button'>  <AiOutlineArrowLeft id="button" onClick={right} />  </div>
          }

            { loading ?   <AiOutlineReload className='icon'/> : <div className='cover1'>

              <div className='scroll-images1' id="scroll-images1">
            { random.map((rak ) => (
                   
              <div className='child1'> 
                <img src={data[rak.ran]?.photos[0]} alt="photo"/>  
                <div className='items11'>
                   <p id="p4"> {data[rak.ran]?.name} </p>
                   <p id="p5"> {data[rak.ran]?.city} </p>
                   <p id="p11"> {data[rak.ran]?.lowPrice} MAD </p>
                  <p id="p23">  <span> {data[rak.ran]?.raiting}</span> Excellent  <p style={{marginLeft:"10px"}}>   </p>  </p>                       
                </div>
              </div>
      ))}
             
         </div> 

     </div>
  }
             
              
    
           
             <div className='button' onClick={()=> setCliked(true)} >  <AiOutlineArrowRight id="button"   onClick={left} />  </div>
    
        </div>
        </>
  )
}

export default LitsLoved