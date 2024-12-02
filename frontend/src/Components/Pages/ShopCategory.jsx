import React, { useContext, useState } from "react";
import './CSS/ShopCategory.css'
import { ShopContext } from "../Context/ShopContex";
import Item from "../Item/Item";




const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext)

  return <div className="shop-category">
    <img className="shopCategory-banner" src={ props.banner } alt="" />
    <div className="shopCategory-indexSort">
      <p>
      </p>
      <div className="shopCategory-sort">
      </div>
    </div>
    <div className="shopCategory-products">
      {
        all_product.map((item, i) => {

          if (props.category === item.category) {
   
        return <Item key={ i } item={item.category}  id={ item.id } name={ item.name } image={ item.image } new_price={ item.new_price } old_price={ item.old_price } />
          }
          else {
            return null;
          }
        })
      }
    </div>
    <div className="shopCategory-loadmore">
      Explore More
    </div>
  </div>;
};

export default ShopCategory;
