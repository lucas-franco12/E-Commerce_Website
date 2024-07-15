import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({userType, userId}) {
  return (
    <nav className="navbar navbar-expand-md fixed-top navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
            <i className="bi bi-house-door-fill"></i>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          {userType === 'customer' ?
            <div className="navbar-nav ms-auto">
              <Link className="nav-link" to={`/products?userId=${userId}`}>View Catalog</Link>
              <Link className="nav-link" to={`/cart?userId=${userId}`}>My Cart</Link>
              <Link className="nav-link" to={`/orders?userId=${userId}`}>View Orders</Link>
            </div> 
            : 
            <div className="navbar-nav ms-auto">
              <Link className="nav-link" to={`/dashboard?userId=${userId}`}>My Dashboard</Link>
              <Link className="nav-link" to={`/orders?userId=${userId}`}>View Orders</Link>
            </div>
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;