import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Shop } from './Components/Pages/Shop';
import ShopCategory from './Components/Pages/ShopCategory';
import Product from './Components/Pages/Product';
import LoginSignUp from './Components/Pages/LoginSignUp';
import Cart from './Components/Pages/Cart';
import Footer from './Components/Footer/Footer';
import Bidriarts from './Components/Assets/Bidriarts.png'
import KinnalToysbanner from './Components/Assets/KinnalToysbanner.png'
import Embriodary from './Components/Assets/Embriodary.png'
import Chappals from './Components/Assets/Chappal.png'


import CheckOut from './Components/CheckOut/CheckOut';
import SaveAddress from './Components/SaveAddress/SaveAddress';
import { useState } from 'react';
import Search from './Components/Search/Search';


function App() {

  const [filterProducts,setFilterProducts]=useState([])

  const filter=(item)=>{
    setFilterProducts(item)

  }
console.log(filterProducts);

  return (
    <div>
      <BrowserRouter>
        <Navbar  filter={filter}/>

        <Routes>
          <Route path="/" element={ <Shop /> } />
          <Route path="/Handicraft" element={ <ShopCategory category='Handicraft' banner={Embriodary} />  } />
          <Route path="/Toys" element={ <ShopCategory category='Toys' banner={KinnalToysbanner}/> } />
          <Route path="/Art" element={ <ShopCategory  category='Art' banner={Bidriarts}/> } />
          <Route path="/Chappals" element={ <ShopCategory  category='Chappals' banner={Chappals}/> } />

          <Route path="/product" element={ <Product /> } >
            <Route path=':productId' element={ <Product /> } />
          </Route>
          <Route path="/loginSignUp" element={<LoginSignUp/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<CheckOut/>} />
          <Route path="/saveaddress" element={<SaveAddress  filterProducts={filterProducts}/>} />
          <Route path="/search" element={<Search filterProducts={filterProducts}/>} />







        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
