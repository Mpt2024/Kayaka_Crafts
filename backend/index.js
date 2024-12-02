
const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
// const { type } = require('os');
const { log } = require('console');

app.use(express.json());
app.use(cors());
// app.use(cors({ origin: 'http://localhost:3000' }));


// database connection with mangodb
 mongoose.connect('mongodb+srv://narasa7373:narasa%40321@cluster0.o625k.mongodb.net/Ecommerce');
   // mongoose.connect('mongodb+srv://vshishanjan:Sri123@cluster0.mhnlv.mongodb.net/Ecommerce');


//api creation
app.get('/', (req, res) => {
    res.send('Express app is running')
})

//image storege engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cd) => {
        return cd(null, `${file.fieldname}_${Date.now()} ${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage });

//creating upload endpoint  for images
app.use('/images', express.static('upload/images'))
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})


//Schema for creating Products
const Product = mongoose.model('product', {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    }
})

app.post('/addproduct', async (req, res) => {
    let products = await Product.find();
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    console.log(product);
    await product.save();
    console.log('Product saved');
    res.json({
        success: true,
        name: req.body.name,
    });
});


// creating the Api for deleting Products
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log('Remove');
    res.json({
        success: true,
        name: req.body.name
    })

})

//Creating api for getting all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log('all products fetched');
    res.send(products);

})

//schema creating for user model
const Users = mongoose.model('Users', {
    name: {
        type: String,

    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,

    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

//creating endpoint for registering the user
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: 'existing user found with same email address' })

    }
    let cart = {}
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;

    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart
    })
    await user.save();
    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })

})

// creating endpoint for user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        }
      else{
        res.json({success:false,errors:"wrong password"});
      }
      
    }
    else{
        res.json({success:false,errors:'wrong emailid'});
    }
})

//creating the endpoint for newcollection data
 app.get('/newcollectoin',async(req,res)=>{
    let products= await Product.find({});
    let newcollection=products.slice(5).slice(-15);
    console.log('newcollection fetched');
    res.send(newcollection)
    
 })

 //creating endpoint for popular in women section
 app.get('/popularinwomen', async (req,res)=>{
    let products= await Product.find({category:'Koudi'});




    let popular_in_women=products.slice(0,4);
    console.log('popular women data fetched');
    
    res.send( popular_in_women)
 })

 //creating middileware to fetch user
 const fetchUser=async (req,res,next)=>{
const token = req.header('auth-token');
if(!token){
    res.status(401).send({errors:'please authenticate using valid token '});
}
else{
    try{
        const data=jwt.verify(token,'secret_ecom');
        req.user=data.user;
        next();

    }
    catch (error){
        res.status(401).send({errors:'please authenticat using valid token'})
    }
}
 }
 //creating endpoint for adding products in cart data
app.post('/addtocart',fetchUser, async (req,res)=>{
    console.log('Added',req.body.itemId);

    
let userData= await Users.findOne({_id:req.user.id }); 
     userData.cartData[req.body.itemId] += 1;
     await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
     res.send("Added");
})

//deleting the cart product 
app.post('/removefromcart',fetchUser, async (req,res)=>{
    console.log('remeved',req.body.itemId);
    
    let userData= await Users.findOne({_id:req.user.id }); 
    if(userData.cartData[req.body.itemId]>0);{
    userData.cartData[req.body.itemId] -= 1;}
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("removed");
})

//creating endoint get the cart data
app.post('/getcart',fetchUser,async (req,res)=>{
    console.log('get cart');
    let userData= await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
    
})
const Address = mongoose.model('Address', {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


// Endpoint for saving an address
app.post('/saveaddress', fetchUser, async (req, res) => {
    try {
        // Create a new address instance
        const address = new Address({
            userId: req.user.id,  // Get the user ID from the JWT token
            name: req.body.name,
            address: req.body.address,
            city: req.body.city,
            postalCode: req.body.postalCode,
            country: req.body.country
        });

        // Save the address in MongoDB
        await address.save();
        res.json({ success: true, message: 'Address saved successfully' });
    } catch (error) {
        console.error('Error saving address:', error);
        res.status(500).json({ success: false, message: 'Failed to save address' });
    }
});

// creating the apiendponit getting the user address 

app.get('/address', async (req,res)=>{

    let address= await Address.find({});
    console.log( 'address fetched');
    res.send(address);
})

app.listen(port, (error) => {
    if (!error) {
        console.log('server running on port ' + port);

    }
    else {
        console.log('Error:' + error);

    }
});
