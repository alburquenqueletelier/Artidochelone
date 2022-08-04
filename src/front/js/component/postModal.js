import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

import "../../styles/main.css";

export const Postmodal = () => {
  return (
    <div>
      {/* Button trigger modal  */}
      <button
        type="button"
        className="btn"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        <MdOutlineAddPhotoAlternate />
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
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
            <form>
              <div className="modal-body">
                <div className="row mb-3">
                  <label htmlFor="fileUp" className="col-sm-2 col-form-label">
                    Image/Video
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="file"
                      id="fileUp"
                      accept="image/*,video/*"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="title" className="col-sm-2 col-form-label">
                        Title
                    </label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="title" placeholder="Enter a Title"/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="description" className="col-sm-2 col-form-label">
                        Description
                    </label>
                    <div className="col-sm-10">
                        <textarea id="description" className="form-control" placeholder="Describe your proyect..."/>
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
                <button type="button" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
