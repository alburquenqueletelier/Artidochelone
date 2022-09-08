import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "../../styles/main.css";

export const Admin = () => {
  const { store } = useContext(Context);
  const [showData, setShowData] = useState(null);
  const [labelsData, setLabelsData] = useState(null);
  const [redirect, setRedirect] = useState("");

  const loadData = async (model) => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/admin/load/" + model,
      {
        headers: { Authorization: "Bearer " + store.token },
      }
    );
    let dataModel = await response.json();

    let labels = Object.keys(dataModel[Object.keys(dataModel)[0]][0]).sort();
    labels = labels.filter(item=> item != 'id');
    labels.unshift('id');
    // const index0 = labels[0]
    // if (index0)
    // labels.splice(1, 1, 'Jessica');
    // labels.splice(3, 1, 'Luis');
    setLabelsData(labels);
    return setShowData(dataModel);
  };

  useEffect(() => {
    if (store.user?.admin) {
      setRedirect("");
    } else {
      setRedirect(<Navigate to="/" />);
    }
  }, [store.user]);

  return (
    <div className="row justify-content-center m-5">
      {!store.user?.admin && redirect}
      <div
        className="btn-group btn-group-lg col-auto"
        role="group"
        aria-label="Large button group"
      >
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => loadData("User")}
        >
          User
        </button>
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => loadData("Post")}
        >
          Post
        </button>
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => loadData("Comment")}
        >
          Comment
        </button>
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => loadData("Hashtag")}
        >
          Hashtag
        </button>
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => loadData("Profile")}
        >
          Profile
        </button>
      </div>
      <div className="table-responsive">
        {!!showData && (
          <table className="table table-striped">
            <thead>
              <tr>
                {labelsData.map(
                  (item, index) => {
                    return (
                      <th scope="col" key={index}>
                        {item}
                      </th>
                    );
                  }
                )}
              </tr>
            </thead>
            <tbody>
              {showData[Object.keys(showData)[0]].map((item, index) => {
                return (
                  <tr key={index}>
                    {labelsData.map((atributo, indexAtributo) => {
                      return atributo == "id" ? (
                        <th scope="row" key={indexAtributo}>
                          {item[atributo]}
                        </th>
                      ) : Array.isArray(item[atributo]) ||
                        (typeof item[atributo] === "object" &&
                          item[atributo] !== null) ? (
                        <td key={indexAtributo}>
                          {Array.isArray(item[atributo])
                            ? item[atributo].length
                            : "YES"}
                        </td>
                      ) : (
                        <td key={indexAtributo}>
                          {typeof item[atributo] === "boolean"
                            ? String(item[atributo])
                            : item[atributo]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
