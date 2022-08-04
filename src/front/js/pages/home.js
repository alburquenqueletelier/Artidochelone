import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { BsSearch, BsHeart, BsChatLeftDots } from "react-icons/bs";
import { Postmodal } from "../component/postModal";
import { JumbotronTop10 } from "../component/JumbotronTop10";

import "../../styles/main.css";
import { Features } from "../component/features";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
       {/* <div className="d-flex align-items-center sidebar">
         <div className="h-100 flex-column  flex-shrink-0 bg-dark opacity-50 sticky">
          <ul className="nav flex-column mt-3">
            <li className="nav-item my-2 ">
              <Postmodal>
              </Postmodal>
            </li>
            <li className="nav-item my-2">
              <a className="nav-link" href="#"><BsChatLeftDots /></a>
            </li>
            <li className="nav-item my-2">
              <a className="nav-link" href="#"><BsHeart /></a>
            </li>
          </ul>
        </div>  */}

      {/*  jumbotron descripcion pagina */}

<JumbotronTop10 />
<Features />
      {/* </div>  */}
      {/* sidebar overflow, pos absolute*/}
    </>
  );
};
