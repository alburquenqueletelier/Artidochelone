import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/main.css";




export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid text-center mt-5 glass2">
		{/* Carousel con 2 imagenes por slides. Debe ser generado con los top 10 proyectos */}
      <div
        id="carouselExampleIndicators"
        className="carousel carousel-dark slide p-5"
        data-bs-ride="true"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row justify-content-center">
              <div className="col-auto">
                <img
                  src="https://dummyimage.com/400x300/000/fff"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="col-auto">
                <img
                  src="https://dummyimage.com/400x300/000/fff"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="row justify-content-center">
              <div className="col-auto">
                <img
                  src="https://dummyimage.com/400x300/000/fff"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="col-auto">
                <img
                  src="https://dummyimage.com/400x300/000/fff"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="row justify-content-center">
              <div className="col-auto">
                <img
                  src="https://dummyimage.com/400x300/000/fff"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="col-auto">
                <img
                  src="https://dummyimage.com/400x300/000/fff"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
		{/* Descripción de la pagina */}
		<p className="m-5sh">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eleifend interdum sapien vitae malesuada. Integer sed leo sed est fringilla convallis. Pellentesque malesuada ut nulla ut feugiat. Praesent egestas erat vel lacus mattis, vel facilisis erat iaculis. Duis eleifend volutpat dapibus. Proin porta mauris non accumsan imperdiet. Vestibulum porttitor purus eget tortor bibendum, vitae fermentum odio aliquam. Proin rhoncus ut orci vel molestie. Suspendisse in urna eleifend, lobortis felis sed, pharetra dui. Nullam gravida dapibus justo, ac eleifend elit tristique et. Suspendisse molestie lectus eget placerat convallis. Vivamus venenatis, erat nec rutrum pulvinar, ex risus vehicula nunc, viverra interdum eros tellus et metus. Maecenas in mi dui. Donec efficitur diam quis felis congue, sit amet scelerisque ex vestibulum.</p>
    </div>
  );
};
