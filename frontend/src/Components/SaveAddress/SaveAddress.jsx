import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContex";
import './SaveAddress.css'

const SaveAddress = ({filterProducts}) => {
    console.log('save',filterProducts);
    
    const { getTotalCartAmount, all_product, cartItems, addToCart } = useContext(ShopContext);
    const [useraddress,setuseraddress]=useState([])
    const [address, setAddress] = useState({
        name: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    
    const handleSubmit = async () => {
        // 1. Validate address fields
        if (!address.name || !address.address || !address.city || !address.postalCode || !address.country) {
            alert('Please fill out all address fields');
            return;
        }
    
        const token = localStorage.getItem('auth-token');

        try {
            const response = await fetch('http://localhost:4000/saveaddress', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                'auth-token':token
                },
                body: JSON.stringify(address),
            });
    
            // Check if the response is okay
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const responseData = await response.json();
    
            if (responseData.success) {
               
                window.location.replace('/CheckOut');
            } else {
                // Check if errors exist and alert the user
                const errorMessage = responseData.errors || 'An unknown error occurred. Please try again.';
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Error saving address:', error);
            alert('An error occurred while saving the address. Please try again.');
        }
    };
    

    return (
        <div >
            <div className="saveaddress">
            <h2>Shipping Information</h2>
            <hr/>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={address.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={address.address}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={address.city}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={address.postalCode}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={address.country}
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Save Address</button>
            </div>

           

        </div>
    );
};

export default SaveAddress;
