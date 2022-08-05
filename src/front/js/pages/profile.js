import React from "react";
import "../../styles/main.css";
import { GaleryHome } from "../component/galeryHome";



export const Profile = () => {
  return (
    <div className="container-fluid mb-0">
      <div className="text-center my-5">
        <img
          src="https://images.unsplash.com/photo-1659124172741-96b753e526ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
          className="d-block w-100"
          alt="..."
        />
        <h1>perfil</h1>
        <p>descripcion</p>
        <div>
          <button>boton</button>
        </div>
      </div>
      <div className="portafolio">
        <GaleryHome />
      </div>
    </div>
  );
};
