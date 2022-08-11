import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { BsSearch, BsHeart, BsChatLeftDots, BsXLg } from "react-icons/bs";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

import { Context } from "../store/appContext";
import { Postmodal } from "./postModal";

import "../../styles/main.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const usernameInput = React.useRef();
  const passwordInput = React.useRef();
 
  return (
    <>
      <nav className=" navbar navbar-dark p-0 navbar-expand-md bg-light  ">
        <div className="container-fluid glassnav p-4 ">

         



          <Link className="navbar-brand fw-normal fs-4 text-secondary" to="/">ARTIDOCHELONE</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">

            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse  "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mx-auto  mb-2 mb-lg-0 ">

             

              {/* {!!store.user && comentado para ver postmodal*/}

                <div className="d-flex">
                  <li className="nav-item mx-3">
                    <a className="nav-link btn " aria-current="page" href="#">
                      <BsChatLeftDots />
                    </a>{" "}
                    {/*onclick agregar clase =  active*/}
                  </li>
                  <li className="nav-item mx-3 ">

                   

                    <Postmodal>
                    </Postmodal>
                    <Link className="navbar-brand fw-normal fs-4 text-secondary" to="/post"><MdOutlineAddPhotoAlternate /></Link>


                  </li>
                  <li className="nav-item mx-3">
                    <a className="nav-link ">
                      <BsHeart className="icons" />
                    </a>
                  </li>
                </div>

             

              {/* } comentado para ver el modal*/}

              <li className="nav-item mx-3">
                <form className="d-flex m-auto p-0" role="search">
                  <button className="btn  " type="submit">
                    <BsSearch className="text-light" />
                  </button>{" "}
                  {/*añadir tooltips a los iconos al clickearlo se abre el input click input .visible sino .invisible*/}
                  <input
                    className="form-control me-2 invisible"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </form>
              </li>

            </ul>

            <div className="nav-item dropdown ">
              {!!store.user ? (
                <Link
                  to="/perfil"
                  className="nav-link dropdown-toggle text-secondary"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {store.user.username}
                </Link>
              ) : (
                <ul className="navbar-nav mx-auto">
                  {/* con modal para login y dar opción para derivar a registrarse 
                      por mientras se dejara una función onclick que al apretar cambia el
                      estado de la variable login a true para visaulizar como se ve la pagina
                      desde un usuario indentificado
                  */}

                  {/* este es el boton del modal */}
                  <button
                    type="button"
                    className="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                  >
                    <li className="nav-item mx-3">Login</li>
                  </button>
                  {/* Este es el modal event.preventDefault(); */}
                  <form
                    className="mb-1"
                    onSubmit={(event) =>
                      actions.login(
                        event,
                        usernameInput.current.value,
                        passwordInput.current.value
                      )
                    }
                  >
                    <div
                      className="modal fade"
                      id="loginModal"
                      tabIndex="-1"
                      aria-labelledby="loginModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content glass2">
                          <div className="modal-header">
                            <h5
                              className="modal-title text-light"
                              id="loginModalLabel"
                            >
                              Enter your credentials
                            </h5>
                            <button
                              type="button"
                              className="btn"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              <BsXLg />
                            </button>
                          </div>
                          <div className="modal-body">
                            {/* se usa componente no controlados */}
                            <input
                              className="form-control my-4"
                              placeholder="Username"
                              type="text"
                              ref={usernameInput}
                            ></input>
                            <input
                              className="form-control mb-1 my-4"
                              placeholder="Password"
                              type="password"
                              ref={passwordInput}
                            ></input>
                            <a>
                              <small>Forgot your password?</small>
                            </a>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="submit"
                              className="btn btn-outline-light"
                              data-bs-dismiss="modal"
                            >
                              Login
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  {/* <Link to="/register" className="nav-item btn mx-3 ">Register</Link> */}
                  {/* <button
                //  onClick={()=> setModal(true)}
                 >

                 </button> */}

                  {/* este es el boton del modal */}
                  <Link to="/register">
                      <button 
                        type="button"
                        className="btn"
                        data-bs-toggle="modal"
                        data-bs-target="#registerModal"
                      >
                      <li className="nav-item mx-3">Register</li>
                    </button>
                  </Link>
                </ul>

             

              )} 

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Mi perfil
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Seguidos{" "}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Guardados
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Mensajes
                  </a>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>
                {/* Funcion demo para deslogear. Cuando este listo el back end agregar la función correcta */}
                <button className="btn" onClick={() => actions.logout()}>
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
