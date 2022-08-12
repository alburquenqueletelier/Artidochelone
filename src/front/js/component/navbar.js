import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { BsSearch, BsHeart, BsChatLeftDots, BsXLg } from "react-icons/bs";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";
// import { Postmodal } from "./postModal";

import "../../styles/main.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const usernameInput = React.useRef();
  const passwordInput = React.useRef();
  const [inputClass, setInputClass] = useState('form-control me-2 invisible');
  const [search, setSearch] = useState('');

  const submitForm = (e,data) => {
    if (e.key === 'Enter'){
      let navigate = useNavigate();
      navigate("/search", { replace: true });
    }
  }

  const inputVisbility = () => {
    if (inputClass.includes('invisible')) {
      return setInputClass('form-control me-2');
    } else {
      return setInputClass('form-control me-2 invisible');
    }
  }
 
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
              {!!store.user &&
                  <li className="nav-item mx-3">
                    <a className="nav-link btn " aria-current="page" href="#">
                      <BsChatLeftDots />
                    </a>{" "}
                    {/*onclick agregar clase =  active*/}
                  </li>
              }
              {!!store.user &&
                  <li className="nav-item mx-3 ">
                    <Link className="navbar-link btn" to="/post">
                      <MdOutlineAddPhotoAlternate /></Link>
                  </li>
              }
              {!!store.user &&
                  <li className="nav-item mx-3">
                    <a className="nav-link ">
                      <BsHeart className="icons" />
                    </a>
                  </li>
              }
                </div>
              <li className="nav-item mx-3">
                <div className="d-flex m-auto p-0">
                  <button className="btn  "type="button" onClick={inputVisbility}>
                    <BsSearch className="text-light" />
                  </button>{" "}
                  {/*añadir tooltips a los iconos al clickearlo se abre el input click input .visible sino .invisible*/}
                  <input
                    className={inputClass}
                    type="text"
                    value={search}
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e)=>setSearch(e.target.value)}
                    onKeyPress={(e)=>submitForm(e,search)}
                  />
                </div>
              </li>

            </ul>
            {!!store.user && store.user.admin &&
              <Link className="btn text-light" to="/admin">Admin</Link>
            
            }

            <div className="nav-item dropdown ">
              {!!store.user ? (
                <Link
                  to="/"
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
                    <li className="nav-item text-white mx-3">Log in</li>
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
                              Log in
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
                              <small>¿Forgot your password?</small>
                            </a>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="submit"
                              className="btn btn-outline-light"
                              data-bs-dismiss="modal"
                            >
                              Log in
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  <Link to="/register">
                      <button 
                        type="button"
                        className="btn"
                      >
                      <li className="nav-item mx-3">Sign up</li>
                    </button>
                  </Link>
                </ul>
              )} 

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to={"/profile/"+store.user?.username}>
                    My profile
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Followed{" "}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Saved
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Messages
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
