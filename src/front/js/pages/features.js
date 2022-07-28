import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { LoremIpsum } from "react-lorem-ipsum";

export const Features = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <LoremIpsum p={1} />
      <ol class="list-group">
        <li class="list-group-item">Caracteristca 1</li>
        <li class="list-group-item">Caracteristca 2</li>
        <li class="list-group-item">Caracteristca 3</li>
      </ol>
    </div>
  );
};
