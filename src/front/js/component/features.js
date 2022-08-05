import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/main.css";

export const Features = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="jumbotron p-5  glass2">
        <h1 className="display-4">FEATURES!</h1>
        <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <p className=" ">Caracteristca 1</p>
        <p className=" ">Caracteristca 2</p>
        <p className=" ">Caracteristca 3</p>
      </div>


    </>
  );
};
