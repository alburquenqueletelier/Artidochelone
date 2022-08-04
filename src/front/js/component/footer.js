import React, { Component } from "react";
import { Link } from "react-router-dom";
// mt-auto
export const Footer = () => {
  return (
    <footer className="footer text-secondary text-center  ">
      <div className="container-fluid d-flex flex-column p-5 glassnav">

        <p className="nav-item pt-5">
          equipo nombre creado por
        </p>

        <div className="d-flex justify-content-around">
{/* crear un grid para cada creador */}
          <div className="col d-block">
            <Link className="nav-link " to="/creador1">creador1</Link>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
            <p>redes</p>
          </div>

          <div className="col text-left">
            <Link className="nav-link" to="/creador2">creador2</Link>
              <p className="">Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
              <p className="">redes</p>
          </div>

          <div className="col ms-auto">
            <Link className="nav-link " to="/creador3">creador3</Link>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
            <p>redes</p>
          </div>

        </div>

        <p className="nav-item">
          Made with <i className="fa fa-heart text-danger" />
        </p>
      </div>
    </footer>
  );
};
