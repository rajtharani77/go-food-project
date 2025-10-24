import React, {useState} from 'react';
import {Link, useNavigate } from "react-router-dom";

export default function SIgnup() {

  const Navigate= useNavigate();

    const [credentials, setcredentials] =useState({name:"",location:"",email:"",password:""})

    const handleSubmit= async (e)=>{
        e.preventDefault();

        const response=await fetch(`${import.meta.env.VITE_API_URL}/api/createuser`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password, location:credentials.location})
        });

        const json=await response.json()
        console.log(json);

        if(json.success){
          Navigate("/");
        }
        else{
            alert("enter valid credential.");
        }
    }
    
    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="container" style={{ maxWidth: '400px' }}>

      <form onSubmit={handleSubmit}>
      <h2 className="text-center mb-4">Sign Up to GoFood</h2>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange}/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputLocation" className="form-label">Address</label>
      <input type="text" className="form-control" name="location" value={credentials.location} onChange={onChange}/>
    </div>
    <button type="submit" className="btn btn-success w-100">Sign-Up</button>
    <p className="mt-3 text-center">
              Already a User? <Link to='/Login'>Login</Link>
            </p>
  </form></div></div>
  )
}
