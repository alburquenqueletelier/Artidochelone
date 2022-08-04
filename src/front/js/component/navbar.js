import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { BsSearch, BsHeart, BsChatLeftDots } from "react-icons/bs";
import { Context } from "../store/appContext";
import { Postmodal } from "./postModal";

import "../../styles/main.css"


export const Navbar = () => {
  const { store, actions } = useContext(Context);
  
  return (

    <>
      <nav className=" navbar navbar-dark p-0 navbar-expand-md bg-light  ">
        <div className="container-fluid glassnav p-4 ">


          <a className="navbar-brand fw-normal fs-4 text-secondary" href="/">ARTIDOCHELONE</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>


          <div className="collapse navbar-collapse  " id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto  mb-2 mb-lg-0 ">
              {!!store.login && 
              <div className="d-flex">
                <li className="nav-item mx-3">
                  <a className="nav-link btn " aria-current="page" href="#"><BsChatLeftDots /></a> {/*onclick agregar clase =  active*/}
                </li>
                <li className="nav-item mx-3 ">
                    <Postmodal>
                    </Postmodal>
                </li>
                <li className="nav-item mx-3">
                  <a className="nav-link "><BsHeart className="icons"/></a>
                </li>
              </div>
              }
              <li className="nav-item mx-3">
                <form className="d-flex m-auto p-0" role="search">
                  <button className="btn  " type="submit"><BsSearch className="text-light"/></button> {/*añadir tooltips a los iconos al clickearlo se abre el input click input .visible sino .invisible*/}
                  <input className="form-control me-2 invisible" type="search" placeholder="Search" aria-label="Search" />
                </form>
              </li>
            </ul>

            <div className="nav-item dropdown ">
              {!!store.login ?
                <Link to="/perfil" className="nav-link dropdown-toggle text-secondary rounded-circle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img
                        src="https://dummyimage.com/50x50/000/fff"
                        className="p-0 rounded-circle"
                        alt="..."
                      />           
                </Link>
                : <ul className="navbar-nav mx-auto">
                  {/* con modal para login y dar opción para derivar a registrarse 
                      por mientras se dejara una función onclick que al apretar cambia el
                      estado de la variable login a true para visaulizar como se ve la pagina
                      desde un usuario indentificado
                  */}
                  <button className="btn " onClick={()=>actions.demoLogin()}>
                    <li className="nav-item mx-3">Login</li>
                  </button>
                  <Link to="/register" className="nav-item btn mx-3 ">Register</Link>
                 {/* <button
                //  onClick={()=> setModal(true)}
                 >

                 </button> */}
                  </ul>
              }
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/profile">Mi perfil</Link></li>
                <li><a className="dropdown-item" href="#">Seguidos </a></li>
                <li><a className="dropdown-item" href="#">Guardados</a></li>
                <li><a className="dropdown-item" href="#">Mensajes</a></li>

                <li><hr className="dropdown-divider" /></li>
                {/* Funcion demo para deslogear. Cuando este listo el back end agregar la función correcta */}
                <button className="btn" onClick={()=>actions.demoLogin()}>
                  <li className="dropdown-item">Log Out</li>
                </button>
              </ul>
            </div>

          </div>
        </div>
      </nav>


    </>
  );
};
