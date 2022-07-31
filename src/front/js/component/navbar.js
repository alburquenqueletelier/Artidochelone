import React from "react";
import { Link } from "react-router-dom";
import { BsSearch, BsHeart, BsChatLeftDots } from "react-icons/bs";
import { HiMenuAlt4 } from "react-icons/hi";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

import "../../styles/main.css"


export const Navbar = () => {
  return (

    <>
      <nav className="text-secondary navbar p-0 navbar-expand-md bg-light  ">
        <div className="container-fluid glass1 p-4 ">


          <a className="navbar-brand fs-4 text-secondary" href="/">ARTEDOCHELONE</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"><HiMenuAlt4 /></span>
          </button>


          <div className="collapse navbar-collapse text-secondary " id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto  mb-2 mb-lg-0 ">
              <li className="nav-item mx-3">
                <a className="nav-link active text-secondary" aria-current="page" href="#"><BsChatLeftDots /></a>
              </li>
              <li className="nav-item mx-3 ">
                <a className="nav-link text-secondary" href="#"><MdOutlineAddPhotoAlternate /></a>
              </li>

              <li className="nav-item mx-3">
                <a className="nav-link text-secondary"><BsHeart className="icons"/></a>
              </li>

              <li className="nav-item mx-3">
                <form className="d-flex m-auto p-0" role="search">
                  <button className="btn text-secondary " type="submit"><BsSearch /></button> {/*al clickearlo se abre el input click input .visible sino .invisible*/}
                  <input className="form-control me-2 invisible" type="search" placeholder="Search" aria-label="Search" />
                </form>
              </li>
            </ul>





            <div className="nav-item dropdown ">
              <a className="nav-link dropdown-toggle text-secondary" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Perfil              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </div>


          </div>
        </div>
      </nav>


    </>
  );
};
