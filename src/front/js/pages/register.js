import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Register = () => {
    const { store, actions } = useContext(Context);
    const [ name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState ("");
    const [dateofbirth, setDateofbirth] = useState ("");
    const [email , setEmail] = useState ("");
    const [phonenumber, setPhonenumber] = useState ("");
    const [password, setPassword] = useState ("");
    const [ info, setInfo] = useState();
    const handleSubmit = () => {setInfo(data), actions.postRegister(info)}
    // const userRegister = () => {
    //    actions.postRegister(info)
    // };
    let data = {
        name: name ,
        lastname: lastname,
        username: username,
        dateofbirth: dateofbirth,
        email: email,
        phonenumber: phonenumber,
        password: password
    }
    return (
        <div className= "container">
            <div className="row m-5">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Name" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                    onChange={ (e) => setName(e.target.value) }/>
                </div>
            </div>
            <div className="row m-5">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Last Name" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                    onChange={ (e) => setLastname(e.target.value) }/>
                </div>
            </div>
            <div className="row m-5">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Username" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                    onChange={ (e) => setUsername(e.target.value) }/>
                </div>
            </div>
            <div className="row m-5">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Date of birth" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                    onChange={ (e) => setDateofbirth(e.target.value) }/>
                </div>
            </div>
            <div className="row m-5">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Email" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                    onChange={ (e) => setEmail(e.target.value) }/>
                </div>
            </div>
            <div className="row m-5">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Phone Number" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                    onChange={ (e) => setPhonenumber(e.target.value) }/>
                </div>
            </div>
            <div className="row m-5">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Password" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                    onChange={ (e) => setPassword(e.target.value) }/>
                </div>
            </div>
            <div className="row m-5">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Repeat Password" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
            </div>
            <div className="row m-5">
                <button type="button" className="btn btn-dark"
                    onClick={ () => {
                            handleSubmit()  
                    }
                        }
                >Submit</button>
            </div>
        </div>
    );
}