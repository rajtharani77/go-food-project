import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function Login() {


  const Navigate = useNavigate();

  const [credentials, setcredentials] = useState({ email: "", password: "" })
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/loginUser`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);

    if (json.success) {
      localStorage.setItem("UserEmail",credentials.email)
      localStorage.setItem("authToken",json.authToken);
      Navigate("/");
    }else{
        alert("enter valid credential.");
    }
  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="container" style={{ maxWidth: '400px' }}>
          <form onSubmit={handleSubmit} noValidate>
            <h2 className="text-center mb-4">Login to GoFood</h2>
    
            <div className="form-group mb-3">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input 
                type="email" 
                className="form-control" 
                id="exampleInputEmail1"
                placeholder="Enter your email" 
                name='email' 
                value={credentials.email} 
                onChange={onChange}
                required 
              />
            </div>
    
            <div className="form-group mb-4">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="exampleInputPassword1" 
                name='password' 
                value={credentials.password} 
                onChange={onChange} 
                placeholder="Password"
                required 
              />
            </div>
    
            <button type="submit" className="btn btn-success w-100">Login</button>
    
            <p className="mt-3 text-center">
              Not registered? <Link to='/createuser'>Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    )
}
