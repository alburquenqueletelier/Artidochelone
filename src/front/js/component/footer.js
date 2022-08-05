import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsInstagram } from "react-icons/bs";

// mt-auto
export const Footer = () => {
  return (
    <footer className="footer text-secondary text-center   ">
      <div className="container-fluid d-flex flex-column bg-warning p-4 px-5 glassnav">
        <div className="mx-5">
          <p className="navbar-brand fw-normal fs-5 text-secondary pt-5">
            CREADO POR EQUIPO NOMBRE
          </p>

          {/* dejar contenido con alineacion izquierda*/}

          <div className="container ">
            <div className="row">
              <div className="col">
                <Link className="nav-link text-decoration-none" to="/creador1">
                  creador1
                </Link>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                <div className="d-flex justify-content-evenly">
                 <Link to="/"><BsLinkedin /></Link> 
                  <Link to="/"><BsGithub /></Link> 
                  <Link to="/"><BsInstagram /></Link> 
                </div>
              </div>
              <div className="col">
                <Link className="nav-link" to="/creador2">
                  creador2
                </Link>
                <p className="">
                  Lorem ipsum dolor sit amet, consectetur adipisicing.
                </p>
                <div className="d-flex justify-content-evenly">
                  <Link to="/"><BsLinkedin /></Link> 
                  <Link to="/"><BsGithub /></Link> 
                  <Link to="/"><BsInstagram /></Link> 
                </div>
              </div>
              <div className="col">
                <Link className="nav-link " to="/creador3">
                  creador3
                </Link>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                <div className="d-flex justify-content-evenly">
                  <Link to="/"><BsLinkedin /></Link> 
                  <Link to="/"><BsGithub /></Link> 
                  <Link to="/"><BsInstagram /></Link> 
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="nav-item pt-4">
          Made with <i className="fa fa-heart text-danger" />
        </p>
      </div >
    </footer >
  );
};
