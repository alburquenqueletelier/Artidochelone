import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/main.css";

export const Search = (props) => {
  const { store, actions } = useContext(Context);

  return (
    <div className="row">
        {store.demo.users.filter(user=> user.name == props.search || user.username == props.search || user.email.includes(props.search)).length > 0 
        ? store.demo.users.filter(user=> user.name == props.search || user.username == props.search || user.email.includes(props.search)).map((item, index)=>{
          return (
            <div className="col" key={index}>
              <h2>{item.username}</h2>
            </div>
          )
        })
        : <h2>No encontramos lo que buscas :( </h2>
        }
    </div>
  );
};