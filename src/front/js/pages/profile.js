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
    <div className="container-fluid mb-0">
      {!username && redirect}
      {!!store?.profile ? (
        <div className="container-fluid p-5 glass2 text-start my-5">
          <div className="row">
            <div className="col-auto">
              <img
                src={
                  !!store.profile.profile.photo
                    ? store.profile.profile?.photo
                    : "https://public.slidesharecdn.com/v2/images/profile-picture.png"
                }
                className="img-circle rounded-circle float-start"
              />
            </div>
            <div className="col-auto">
              <h2>{username}</h2>
            </div>
            <div className="col-auto">
              <p>{store.profile.profile.description}</p>
            </div>
          </div>
          <div className="row">
            <div className="portafolio">
              <Usergallery />
              <CommentSection />
            </div>
          </div>
        </div>
      ) : (
        <h1>No existe el usuario {username}</h1>
      )}
    </div>
  );
};
