import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import '../../styles/userGallery.css'

export const Usergallery = () => {
  const { store, actions } = useContext(Context);

  const deletePost = (postID, postTitle) => {
    console.log(postID);
    let text = "Are you sure you want delete Post: " + postTitle;
    if (confirm(text) == true) {
      fetch(process.env.BACKEND_URL + `/api/delete/post/${postID}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + store.token },
      })
        .then((response) => response.json())
        .then((message) => alert(JSON.stringify(message)))
        .catch((error) => console.log(error));
      actions.getUserProfile(store.user.id);
    } else {
      console.log("cancelado");
    }
  };

  return (
    <div className="p-5 unicornGlass gallery ">
      {store.profile?.posts.length > 0 ? (
        store.profile.posts.map((item, index) => {
          return (
            <div className=" unicornGlass" key={index}>
              {item.image.includes("image") 
              ?  <img src={item.image} className="card-img-top" alt="..." />
              : <video src={item.image} className="card-img-top" alt="..." controls/>
            }
              <div className="cardbody">

                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
              </div>
              <div className="card-footer">
                <small className="text-muted">Posted: {item.created}</small>
                {store.user?.id == store.profile?.id && (
                  <div className="row row-cols-2 justify-content-center mb-2">
                    <button className="col-auto btn btn-info">EDIT</button>
                    <button
                      onClick={() => {
                        deletePost(item.id, item.title);
                      }}
                      className="col-auto btn btn-danger"
                    >
                      DELETE
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="row mt-3">
          <h2>
            No hay publicaciones.{" "}
            {store.profile.username == store.user?.username ? (
              <p>
                Sube tu primer post <Link to="../post">aqui</Link>
              </p>
            ) : (
              ""
            )}
          </h2>
        </div>
      )}
    </div>
  );
};
