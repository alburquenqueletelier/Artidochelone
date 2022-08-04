import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { FcGoogle } from "react-icons/fc";
import "../../styles/main.css";

export const Register = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState();
  const handleSubmit = () => {
    setInfo(data), actions.postRegister(data);
  };
  // const userRegister = () => {
  //    actions.postRegister(info)
  // };
  let data = {
    name: name,
    lastname: lastname,
    username: username,
    email: email,
    password: password,
  };
  return (

    <div className="my-4 mx-auto p-4 rounded col-6 glass2">
      <div className="border border-secondary border-bottom-0 text-light rounded-top">
        <h3 class="m-3">
          Log In
        </h3>
      </div>
      <form>
        <div className="mb-3">
          <input
            type="email"
            className="form-control bg-default opacity-50"
            placeholder="Username"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3 input-group">
          <input
            type="text"
            aria-label="First name"
            class="form-control bg-default opacity-50"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}

          />
          <input
            type="text"
            aria-label="Last name"
            class="form-control bg-default opacity-50"
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
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control bg-default opacity-50"
            placeholder="Repeat Password"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}

          />
        </div>
        <div className="d-grid gap-2">
          <button
            type="submit"
            className="btn btn-outline-dark opacity-70 my-3 "
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </button>
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-outline-dark">
            Or continue with <FcGoogle className="fs-1"/>
          </button>
        </div>
      </form>
    </div>
  );
};
