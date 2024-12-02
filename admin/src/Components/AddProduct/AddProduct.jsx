import { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
    });

    const addProduct = async () => {
        // Log the product details for debugging
        console.log(productDetails);

        let responseData;
        let product = { ...productDetails };
        let formData = new FormData();
        
        if (image) {
            formData.append('product', image);
        }

        // Upload Image
        try {
            const imageUploadResponse = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

            // Check if response is JSON
            const contentType = imageUploadResponse.headers.get('Content-Type');
            const textResponse = await imageUploadResponse.text(); // Get raw response

            console.log('Raw Image Upload Response:', textResponse); // Log raw response for debugging

            if (contentType && contentType.includes('application/json')) {
                responseData = JSON.parse(textResponse); // Parse only if it's JSON

                if (responseData.success) {
                    product.image = responseData.image_url; // Add image URL to product details
                    console.log(product);
                } else {
                    alert('Failed to upload image');
                    return;
                }
            } else {
                console.error("Expected JSON but got:", textResponse);
                alert('Unexpected response format from server');
                return;
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert('Image upload failed');
            return;
        }

        // Add Product
        try {
            const productAddResponse = await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            const productData = await productAddResponse.json();

            if (productData.success) {
                alert('Product Added');
                // Optionally clear the form after success
                setProductDetails({
                    name: "",
                    image: "",
                    category: "women",
                    new_price: "",
                    old_price: "",
                });
                setImage(null);
            } else {
                alert('Failed to add product');
            }
        } catch (error) {
            console.error("Error adding product:", error);
            alert('Failed to add product');
        }
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="add-product">
            <div className="addproduct-itemfiled">
                <p>Product title</p>
                <input
                    value={productDetails.name}
                    onChange={changeHandler}
                    type="text"
                    name="name"
                    placeholder="Type here"
                />
            </div>

            <div className="addproduct-price">
                <div className="addproduct-itemfiled">
                    <p>Price</p>
                    <input
                        value={productDetails.old_price}
                        onChange={changeHandler}
                        type="text"
                        name="old_price"
                        placeholder="Type here"
                    />
                </div>

                <div className="addproduct-itemfiled">
                    <p>Offer Price</p>
                    <input
                        value={productDetails.new_price}
                        onChange={changeHandler}
                        type="text"
                        name="new_price"
                        placeholder="Type here"
                    />
                </div>
            </div>

            <div className="addproduct-itemfiled">
                <p>Product Category</p>
                <select
                    value={productDetails.category}
                    onChange={changeHandler}
                    name="category"
                    className="add-product-selector"
                >
                    <option value="Handicraft">Handicraft</option>
                    <option value="Toys">Toys</option>
                    <option value="Art">Art</option>
                    <option value="Chappals">Chappals</option>
                    <option value="Koudi">Koudi</option>
                </select>
            </div>

            <div className="addproduct-itemfiled">
                <label htmlFor="file-input">
                    <img
                        src={image ? URL.createObjectURL(image) : upload_area}
                        className="add-product-thubnail-img"
                        alt=""
                    />
                </label>
                <input
                    onChange={imageHandler}
                    type="file"
                    name="image"
                    id="file-input"
                    hidden
                />
            </div>

            <button onClick={addProduct} className="add-product-btn">
                Add
            </button>
        </div>
    );
};

export default AddProduct;
