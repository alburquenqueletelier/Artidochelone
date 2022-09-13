import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { BsSearch, BsHeart, BsChatLeftDots, BsXLg } from "react-icons/bs";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

import { Context } from "../store/appContext";

import "../../styles/main.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [search, setSearch] = useState("");
  const [resultados, setResultados] = useState("");
  const [inputHidden, setInputHidden] = useState("invisible");
  const usernameInput = React.useRef();
  const passwordInput = React.useRef();

  const seeDropdown = () => {
    const dropdownNav = document.querySelector('a.nav-link');
    const dropdown = new bootstrap.Dropdown(dropdownNav);
    dropdown.toggle();
  }

  const inputControl = () => {
    if (inputHidden == "invisible") return setInputHidden("");
    else return setInputHidden("invisible");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(process.env.BACKEND_URL + "/api/searchAll/" + search)
      .then((resp) => resp.json())
      .then((data) => {
        setResultados(data);
      })
      .catch((error) => console.log(error));
    const modal = new bootstrap.Modal(
      document.querySelector("#searchBackdrop")
    );
    modal.show();
  };

  const closeModal = () => {
    var myModal = document.getElementById("#searchBackdrop");
    var modal = bootstrap.Modal.getInstance(myModal);
    modal.hide();
  };

  return (
    <>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="searchBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="searchBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="searchBackdropLabel">
                Search for {search}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {!!resultados && !("response" in resultados) ? (
                Object.keys(resultados).map((item, index) => {
                  return (
                    !!item && (
                      <div className="container-fluid" key={index}>
                        {resultados[item].map((entry, indexEntry) => {
                          return (
                            !!entry && (
                              <div
                                className="row border border-secondary mb-2"
                                key={indexEntry}
                              >
                                <h5 className="modal-title">{item} Matches</h5>
                                {item == "users" && (
                                  <Link
                                    to={"/profile/" + entry.username}
                                    className="bg-secondary text-light text-decoration-none hover-effect"
                                    onClick={() => closeModal()}
                                  >
                                    <p>Username: {entry.username}</p>
                                    <p>Name: {entry.name}</p>
                                    <p>Lastname: {entry.lastname}</p>
                                    <p>Email: {entry.email}</p>
                                  </Link>
                                )}
                                {item == "comments" && (
                                  <div className="border border-primary bg-secondary text-light">
                                    <p>{entry.text}</p>
                                  </div>
                                )}
                                {item == "posts" && (
                                  <div className="border border-primary bg-secondary text-light">
                                    <p>{entry.title}</p>
                                    <p>{entry.description}</p>
                                  </div>
                                )}
                              </div>
                            )
                          );
                        })}
                      </div>
                    )
                  );
                })
              ) : (
                <p>{resultados["response"]}</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <nav className=" navbar navbar-dark p-0 navbar-expand-md bg-light  ">
        <div className="container-fluid glassnav p-4 ">
          <Link className="navbar-brand fw-normal fs-4 text-secondary" to="/">
            ARTIDOCHELONE
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse  "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mx-auto  mb-2 mb-lg-0 ">
              {/* {!!store.user &&

                <div className="d-flex">
                  <li className="nav-item mx-3">
                    <a className="nav-link btn " aria-current="page" href="#">
                      <BsChatLeftDots />
                    </a>{" "}
                    {/*onclick agregar clase =  active///
                  </li>
                  <li className="nav-item mx-3 ">
                    <Link className="navbar-brand fw-normal fs-4 text-secondary" to="/post"><MdOutlineAddPhotoAlternate /></Link>
                  </li>
                  <li className="nav-item mx-3">
                    <a className="nav-link ">
                      <BsHeart className="icons" />
                    </a>
                  </li>
                </div>
             } */}
              <li className="nav-item mx-3">
                <form
                  className="d-flex m-auto p-0"
                  role="search"
                  onSubmit={handleSubmit}
                >
                  <button
                    className="btn"
                    type="button"
                    onClick={() => inputControl()}
                  >
                    <BsSearch className="text-light" />
                  </button>{" "}
                  {/*añadir tooltips a los iconos al clickearlo se abre el input click input .visible sino .invisible*/}
                  <input
                    className={"form-control me-2 " + inputHidden}
                    type="search"
                    placeholder="Search by a word"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>
              </li>
            </ul>
            {!!store.user?.admin && (
              <Link
                className="navbar-brand fw-normal fs-4 text-secondary"
                to="/admin"
              >
                Admin
              </Link>
            )}

            {!!store.user ? (
              <div className="dropdown">
                <a
                  href="#"
                  onClick={seeDropdown}
                  className="nav-link dropdown-toggle text-secondary"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="true"
                >
                  {store.user.username}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link
                      className="dropdown-item"
                      to={"/profile/" + store.user?.username}
                    >
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
                    <Link
                      to={"/profile/setting/" + store.user?.username}
                      className="dropdown-item"
                      href="#"
                    >
                      Settings
                    </Link>
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
            ) : (
              <ul className="navbar-nav mx-auto">
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
                <Link to="/register">
                  <button type="button" className="btn">
                    <li className="nav-item mx-3">Register</li>
                  </button>
                </Link>
              </ul>
            )}
          </div>
        </div>
      </nav>

      {!!store.user && (
        <div className="d-flex bg-warning">
          <li className="nav-item mx-3">
            <a className="nav-link btn " aria-current="page" href="#">
              <BsChatLeftDots />
            </a>{" "}
            {/*onclick agregar clase =  active*/}
          </li>
          <li className="nav-item mx-3 ">
            <Link
              className="navbar-brand fw-normal fs-4 text-secondary"
              to="/post"
            >
              <MdOutlineAddPhotoAlternate />
            </Link>
          </li>
          <li className="nav-item mx-3">
            <a className="nav-link ">
              <BsHeart className="icons" />
            </a>
          </li>
        </div>
      )}
    </>
  );
};
