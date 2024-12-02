import React, { useContext } from "react";
import ProductDisplay from "../ProductDisplay/ProductDisplay";
import { ShopContext } from "../Context/ShopContex";
import { useParams } from "react-router-dom";
import DiscriptionBox from "../DiscriptionBox/DiscriptionBox";
import RelatedProducts from "../RelatedProducts/RelatedProducts";

const Product = () => {
  const {all_product}=useContext(ShopContext);
  const {productId}=useParams();
  const product = all_product.find((e)=> e.id === Number(productId));

  return ( <div>

  <ProductDisplay product={product}/>
  <DiscriptionBox/>
  <RelatedProducts/>
 
</div>
  )
};

export default Product;
