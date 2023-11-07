import axios from 'axios'
import React, { useState } from 'react'
import "./Signup.css"

function Signup() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')

  const signup = async () => {
    const response = await axios.post("/signup", {
      name: name,
      email: email,
      mobile: mobile,
      password: password
    });

    if(response.data.success){
      alert(response.data.message);
      window.location.href = "/login";
    }
  }

  return (
    <div>
      <div className='signup-container'>
          <h1 className='signup-title'>Signup</h1>

          <div className='input-container'>
            <label className='input-label'>Name</label>
            <input
                type='text'
                placeholder='Enter your name'
                className='input-field'
                value={name}
                onChange={(e)=>{
                  setName(e.target.value)
                }}
                />
          </div>

          <div className='input-container'>
            <label className='input-label'>Email</label>
            <input
                type='email'
                placeholder='Enter your email'
                className='input-field'
                value={email}
                onChange={(e)=>{
                  setEmail(e.target.value)
                }}
                />
          </div>

          <div className='input-container'>
            <label className='input-label'>Mobile</label>
            <input
                type='text'
                placeholder='Enter your mobile'
                className='input-field'
                value={mobile}
                onChange={(e)=>{
                  setMobile(e.target.value)
                }}
                />
          </div>

          <div className='input-container'>
            <label className='input-label'>Password</label>
            <input
                type='password'
                placeholder='Enter your password'
                className='input-field'
                value={password}
                onChange={(e)=>{
                  setPassword(e.target.value)
                }}
                />
          </div>

          <button
            type='button'
            className='signup-btn'
            onClick={signup}>
            Signup
          </button>
      </div>
    </div>
  )
}

export default Signup
