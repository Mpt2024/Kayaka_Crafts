import React, { useState } from "react";

import Item from "./Item/Item";
import chappal1 from './Assets/Chappal1.png'
import chappal2 from './Assets/Chappal2.png'
import chappal3 from './Assets/Chappal3.png'
import Chappal4 from './Assets/Chappal4.png'



const Chappal = () => {
    const [data_product,setdata_product]=useState([{
        id: 1,
        name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
        category: "women",
        image: chappal1,
        new_price: 50.0,
        old_price: 80.5,
      },
      {
        id: 2,
        name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
        category: "women",
        image: chappal2,
        new_price: 85.0,
        old_price: 120.5,
      },
      {
        id: 3,
        name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
        category: "women",
        image: chappal3,
        new_price: 60.0,
        old_price: 100.5,
      },
      {
        id: 4,
        name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
        category: "women",
        image: Chappal4,
        new_price: 100.0,
        old_price: 150.0,
      
    }])
    
  return(
    <div className="popular ">
    <h1>Kolhapuri Chappal</h1>
    <hr style={{width:'120px',height:'3px',color:'black'}}/>
    <div className="popular-item">
      {
        data_product.map((item,i)=>{
          return<Item key={i} id={item.id} name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price}  />
        })
      }
    </div>
      </div>  
)
};

export default Chappal;
