import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import "../../styles/main.css";

export const Admin = () => {
  const { store } = useContext(Context);
  const [showData, setShowData] = useState(null);
  const [model, setModel] = useState("");
  const [labelsData, setLabelsData] = useState(null);
  const [activeTr, setActiveTr] = useState("probando ");
  const [loadFetch, setLoadFetch] = useState("d-none");
  const [redirect, setRedirect] = useState("");
  const modalAlert = useRef();

  const editrow = (fetchModel, fetchId) => {
    modalConfirm(function (confirm) {
      if (confirm) {
        fetch(process.env.BACKEND_URL + `/api/admin/edit/${fetchModel}/${fetchId}`, {
          method: 'PUT',
          headers: {Authorization: "Bearer " + store.token}
        })
        .then(response=>response.json())
        .then(message=> console.log(message))
        .catch(error=>console.log(error))

        console.log("confirmado");
      } else {
        console.log("rechazado");
      }
    });
  };

  const deleterow = (fetchModel, fetchId) => {
    modalConfirm(function (confirm) {
      if (confirm) {
        fetch(process.env.BACKEND_URL + `/api/admin/edit/${fetchModel}/${fetchId}`, {
          method: 'PUT',
          headers: {Authorization: "Bearer " + store.token}
        })
        .then(response=>response.json())
        .then(message=> console.log(message))
        .catch(error=>console.log(error))

        console.log("confirmado");
      } else {
        console.log("rechazado");
      }
    });
  };

  var modalConfirm = function (callback) {
    const myModal = new bootstrap.Modal("#staticBackdrop", {
      keyboard: false,
    });
    myModal.show();
    myModal._element.querySelector("button.btn-secondary").onclick = () =>
      callback(false);
    myModal._element.querySelector("button.btn-primary").onclick = () =>
      callback(true);
  };

  const loadData = async (model) => {
    setShowData(null);
    setLoadFetch("");
    const response = await fetch(
      process.env.BACKEND_URL + "/api/admin/load/" + model,
      {
        headers: { Authorization: "Bearer " + store.token },
      }
    );
    let dataModel = await response.json();

    let labels = Object.keys(dataModel[Object.keys(dataModel)[0]][0]).sort();
    labels = labels.filter((item) => item != "id");
    labels.unshift("action", "id");
    // const index0 = labels[0]
    // if (index0)
    // labels.splice(1, 1, 'Jessica');
    // labels.splice(3, 1, 'Luis');
    setLabelsData(labels);
    setShowData(dataModel);
    return setLoadFetch("d-none");
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
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        ref={modalAlert}
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                data-bs-dismiss="modal"
                type="button"
                className="btn btn-primary"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>

      {!store.user?.admin && redirect}
      <div
        className="btn-group btn-group-lg col-auto"
        role="group"
        aria-label="Large button group"
      >
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={(e) => {
            setModel(e.target.innerText);
            loadData(e.target.innerText)
          }}
        >
          User
        </button>
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={(e) => {
            setModel(e.target.innerText);
            loadData(e.target.innerText)
          }}
        >
          Post
        </button>
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={(e) => {
            setModel(e.target.innerText);
            loadData(e.target.innerText)
          }}
        >
          Comment
        </button>
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={(e) => {
            setModel(e.target.innerText);
            loadData(e.target.innerText)
          }}
        >
          Hashtag
        </button>
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={(e) => {
            setModel(e.target.innerText);
            loadData(e.target.innerText)
          }}
        >
          Profile
        </button>
      </div>
      <div className="table-responsive">
        <div className={"text-center " + loadFetch}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        {!!showData && (
          <table className="table table-hover">
            <thead>
              <tr>
                {labelsData.map((item, index) => {
                  return (
                    <th scope="col" key={index}>
                      {item}
                    </th>
                  );
                })}
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
                          {typeof item[atributo] === "boolean" ? (
                            String(item[atributo])
                          ) : atributo == "action" ? (
                            <span>
                              <FaPencilAlt
                                className="me-1 hover-effect"
                                onClick={() => editrow(model, item.id )}
                              />
                              <FaTrash
                                className="hover-effect"
                                onClick={() => deleterow(model, item.id)}
                              />
                            </span>
                          ) : (
                            item[atributo]
                          )}
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
