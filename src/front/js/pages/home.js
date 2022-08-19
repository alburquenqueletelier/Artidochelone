import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { BsSearch, BsHeart, BsChatLeftDots } from "react-icons/bs";
import { Postmodal } from "../component/postModal";
import { JumbotronTop10 } from "../component/JumbotronTop10";

import "../../styles/main.css";
import { Features } from "../component/features";
import { GaleryHome } from "../component/galeryHome";
import { Etiquetas } from "../component/etiquetas";

export const Home = () => {
  const { store, actions } = useContext(Context);

 
  //useEffect(() => {
   // actions.getProfiles()
   // console.log(store.profiles, "store")
  //}, []);

  // Set the Cloud configuration and URL configuration
  // let cloudConfig = new CloudConfig({cloudName: 'demo'});
  // let urlConfig = new URLConfig({secure: true});


  // // Instantiate and configure a CloudinaryImage object.
  // let myImage = new CloudinaryImage('docs/shoes', cloudConfig, urlConfig);

  // The URL of the image is: https://res.cloudinary.com/demo/image/upload/docs/shoes
  
  return (
    <>
      <JumbotronTop10 />
      <Features />
      <Etiquetas />
      <GaleryHome />
    </>
  );
};
