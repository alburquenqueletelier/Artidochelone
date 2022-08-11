import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/main.css";

export const Admin = () => {
  const { store, actions } = useContext(Context);
  const [showData, setShowData] = useState(null);
    // demo functions
    const loadData = (e) => {
        if (e.target.value == 'User'){

        }
        if (e.target.value == 'Post'){

        }
        if (e.target.value == 'Comment'){

        }
        if (e.target.value == 'Hashtag'){

        }
        if (e.target.value == 'Profile'){

        }
    }
    // 
  return (
    <div className="row justify-content-center m-5">
      <div class="btn-group btn-group-lg col-auto" role="group" aria-label="Large button group">
        <button type="button" class="btn btn-outline-dark">User</button>
        <button type="button" class="btn btn-outline-dark">Post</button>
        <button type="button" class="btn btn-outline-dark">Comment</button>
        <button type="button" class="btn btn-outline-dark">Hashtag</button>
        <button type="button" class="btn btn-outline-dark">Profile</button>
      </div>
    </div>
  );
};
