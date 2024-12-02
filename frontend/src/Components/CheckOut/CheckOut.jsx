import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContex";
import { Link } from "react-router-dom";
import gpay from '../Assets/gpay.jpg'
import phonepay from '../Assets/phonepay.png'
import paytm from '../Assets/paytm.png'

const CheckOut = () => {
    const { getTotalCartAmount, all_product, removeFromCart, cartItems, addToCart } = useContext(ShopContext);

    const [address,setAddress]=useState([])

    useEffect(() => {
        let user= localStorage.getItem('auth-token')
        if (user ){
            fetch('http://localhost:4000/address').then((res)=>res.json()).then((data)=>setAddress(data))
        }
        else {
            alert('please login')
        }
      
    
    }, []);
    
    console.log(address);
    
    const addQuantity = (itemId) => {

        addToCart(itemId);


    };


    return (
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Add Quantity</p>

                <p>Total</p>
            </div>
            <hr />
            {
                all_product.map((e) => {
                    if (cartItems[e.id] > 0) {
                        return (
                            <div key={e.id }>
                                <div className="cartitems-format cartitems-format-main">
                                    <img src={ e.image } alt="" className="carticon-product-icon" />
                                    <p>{ e.name }</p>
                                    <p>${ e.new_price }</p>
                                    <button className="cartitems-quantity">{ cartItems[e.id] } </button>
                                    <button className="cartitems-quantity" onClick={ () => addQuantity(e.id) }>+1</button>
                                    <p>${ e.new_price * cartItems[e.id] } </p>
                                </div>
                                <hr />
                            </div>
                        )
                    }
                    return null;
                })
            }
            <div className="cartitems-down">
                <div className="cartitems-total">

                    <div>

                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${ getTotalCartAmount() }</h3>
                        </div>
                    </div>

                    <h1>Payments Opitions</h1>

                    <div style={ { display: 'flex', alignItems: 'center' } }>
                        <img style={ { width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignContent: 'center' } } src={ gpay } alt="" /> <span  style={{marginLeft:'20px',cursor:'pointer'}}>Google Pay</span>
                    </div>

                    <div style={ { display: 'flex', alignItems: 'center' } }>
                        <img style={ { width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignContent: 'center' } } src={ phonepay } alt="" /> <span  style={{marginLeft:'20px',cursor:'pointer'}}>Phone Pay</span>
                    </div>

                    <div style={ { display: 'flex', alignItems: 'center' } }>
                        <img style={ { width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignContent: 'center' } } src={ paytm } alt="" /> <span style={{marginLeft:'20px',cursor:'pointer'}}>Paytm</span>
                    </div>

                    
                    {
                        address.map((item,index)=>{
                            return <div>
                                <p>{item.name}</p>
                                <p>{item.address}</p>
                                <p>{item.city}</p>
                                <p>{item.postalCode}</p>
                                <p>{item.country}</p>

                                 </div>
                        })
                    }
         <Link to='/saveaddress'><button style={{background:'black',color:'white'}}>Add address</button></Link>
                    <Link to='/checkout'>  <button>Place Order</button></Link>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, enter here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder=" promocode" />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );





};

export default CheckOut;
