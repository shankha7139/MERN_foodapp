import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Modal from '../Model';
import Cart from '../screens/Cart';
import { useCart, useDispatchCart } from '../components/ContextReducer';


export default function Navbar() {
  const navigate = useNavigate()
  let data = useCart();
  const handlelogout = () => {
    localStorage.removeItem("authtoken")
    navigate('/login')
  }
  const [cartView, setCartView] = useState(false)
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">Khana</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>

              {(localStorage.getItem("authtoken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/">My Orders</Link>
                </li>
                : ""}
            </ul>

            {(!localStorage.getItem("authtoken")) ?
              <div className='d-flex'>
                <li className="nav-item">
                  <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                  <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
                </li>
              </div>
              :
              <div>
                <div className="btn bg-white text-success mx-1" onClick={() => { setCartView(true) }}>
                  My Cart{" "}
                  <Badge pill bg="danger">{data.length}</Badge>
                </div>
                {cartView ? <Modal onClose={() => (setCartView(false))}><Cart></Cart></Modal> : null}

                <div className="btn bg-white text-danger mx-1" onClick={handlelogout}>Log out</div>
              </div>
            }

          </div>
        </div>
      </nav>
    </div>
  )
}
