import React, { Component } from "react";
import { Link } from "react-router-dom";
// mt-auto
export const Footer = () => {
  return (
    <footer className="footer text-secondary text-center   ">
      <div className="container-fluid d-flex flex-column bg-warning p-5 px-5 glassnav">
        <div className="mx-5">
          <p className="navbar-brand fw-normal fs-5 text-secondary pt-5">
            EQUIPO NOMBRE CREADO POR
          </p>

          {/* crear un grid para cada creador para dejar su contenido con alineacion izquierda*/}

          <div className="d-flex align-items-baseline">
            <div className="col d-block">
              <Link className="nav-link " to="/creador1">
                creador1
              </Link>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
              <p>redes</p>
            </div>

            <div className="col d-flex">
              <Link className="nav-link" to="/creador2">
                creador2
              </Link>
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipisicing.
              </p>
              <p className="">redes</p>
            </div>

            <div className="col ">
              <Link className="nav-link " to="/creador3">
                creador3
              </Link>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
              <p>redes</p>
            </div>
          </div>
        </div>

        <p className="nav-item">
          Made with <i className="fa fa-heart text-danger" />
        </p>
      </div>
    </footer>
  );
};
