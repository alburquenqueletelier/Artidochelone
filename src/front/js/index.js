//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

///hacer galeria en home y portafolio en perfil. convertir form a offvanvas right y dejar la ruta en register///
///emmmet???jsx poner id al usuario id=contraseña? perfil hacer panel de adm


//hacer el pull request en github y merge de inmediato, en gitpod ir a main y pull ir a mi rama y hacer merge main para mezlar con 
//1-bajar la rama main 
//2-crear una rama en local desde main
//3-hacer los cambios 
//4-actualizar con pull en rama main
//5-cambiarme a mi rama y hacer un merge de main git merge main
//5.a si hay conflicto resolverlo
//6 subir la rama
//7 crear el pull request y mezclar


//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
