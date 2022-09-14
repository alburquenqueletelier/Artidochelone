import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/CarouselJumbotron10.css";
import "../../styles/Button.css";
import { Link } from "react-router-dom";

export const JumbotronTop10 = () => {
  const { store } = useContext(Context);
  const posts = store.top10?.top10;
  const [status, setStatus] = useState("visible");

  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="false"
      onClick={()=>setStatus("invisible")}
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="3"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="4"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="5"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="6"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="7"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="8"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="9"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner ">
        {!!posts &&
          posts.map((item, index) => {
            return item.posts.length == 0 ? (
              <div key={index}>
                <Link
                  to={"/profile/" + item.username}
                  className={
                    index < 1 ? "carousel-item active" : "carousel-item"
                  }
                >
                  <img
                    src={
                      "https://dummyimage.com/600x400/000/fff&text=" +
                      item.username +
                      " has no post"
                    }
                    className="d-block w-100"
                    alt="..."
                  />
                </Link>
                <div className={"carousel-caption-Jumbotron" + status}>
                  <span className="span-caption">
                    <h1 className="fw-bold my-5">
                      CREA TU PROPIO PORTAFOLIO WEB
                    </h1>
                    <p className="py-3">MUESTRA Y EXPLORA TU CREATIVIDAD</p>
                    <a href="#galery-home">
                      <button className="btn blue" onClick={()=>setStatus("invisible")}>
                        ir a galeria!
                      </button>
                    </a>
                  </span>
                </div>
              </div>
            ) : (
              item.posts.map((post, indexPost) => {
                return (
                  <Link
                    to={"/profile/" + item.username}
                    className={
                      index < 1 ? "carousel-item active" : "carousel-item"
                    }
                    key={indexPost}
                  >
                    {post.image.includes("image") ? 
                    <img src={post.image} className="d-block w-100" alt="..." />
                    : <video src={post.image} className="d-block w-100" autoPlay muted loop ></video>  
                  }
                  </Link>
                );
              })
            );
          })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
