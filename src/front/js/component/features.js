import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/hero-section.css"

export const Features = () => {
  const { store, actions } = useContext(Context);

  return (

    <div
      className='home__hero-section' >
      <div className='container'>
        <div className='row home__hero-row'>
        <h1 className="heading dark">Una nueva forma de exlorar y exponer contenido</h1>
            <p className='top-line'>
              Aquí encontrarás una comunidad formada por diversos artistas esperando conocer tu trabajo y compartir ideas
            </p>

          <div className='p-wrapper'>
              <div className=''>
                <p className="lead"><span className="me-3 fw-bolder dark"> PASO 1</span> Registrate para empezar a compartir tu trabajo</p>
                <p className="lead"><span className="me-3 fw-bolder dark"> PASO 2</span> Crea y organiza tu perfil de acuerdo a tu personalidad</p>
                <p className="lead"><span className="me-3 fw-bolder dark"> PASO 3</span> Comienza a explorar el contenido de otros artistas</p>
                <p className="lead"><span className="me-3 fw-bolder dark"> PASO 4</span> Comparte ideas opiniones y amplía tu red, sea por hobby o trabajo esta es la mejor opción</p>
              </div>
            </div>
        </div>
      </div>
    </div>



  );
};




