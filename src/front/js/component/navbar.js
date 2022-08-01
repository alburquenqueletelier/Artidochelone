import React from "react";
import { Link } from "react-router-dom";
import { BsSearch, BsHeart, BsChatLeftDots } from "react-icons/bs";
import { HiMenuAlt4 } from "react-icons/hi";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

import "../../styles/main.css"


export const Navbar = () => {
  return (

    <>
      <nav className=" navbar navbar-dark p-0 navbar-expand-md bg-light  ">
        <div className="container-fluid glassnav p-4 ">


          <a className="navbar-brand fs-4 text-secondary" href="/">ARTIDOCHELONE</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"><HiMenuAlt4 /></span>
          </button>


          <div className="collapse navbar-collapse  " id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto  mb-2 mb-lg-0 ">
              <li className="nav-item mx-3">
                <a className="nav-link active " aria-current="page" href="#"><BsChatLeftDots /></a> {/*onclick agregar clase =  active*/}
              </li>
              <li className="nav-item mx-3 ">
                <a className="nav-link " href="#"><MdOutlineAddPhotoAlternate /></a>
              </li>

              <li className="nav-item mx-3">
                <a className="nav-link "><BsHeart className="icons"/></a>
              </li>

              <li className="nav-item mx-3">
                <form className="d-flex m-auto p-0" role="search">
                  <button className="btn  " type="submit"><BsSearch /></button> {/*añadir tooltips a los iconos al clickearlo se abre el input click input .visible sino .invisible*/}
                  <input className="form-control me-2 invisible" type="search" placeholder="Search" aria-label="Search" />
                </form>
              </li>
            </ul>

            <div className="nav-item dropdown ">
              <a className="nav-link dropdown-toggle text-secondary" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Perfil              
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#">Mi perfil</a></li>
                <li><a className="dropdown-item" href="#">Seguidos </a></li>
                <li><a className="dropdown-item" href="#">Guardados</a></li>
                <li><a className="dropdown-item" href="#">Mensajes</a></li>

                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Log Out</a></li>
              </ul>
            </div>


          </div>
        </div>
      </nav>


    </>
  );
};
