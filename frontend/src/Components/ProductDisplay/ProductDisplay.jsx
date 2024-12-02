// ProductDisplay.js
import React, { useState, useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../Context/ShopContex';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    if (!product) {
        return <div>Loading...</div>;  // Add a fallback for undefined product
    }


    return (
        <div className='productdisplay'>
            
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={ product.image } alt="" />
                    <img src={ product.image } alt="" />
                    <img src={ product.image } alt="" />
                    <img src={ product.image } alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={ product.image } alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{ product.name }</h1>
                <div className="productdisplay-right-star">
                    <img src={ star_icon } alt="" />
                    <img src={ star_icon } alt="" />
                    <img src={ star_icon } alt="" />
                    <img src={ star_icon } alt="" />
                    <img src={ star_dull_icon } alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old"><span>&#8377;</span>{ product.old_price }</div>
                    <div className="productdisplay-right-price-new"><span>&#8377;</span>{ product.new_price }</div>
                </div>
                <div className="productdisplay-right-description">
                    India brings to you the exquisite work, an age old craft tradition originating from Karnataka using handcrafted technique, and utility products.
                </div>
                <div className="productdisplay-right-size">

                    {
                        product.category === 'Chappals' ? <div className="productdisplay-right-sizes">
                            <div>
                                <p>Select Size</p>
                            </div>
                            <div>6</div>
                            <div>7</div>
                            <div>8</div>
                            <div>9</div>
                            <div>10</div>


                        </div> : <></>
                    }
                </div><br />
                <button onClick={ () => addToCart(product.id) }>ADD TO CART</button>

            </div>
        </div>
    )
}

export default ProductDisplay;
