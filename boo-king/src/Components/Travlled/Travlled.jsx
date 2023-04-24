import React from 'react';
import './Travlled.scss';
import antalya from "../../images/antalya.jpg"
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import {AiOutlineReload} from "react-icons/ai"
import { Navigate } from 'react-router-dom';

const Travlled = () => {

    const [data , setData] = useState([])
    const [loadin , setLoading] = useState(false)
    const [err , setErr] = useState(false)
    const [info , setInfos] = useState('tunisie');

    const photos = [
     { photo :  ' https://images.pexels.com/photos/3581916/pexels-photo-3581916.jpeg'},
     {  photo :  " https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=1600"},
       {photo: "https://images.pexels.com/photos/6254541/pexels-photo-6254541.jpeg?auto=compress&cs=tinysrgb&w=1600"},
    { photo :    "https://images.pexels.com/photos/356844/pexels-photo-356844.jpeg?auto=compress&cs=tinysrgb&w=1600"}
    ]




 useEffect(() => {

    const fetchData = async () => { 
        setLoading(true)
        try {

            const res = await axios.get('http://localhost:8080/api/hotels/countryLoved')
            setData(res.data)
            
        } catch (error) {
            setErr(error)
        }
        setLoading(false)
    }
    fetchData();
   
 }, [])

 console.log(data , "data")

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
   

 
       const pop = Object.entries(photos)

  return (

    <>
        <div id="div"> <h6> Connect with other travellers </h6> </div>
        <div className='list_type1'  id='list_type1'>
    
       
            <div className='cover1'>
              <div className='scroll-images1' id="scroll-images1">
                   
     {    
    photos.map((photo , i) => (

         data.map((item) => (

    <div className='child11'> 
    <>
          <img src={item[0] == "Morroco" ?  "https://images.pexels.com/photos/3581916/pexels-photo-3581916.jpeg" : item[0] == "Brazil"  ? "https://images.pexels.com/photos/351283/pexels-photo-351283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" : item[0] == "espagne" ? "https://images.pexels.com/photos/8430374/pexels-photo-8430374.jpeg?auto=compress&cs=tinysrgb&w=1600" : item[0] == "belgique" ?  " https://images.pexels.com/photos/6254541/pexels-photo-6254541.jpeg?auto=compress&cs=tinysrgb&w=1600" : "" }  key={i}/>  
          </>

            <div className='items11'>
            <p id="p4"> {item[0]} </p>
                <p id="p5"> {item[1]} properties  </p>
                                                
            </div>
    </div>

    ))    
)) }

    </div>  </div>
             
              
    
           
    
        </div>
        </>
  )
}

export default Travlled