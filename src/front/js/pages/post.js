import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
// import { Image } from "cloudinary-react"
import { Navigate } from "react-router-dom";

export const Post = () => {
  const { store, actions } = useContext(Context);
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    if (!!store?.user) {
      setRedirect("");
    } else {
      setRedirect(<Navigate to="/" />);
    }
  }, [store?.user]);

  return (
    <div>
      {!!store?.user ? (
        <div className="modal-dialog modal-lg ">
          <div className="modal-content glass2 text-light">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Create New Post
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/* Body (Formulario) */}
            <form onSubmit={(e) => actions.post(e, file, title, description)}>
              <div className="modal-body mt-5">
                <div className="row mb-3">
                  <label htmlFor="fileUp" className="col-sm-2 col-form-label">
                    Image/Video
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="file"
                      id="fileUp"
                      accept="image/*,video/*"
                      className="form-control glass2"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="title" className="col-sm-2 col-form-label">
                    Title
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control glass2"
                      id="title"
                      value={title}
                      placeholder="Enter a Title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="description"
                    className="col-sm-2 col-form-label"
                  >
                    Description
                  </label>
                  <div className="col-sm-10">
                    <textarea
                      id="description"
                      className="form-control glass2"
                      placeholder="Describe your proyect..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        redirect
      )}
    </div>
  );
};
