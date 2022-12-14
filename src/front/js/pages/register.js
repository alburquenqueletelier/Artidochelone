import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import "../../styles/main.css";
import { number } from "prop-types";


export const Register = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(null);

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [info, setInfo] = useState();

  const handleFailure = (result) => {
    console.log(result);
  };

  useEffect(()=>{
    if (!!store.user){
      setRedirect(<Navigate to="/" />);
    } else {
      setRedirect("");
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.length < 1 ||
      typeof name.charAt(0) === number ||
      name.charAt(0) == " "
    ) {
      alert(
        "Name Error: must be greater than 1, start with a letter (don't use space or especial character"
      );
      return false;
    }
    if (
      lastname.length < 1 ||
      typeof lastname.charAt(0) === number ||
      lastname.charAt(0) == " "
    ) {
      alert(
        "Lastname Error: must be greater than 1, start with a letter (don't use space or especial character"
      );
      return false;
    }
    if (password != password2) {
      alert("Password must coincide");
      return false;
    }
    if (!email.includes("@")) {
      alert("Enter a valid email");
      return false;
    }
    setInfo(data), actions.postRegister(data);
  };
  let data = {
    name: name.replace(/\w\S*/g, (w) =>
      w.replace(/^\w/, (c) => c.toUpperCase())
    ),
    lastname: lastname.replace(/\w\S*/g, (w) =>
      w.replace(/^\w/, (c) => c.toUpperCase())
    ),
    username: username,
    email: email,

    password: password,
    password2: password2,
  };
  return (
    <div className="my-4 mx-auto p-4 rounded col-4 glass2 container-wrapper">
      {redirect}
      <div className="border border-light border-bottom-0 text-light rounded-top">
        <h3 className="m-3">Sign Up</h3>
      </div>
      <form>
        <div className="mb-3">
          <input
            type="username"
            className="form-control bg-default opacity-50"
            placeholder="Username"
            id="exampleInputUsername"
            aria-describedby="usernameHelp"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3 input-group">
          <input
            type="text"
            aria-label="First name"
            className="form-control bg-default opacity-50"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            aria-label="Last name"
            className="form-control bg-default opacity-50"
            placeholder="Lastname"
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="form-control bg-default opacity-50"
            placeholder="Email address"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control bg-default opacity-50"
            placeholder="Password"
            id="exampleInputPassword1"
            onChange={(e)=> setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control bg-default opacity-50"
            placeholder="Repeat Password"
            id="exampleInputPassword2"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <div className="d-grid gap-2 my-3 ">
          <button
            type="submit"
            className="btn btn-outline-dark opacity-70 my-3 "
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
