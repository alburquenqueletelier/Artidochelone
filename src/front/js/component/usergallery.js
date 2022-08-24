import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Usergallery = () => {
    const { store, actions } = useContext(Context);
    return(
        <div className="card-group mb-5">
            {!!store.profile?.posts ?
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
                : <div>
                    <h2>No tienes posts. Haz el primero pinchando <Link to="/post">aqui</Link></h2>
                </div>
            }
        </div>
    )
}