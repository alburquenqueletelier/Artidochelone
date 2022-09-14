import React, { useContext, useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import "../../styles/main.css";
import { Usergallery } from "../component/usergallery";
import { Context } from "../store/appContext";
import { CommentSection } from "../component/commentsection";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const username = params.username;
  // const searchUser = store.user.filter(user=> user.username == userName)[0];
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    if (username) {
      actions.getUserProfile(username);
      setRedirect("");
    } else {
      setRedirect(<Navigate to="/" />);
    }
  }, [username]);

  return (
    // cada usuario puede elegir el color de fondo de su perfil (colorpicker o predefinidos) y letras?? https://img.freepik.com/vector-premium/publicacion-instagram-facebook-completamente-editable-plantilla-feed-rompecabezas-redes-sociales-venta-moda-beige_151293-101.jpg
    <>
      {!username && redirect}
      {!!store?.profile ? (
        <>
          <div className="perfil-section1 row bg-warning">


            <div className="col img-wrapper bg-dark">
              <img
                src={
                  !!store.profile.profile.photo
                    ? store.profile.profile?.photo
                    : "https://public.slidesharecdn.com/v2/images/profile-picture.png"
                }
                className="img-fluid w-100 float-end"
              />
            </div>

            <div className="col text-wrapper bg-danger">
              <h2>{username}</h2>
              <div className="bg-light">
                <p>{store.profile.profile.description}descripcion</p>
              </div>
            </div>

          </div>


          {/* seccion galeria */}
          <div className=" ">
            <div className="portafolio">
              <Usergallery />
            </div>
            <div className="about"></div>
            <div className="contact-me">
              <CommentSection />
            </div>

          </div>
        </>
      ) : (
        <h1>No existe el usuario {username}</h1>
      )}
    </>
  );
};
