import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
import path from 'path';
const __dirname = path.resolve();

import mongoose from 'mongoose';
import Product from './models/Product.js';
import User from './models/User.js';
import Order from './models/Order.js';

const app = express();
app.use(express.json());

const connectMongoDB = async () => {
  const connection = await mongoose.connect(process.env.MONGODB_URI);

  if (connection) {
    console.log('Connected to MongoDB');
  }
}
connectMongoDB();

app.post('/product', async (req, res) => {
  const { name, price, description, image } = req.body;

  const product = new Product({
    name: name,
    price: price,
    description: description,
    image: image
  });

  try {
    const savedProduct = await product.save();

    res.json({
      success: true,
      data: savedProduct,
      message: 'Product added successfully'
    })
  } catch (e) {
    res.json({
      success: false,
      message: e.message
    })
  }
})

app.get('/products', async (req, res) => {
  const products = await Product.find();

  res.json({
    success: true,
    data: products,
    message: 'Products retrieved successfully'
  })
})

app.get('/product/:id', async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id });

  res.json({
    success: true,
    data: product,
    message: 'Product retrieved successfully'
  })
})

app.delete("/product/:id", async (req, res) => {
  const { id } = req.params;

  await Product.deleteOne({ _id: id });

  res.json({
    success: true,
    message: 'Product deleted successfully'
  })
});

app.put("/product/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image } = req.body;

  await Product.updateOne({ _id: id }, {
    $set: {
      name: name,
      price: price,
      description: description,
      image: image
    }
  });

  const updatedProduct = await Product.findOne({ _id: id });

  res.json({
    success: true,
    data: updatedProduct,
    message: 'Product updated successfully'
  })
});

app.post("/signup", async(req, res)=>{
  const {name, email, mobile, password} = req.body;

  const user = new User({
    name: name,
    email: email,
    mobile: mobile,
    password: password
  });

  try{
    const savedUser = await user.save();

    return res.json({
      success: true,
      data: savedUser,
      message: "User registered successfully"
    })
  }
  catch(e){
    return res.json({
      success: false,
      message: e.message
    })
  }
})

app.post("/login", async(req, res)=>{
  const {email, password} = req.body;

  const user = await User.findOne({email: email, password: password});

  if(user){
    return res.json({
      success: true,
      data: user,
      message: "User logged in successfully"
    })
  }
  else
  {
    return res.json({
      success: false,
      message: "Invalid email or password"
    })
  }
})

app.post("/order", async(req, res)=>{
  const {product, user, quantity, shippingAddress} = req.body;

  const order = new Order({
    product: product,
    user: user,
    quantity: quantity,
    shippingAddress: shippingAddress
  });

  const savedOrder = await order.save();

  return res.json({
    success: true,
    data: savedOrder,
    message: "Order placed successfully"
  })
})

app.get("/orders", async(req, res)=>{
  const {id} = req.query;

  const orders = await Order.find({user: id}).populate("product user");

  res.json({
    success: true,
    data: orders,
    message: "Orders retrieved successfully"
  })
})

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
  });
}

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
