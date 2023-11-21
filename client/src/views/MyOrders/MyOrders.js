import React, {useEffect, useState} from 'react'
import axios from 'axios'
import "./MyOrders.css"

function MyOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async()=>{
    const user = JSON.parse(localStorage.getItem("user")) || null;

    const response = await axios.get(`/orders?id=${user._id}`)

    setOrders(response?.data?.data);
  }

  useEffect(()=>{
    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className='text-center'>My Orders</h1>

      {
        orders?.map((order, index)=>{
          const {product, quantity, shippingAddress} = order;
          return (
          <div key={index} className='order-card'>
            <h2>{product.name}</h2>
            <p> {product.price} x {quantity} = {product.price * quantity}</p>
            <p>Shipping Address: {shippingAddress}</p>

          </div>)
        })
      }
    </div>
  )
}

export default MyOrders
