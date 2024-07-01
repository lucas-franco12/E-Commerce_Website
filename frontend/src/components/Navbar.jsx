import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-md fixed-top navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
            <i class="bi bi-house-door-fill"></i>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
                <Link className="nav-link" to="/products">View Catalog</Link>
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                <Link className="nav-link" to="/cart">My Cart</Link>
                <Link className="nav-link" to="/orders">View Orders</Link>
            </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;