import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import {  Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "../../styles/main.css";

export const Admin = () => {
  const { store } = useContext(Context);
  const [showData, setShowData] = useState(null);
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    if (store.user?.admin) {
      setRedirect("");
    } else {
      setRedirect(<Navigate to="/" />);
    }
  },[store.user]);

  return (
    <div className="row justify-content-center m-5">
      {!store.user?.admin && redirect}
      <div className="btn-group btn-group-lg col-auto" role="group" aria-label="Large button group">
        <button type="button" className="btn btn-outline-dark">User</button>
        <button type="button" className="btn btn-outline-dark">Post</button>
        <button type="button" className="btn btn-outline-dark">Comment</button>
        <button type="button" className="btn btn-outline-dark">Hashtag</button>
        <button type="button" className="btn btn-outline-dark">Profile</button>
      </div>
    </div>
  );
};
