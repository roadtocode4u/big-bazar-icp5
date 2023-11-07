import React, {useState} from 'react'
import axios from 'axios'

import "./Login.css"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () =>{
    const response = await axios.post("/login", {
      email: email,
      password: password
    });

    alert(response.data.message);

    if(response.data.success){
      localStorage.setItem("user", JSON.stringify(response.data.data));

      window.location.href = "/";
    }
  }

  return (
    <div>
      <div className='login-container'>
        <h1 className='login-title'>Login</h1>

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

        <button className='login-btn' onClick={login}>
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
