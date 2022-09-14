import React, { useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { Context } from "../store/appContext";
import "../../styles/GaleryHome.css";
import "../../styles/main.css";

import { none } from "@cloudinary/url-gen/qualifiers/progressive";

export const GaleryHome = () => {
  const { store } = useContext(Context);
  // const [dummyImage] = useState([
  //   "http://www.brabbu.com/en/inspiration-and-ideas/wp-content/uploads/2015/06/Digital-Art-Photography-for-Art-Lovers4.jpg",
  //   "https://i.pinimg.com/564x/3f/91/6f/3f916ff60ffa5093cf72dca8af50b785.jpg",
  //   "https://i.pinimg.com/564x/b0/74/f9/b074f94a1eba3fd53053ffa591bfa751.jpg",
  //   "https://i.pinimg.com/564x/df/eb/59/dfeb59b54648cb3c170bc540304f7163.jpg",
  //   "https://i.pinimg.com/564x/f9/25/fa/f925fab2abb9a650165acf62d3b7e867.jpg",
  // ]);
  const refArray = useRef({});
  const hideModal = index => {
    const modal = new bootstrap.Modal(refArray[index]);
    return console.log(modal);
  }


  return (
    <div id="galery-home" className="container-fluid p-5 glass2">
      <div className="container">
        <div className="row ">
          <div className="gallery">
            {!!store?.top10 ?
              store?.top10.top10.map((item, index) => {
                return (
                  <div key={index}>
                    {item.posts.length > 0 ? (
                      item.posts.map((post, indexPost) => {

                        return (
                          <div key={indexPost} className='glass2 mb-2'>
                            <button
                              type="button"
                              className="btn"
                              data-bs-toggle="modal"
                              data-bs-target={"#idModal" + post.id}
                            >
                              <div className="div-galeriaimg">
                                {post.image.includes("image") ?
                                  <img
                                    className="galeriaimg"
                                    src={post.image}
                                    alt="post"
                                  />
                                  :
                                  <video src={post.image} style={{ width: "320px", height: "240px" }} autoPlay loop muted>
                                  </video>
                                }
                              </div>
                              <div
                                className="username-galeriaimg px-3 d-flex justify-content-between glassTitle"
                              >
                                <span> subido por {/* {foto usuario} */} <strong>{item.username}</strong></span>
                                <span><FaRegComment /> {item.received_comments.length}</span>
                              </div>
                            </button>

                            <div
                              className="modal fade"
                              id={"idModal" + post.id}
                              tabIndex="-1"
                              aria-labelledby={"postModalLabel" + post.id}
                              aria-hidden="true"
                              style={{ position: "sticky", top: 0 }}
                              ref={ref => {
                                refArray.current['' + index + indexPost] = ref;
                              }}
                            >
                              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <Link
                                      className="btn"
                                      to={"/profile/" + item.username}
                                      onClick={() => hideModal(refArray['' + index + indexPost])}
                                    >
                                      <h5
                                        className="modal-title text-success"
                                        id={"postModalLabel" + post.id}
                                      >
                                        {post.title} &nbsp;&nbsp;
                                        <small>
                                          <b>by {item.username}</b>
                                        </small>
                                      </h5>
                                    </Link>

                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <p>{post.description}</p>
                                  </div>
                                  <div className="modal-footer">
                                    <p className="me-5">
                                      At: <small>{post.created}</small>
                                    </p>
                                    <button
                                      type="button"
                                      className="btn btn-secondary ms-5 text-center"
                                      data-bs-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <img
                        className="galeriaimg"
                        src={
                          "https://dummyimage.com/600x400/000/fff&text=" + item.username}
                        alt="No Post"
                      />
                    )}
                  </div>
                );
              }) : (
                <div className="text-center">
                  <div
                    className="spinner-border"
                    style={{ width: "3rem", height: "3rem" }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};
