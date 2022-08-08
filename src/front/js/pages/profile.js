import React, { useContext } from "react";
import { username } from "react-lorem-ipsum";
import { useParams } from "react-router-dom";
import "../../styles/main.css";
import { GaleryHome } from "../component/galeryHome";
import { Context } from "../store/appContext";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <div className="container-fluid mb-0">
      <div className="text-center my-5">
        <img
          src="https://images.unsplash.com/photo-1659124172741-96b753e526ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
          className="d-block w-100"
          alt="..."
        />
        <h1>{store.user.username}</h1>
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
