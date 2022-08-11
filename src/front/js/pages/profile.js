import React, { useContext } from "react";
import { username } from "react-lorem-ipsum";
import { useParams } from "react-router-dom";
import "../../styles/main.css";
import { Usergallery } from "../component/usergallery";
import { Context } from "../store/appContext";
import { CommentSection } from "../component/commentsection";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <div className="container-fluid mb-0">
      <div className="container-fluid p-5 glass2 text-start my-5">
        <img src="https://public.slidesharecdn.com/v2/images/profile-picture.png" className="img-circle rounded-circle float-start" />
        <h1 className="display-2"> {store.profiles.name? store.profiles.name : "UserName"}</h1>
        <p>{store.profiles.description? store.profiles.description :"Write a description here"}</p>
        <div>
        </div>
      </div>
      <div className="portafolio">
        <Usergallery />
        <CommentSection />
      </div>

    </div>
  );
};

//La idea es que la galería no aparezca si el usuario no ha subido imágenes. Y que a medida que suba imágenes aparezcan más cards
