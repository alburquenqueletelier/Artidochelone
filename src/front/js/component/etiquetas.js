import React from "react";

export const Etiquetas = () => {
  return (
    <>
      <div className="bg-dark opacity-50 text-light">
        <div className="text-center">Etiquetas AQUI!</div>
        <div className="d-flex justify-content-evenly">
          <div className="categoria1">categoria1</div>
          <div className="categoria2">categoria2</div>
          <div className="categoria3">categoria3</div>
          {/* mapear las etiquetas segun lo guardado en store para generar cada div */}
        </div>
      </div>
    </>
  );
};