import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Usergallery = () => {
    const { store, actions } = useContext(Context);
    return(
        <div className="card-group mb-5">
            {store.profile?.posts > 0?
                store.profile.posts.map((item, index) => {
                    return (
                        <div className="card glass2" key={index}>
                            <img src={item.image} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.description}</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Posted: {item.created}</small>
                            </div>
                        </div>           
                    )
                })
                : <div className="row mt-3">
                    <h2>No hay publicaciones. {store.profile.username == store.user?.username ? <p>Haz el primero <Link to="../post">aqui</Link></p> : ""}</h2>
                </div>
            }
        </div>
    )
}