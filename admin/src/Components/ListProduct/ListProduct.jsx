
import { useState } from 'react';
import './ListProduct.css'
import { useEffect } from 'react';
import cross_icon from '../../assets/cross_icon.png';
const ListProduct = () => {

  const [allproducts, setAllproducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => { setAllproducts(data) });
  }
  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct= async (id)=>{
     await fetch('http://localhost:4000/removeproduct',{
        method:'post',
        headers:{
          Accept:'application/json',
          'Content-type':'application/json'
        },
        body:JSON.stringify({id:id})
     })
    await fetchInfo();
  }

  return <div className="list-product">
    <h1>All Products List</h1>
    <div className="listproduct-format-main">
      <p>Product</p>
      <p>Title</p>
      <p>Old_price</p>
      <p>New_price</p>
      <p>Category</p>
      <p>Remove</p>

    </div>
    <div className="listproduct-allproducts">
      <hr />
      {
        allproducts.map((product, index) => {
          return <> <div key={ index } className='listproduct-format-main listproducts-format'>
            <img src={ product.image } alt="data" className="listproduct-product-icon" />
            <p>{ product.name }</p>
            <p>{ product.old_price }</p>

            <p>{ product.new_price }</p>
            <p>{ product.category }</p>
            <img onClick={()=>removeProduct(product.id)} className='listproduct-remove-icon' src={ cross_icon } alt="" />

          </div>
          <hr/>
          </>
        })
      }
    </div>
  </div>;
};

export default ListProduct;
