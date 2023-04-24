import React from 'react'
import './SearchResults.scss'
import izmir from "../../../images/izmir.jpg"
import {BsDot} from "react-icons/bs"
import { Link } from 'react-router-dom'
import {AiFillStar} from "react-icons/ai"
import {useNavigate} from "react-router-dom";


const SearchResults = ({location}) => {


    const navigate = useNavigate();

    console.log("location.rooms " , location.days)

  
  return (
    <div className='results'>
        {   location?.data?.map((item) => (


            <div className='results_item'>
         <div className='img'> 
                 <img src={item.photos[0]}/>
         </div>
         <div className='hotel_details'>
            <div className='hotel_localisation'>
                <div className='hotel_name'>
                     <div className='title_raiting'> 
                     <h4> {item.name} </h4> 

                     <p>   <AiFillStar id="icon"/>   <AiFillStar id="icon"/> <AiFillStar id="icon"/> <AiFillStar id="icon"/> </p> 
                     </div> 
                     <div className='distance'> 
                        <div className='correct'>  <Link id="link" to="/"> Aventino</Link> ,<Link id="link" to="/"> RomeShow on map </Link>    </div>
                        <p> <span><BsDot id="icon"/></span>{item.distance}m from centre <span><BsDot id="icon"/></span>  Metro access</p>  
                     </div> 
                </div> 

                <div className='hotel_raiting'>
                    <div className='content'> 
                        <div className='reviews'> 
                            <p> Good </p>  
                           { item.review && <p id="p"> {item.review} reviews </p> }

                        </div> 
                        <div className='avrg'> 
                        <p>  {item.raiting} </p> 
                        </div> 
                    
                    </div> 

                </div> 
            </div> 
            <div className='hotel_description'>  
             <div className='desc_details'>
                    <p id="p2"> 1 extra-large double bed</p> 
                    <p id="p3">  Breakfast included </p> 
                    <p id="p4">  Only 1 room left at this price on our site</p> 

            </div> 
               <div className='dsec_price'> 
                  <div className='price_content'> 
                      <p id="p3">  { location.days  && <span>  {location.days} nights,</span>}  {location.adultes} adults  {location.childrens !== 0 && ( <span> ,{location.childrens} children    </span>) }, {location.rooms} room </p>
                      <p id="p1">{item.lowPrice * location.rooms * location.days} MAD </p>
                      <p id="p2"> { item.taxes ?  item.taxes : (<p> 0 MAD for taxes</p>)  }</p>
                     <button onClick={ () =>  navigate(`/hotels/${item._id}` ,{ state : {item , days:location.days , dates:location.date} })}> See availability    </button>      
                  </div> 
               </div> 
            </div>


         </div>
        </div>
        
        ))
}
    </div>
  )
}

export default SearchResults