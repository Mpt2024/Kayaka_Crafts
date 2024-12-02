import React, { useContext, useRef, useState } from "react";
import './Navbar.css';
import kclogo from '../Assets/kclogo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContex";
import dropdown_icon1 from '../Assets/dropdown_icon1.png'
import search_icon from '../Assets/search_icon.png';

const Navbar = ({filter}) => {
  const { all_product } = useContext(ShopContext)

    
    const [searchPrice, setSearchPrice] = useState('');  
  const [filteredProducts, setFilteredProducts] = useState(all_product); 
   const cartUser=()=>{
if(!localStorage.getItem('auth-token')){
  alert('please login')
  window.location.href = '/loginSignUp';
}else{
  
}
   }


    const [menu, setMenu] = useState('shop')
    const { getTotalCartItems } = useContext(ShopContext);
    const menuRef = useRef();
    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open')
    }


    // Function to handle search by price
  const handleSearch = (event) => {
    const price = event.target.value;  
    setSearchPrice(price); 

    if (price === ' ') {
        filter(all_product);  // If input is empty, show all products
    } else {
      // Filter products based on the price entered by the user
      const filtered = all_product.filter(product => 
        product.new_price.toString().includes(price)
      );
      filter(filtered);  // Update the filtered product list
    }
  };

 
    return (
        <div className="navbar">
            <div className="nav-logo">
                <img style={{width:'70px',height:'70px'}} src={kclogo} alt="" />
                <p style={{color:'red'}}><b>KAYAKA</b></p>
            </div>
            <img className="nav-dropdown" onClick={ dropdown_toggle } src={ dropdown_icon1 } alt="" />
            <ul ref={ menuRef } className="nav-menu">
                <li onClick={ () => { setMenu('shop') } } ><Link style={ { textDecoration: 'none' } } to='/'>Shop</Link>{ menu === 'shop' ? <hr /> : <></> } </li>
                <li onClick={ () => { setMenu('men') } }><Link style={ { textDecoration: 'none' } } to='/Handicraft'>Handicraft</Link>{ menu === 'men' ? <hr /> : <></> }</li>
                <li onClick={ () => { setMenu('women') } }><Link style={ { textDecoration: 'none' } } to='/Toys'>Toys</Link>{ menu === 'women' ? <hr /> : <></> }</li>
                <li onClick={ () => { setMenu('kids') } }><Link style={ { textDecoration: 'none' } } to='/Art'>Art</Link>{ menu === 'kids' ? <hr /> : <></> }</li>
                <li onClick={ () => { setMenu('Chappals') } }><Link style={ { textDecoration: 'none' } } to='/Chappals'>Chappals</Link>{ menu === 'Chappals' ? <hr /> : <></> }</li>

            </ul>
            <div>
              <Link to='search'>
              <input style={{width:'100%',height:'40px',borderRadius:"10px",border:'1px solid gray',paddingLeft:'10px'}}
                    type="text"
                    value={ searchPrice }
                    onChange={ handleSearch }
                    placeholder=" product by price "
                />
              </Link>
            </div>

            <div className="nav-login-cart">
                { localStorage.getItem('auth-token') ? <button onClick={ () => { localStorage.removeItem('auth-token'); window.location.replace('/') } }>Logout</button> :
                    <Link style={ { textDecoration: 'none' } } to='/loginSignUp'> <button>Login</button></Link> }


                <Link style={ { textDecoration: 'none' } } to='/cart'> <img onClick={cartUser} src={ cart_icon } alt="" /></Link>
                <div className="nav-cart-count">{ getTotalCartItems() }</div>
            </div>

          
     
        </div>
    )
};

export default Navbar;
