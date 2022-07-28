import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { LoremIpsum } from "react-lorem-ipsum";

export const About = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <LoremIpsum p={1} />
    </div>
  );
};
