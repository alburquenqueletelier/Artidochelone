import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Usergallery = () => {
    const { store, actions } = useContext(Context);
    return(
        <div>
            <div className="card-group mb-5">
            <div className="card glass2">
                <img src="..." className="card-img-top" alt="..."/>
                <div className="card-body">
                <h5 className="card-title"></h5>
                <p className="card-text">Write something here</p>
                </div>
                <div className="card-footer">
                <small className="text-muted">Last updated 3 mins ago</small>
                </div>
            </div>
            <div className="card glass2">
                <img src="..." className="card-img-top" alt="..."/>
                <div className="card-body">
                <h5 className="card-title">Post 2</h5>
                <p className="card-text">Write something here</p>
                </div>
                <div className="card-footer">
                <small className="text-muted">Last updated 3 mins ago</small>
                </div>
            </div>
            <div className="card glass2">
                <img src="..." className="card-img-top" alt="..."/>
                <div className="card-body">
                <h5 className="card-title">Post 3</h5>
                <p className="card-text">Write something here</p>
                </div>
                <div className="card-footer">
                <small className="text-muted">Last updated 3 mins ago</small>
                </div>
            </div>
            </div>
        </div>
    )
}