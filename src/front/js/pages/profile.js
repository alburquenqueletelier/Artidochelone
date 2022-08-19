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
    if (!!store?.user) {
      setRedirect("");
    } else {
      setRedirect(<Navigate to="/" />);
    }
  }, [store?.user]);

  return (
    <div className="container-fluid mb-0">
      {!store?.user && redirect}
      <div className="container-fluid p-5 glass2 text-start my-5">
        <img
          src="https://public.slidesharecdn.com/v2/images/profile-picture.png"
          className="img-circle rounded-circle float-start"
        />
        {/* <h1 className="display-2">{searchUser?.username} </h1> */}
        {/* {!!store.demo &&
          store.demo.profiles
            .filter((user) => user.user_id === searchUser?.id)
            .map((item, index) => {
              return <p key={index}>{item.description}</p>;
            })} */}
      </div>
      {/* <div className="portafolio">
        <Usergallery userID={searchUser?.id} />
        <CommentSection userID={searchUser?.id} />
      </div> */}
    </div>
  );
};