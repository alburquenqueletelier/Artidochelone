import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Usergallery = (props) => {
    const { store, actions } = useContext(Context);
    return(
        <div className="card-group mb-5">
            {!!props.userID &&
                store.demo?.posts.filter(post=> post.owner_id == props.userID).map((item, index) => {
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
            }
        </div>
    )
}