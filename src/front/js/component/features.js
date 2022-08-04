import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/main.css";

export const Features = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="jumbotron glass2">
        <h1 class="display-4">Hello, world!</h1>
        <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <p className=" ">Caracteristca 1</p>
        <p className=" ">Caracteristca 2</p>
        <p className=" ">Caracteristca 3</p>
      </div>


    </>
  );
};
