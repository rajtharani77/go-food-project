import React,{useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge"
import  Modal from "../Modal.jsx";
import Cart from "../screens/cart.jsx"
import {usecart} from '../components/ContectReduces.jsx';

export default function Navbar () {
  const [cartView,setcartView]=useState(false)
  const navigate = useNavigate();
  let data = usecart();
  const handlelogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('UserEmail');
    navigate("/");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success position-relative" data-bs-theme="light">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem('authToken')) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/MyOrder">My Orders</Link>
                </li> : ""}
            </ul>
            {(!localStorage.getItem('authToken')) ?
              <div className='d-flex'>
                <Link className="btn bg-white fw-bold text-success mx-2" to="/Login">Login</Link>
                <Link className="btn bg-white fw-bold text-success mx-2" to="/createuser">Sign-Up</Link>
              </div>
              : <>
                <div className='btn bg-white fw-bold text-success mx-2' onClick={() => setcartView(true)}>
                  My Cart {" "}
                  {data.length>0? <Badge pill bg="danger">{data.length}</Badge>:""}
                </div>
                {cartView ? <Modal onClose={()=>setcartView(false)}><Cart></Cart></Modal>:null}
                <div className='btn bg-white fw-bold text-danger mx-2' onClick={handlelogout}>
                  Logout
                </div>
              </>}
          </div>
        </div>
      </nav>
    </div>
  )
}
