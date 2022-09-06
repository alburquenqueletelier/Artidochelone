import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { Context } from "../store/appContext";
import "../../styles/GaleryHome.css";

export const GaleryHome = () => {
  const { store } = useContext(Context);
  // const [dummyImage] = useState([
  //   "http://www.brabbu.com/en/inspiration-and-ideas/wp-content/uploads/2015/06/Digital-Art-Photography-for-Art-Lovers4.jpg",
  //   "https://i.pinimg.com/564x/3f/91/6f/3f916ff60ffa5093cf72dca8af50b785.jpg",
  //   "https://i.pinimg.com/564x/b0/74/f9/b074f94a1eba3fd53053ffa591bfa751.jpg",
  //   "https://i.pinimg.com/564x/df/eb/59/dfeb59b54648cb3c170bc540304f7163.jpg",
  //   "https://i.pinimg.com/564x/f9/25/fa/f925fab2abb9a650165acf62d3b7e867.jpg",
  // ]);

  return (
    <div id="galery-home" className="container-fluid p-5 glass2">
      <div className="container">
        <div className="row ">
          <div className="gallery">
            {!!store?.top10 ? (
              store?.top10.top10.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="row justify-content-center m-1">
                      <div className="col-auto">
                        <h3>{item.username} </h3>
                      </div>
                      <div className="col-auto">
                        <h3>
                          <FaRegComment /> {item.received_comments.length}
                        </h3>
                      </div>
                    </div>
                    {item.posts.length > 0 ? (
                      item.posts.slice(0, 3).map((post, indexPost) => {
                        return (
                          <div key={indexPost}>
                            <img
                              className="galeriaimg"
                              src={post.image}
                              alt="post"
                            />
                          </div>
                        );
                      })
                    ) : (
                      <img
                        className="galeriaimg"
                        src={
                          "https://dummyimage.com/600x400/000/fff&text=" +
                          item.username
                        }
                        alt="No Post"
                      />
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center">
                <div
                  className="spinner-border"
                  style={{ width: "3rem", height: "3rem" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
