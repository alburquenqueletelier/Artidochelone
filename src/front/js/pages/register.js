import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/main.css";
import { number } from "prop-types";

export const Register = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

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
    return actions.register(e, data);
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
    <div className="my-4 mx-auto p-4 rounded col-4 glass2">
      <div className="border border-light border-bottom-0 text-light rounded-top">
        <h3 className="m-3">Sign Up</h3>
      </div>
      <form             onSubmit={(e) => {
              handleSubmit(e);
            }}>
        <div className="mb-3">
          <input
            type="username"
            className="form-control bg-default opacity-50"
            placeholder="Username"
            id="exampleInputUsername"
            aria-describedby="usernameHelp"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3 input-group">
          <input
            type="text"
            aria-label="First name"
            className="form-control bg-default opacity-50"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            aria-label="Last name"
            className="form-control bg-default opacity-50"
            placeholder="Lastname"
            value={lastname}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control bg-default opacity-50"
            placeholder="Password"
            id="exampleInputPassword1"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control bg-default opacity-50"
            placeholder="Repeat Password"
            id="exampleInputPassword2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <div className="d-grid gap-2 my-3 ">
          <button
            type="submit"
            className="btn btn-outline-dark opacity-70 my-3 "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
