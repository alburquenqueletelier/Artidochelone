import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/">
          <img src="https://dummyimage.com/100x100/000/fff&text=logo" />
        </Link>
        <form class="d-flex" role="search">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
		<img src="https://dummyimage.com/70x70/000/fff&text=perfil" className="rounded-circle"/>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/features" className="nav-link" href="#">
                Features
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" href="#">
                About us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
