import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

import "../../styles/main.css";

export const Setting = () => {
  const {store, actions} = useContext(Context);
  const [imageSelect, setImageSelect] = useState("");
  const [uploadImage, setUploadImage] = useState("");
  const [redirect, setRedirect] = useState(null);
  const [description, setDescription] = useState(" ");
  const myRef = useRef();


  const changePhoto = ()=>{
    myRef.current.click();
  }

  const preview = (e) => {
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setImageSelect(objectUrl);
    setUploadImage(e.target.files[0]);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }

  const handlesubmit = async(e) => {
    // fetch
    e.preventDefault();
    if (description == store.user.profile.description && imageSelect == store.user.profile.image){
      alert("success");
      return true;
    } else {
      // Fetch a cloudinary para subir imagen
      const formdata = new FormData();
      formdata.append("file", uploadImage);
      formdata.append("upload_preset", "artidochelone");
      const response = await fetch("https://api.cloudinary.com/v1_1/baal1992/auto/upload", {
        method: "POST",
        body: formdata,
      })
      const dataImg = await response.json();

      // console.log("dataimgae", dataImg);
      await fetch(process.env.BACKEND_URL + "/api/profile/setting/"+store.user.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + store.token,
        },
        body: JSON.stringify({
          image: dataImg.url,
          description: description
        })
      })
      .then(res=>res.json())
      .then(data=>{
        alert(JSON.stringify(data));
      })
      .catch(error=>console.log(error))
      actions.getUser(store.user?.id);
      return false;
    }
  }

  useEffect(() => {
    if (!!store.user) {
      setRedirect("");
      if (!!store.user.profile.photo) setImageSelect(store.user?.profile.photo)
      if (!!store.user.profile.description) setDescription(store.user?.profile?.description)
    } else {
      setRedirect(<Navigate to="/" />);
    }
  }, [store.user]);


  return (
    <div className="container-fluid">
        {!store.user && redirect}
        <form className="m-3 row justify-content-center text-center" onSubmit={handlesubmit}>
            <div className="col-md-3 mb-3">
                <input hidden type="file" ref={myRef} onChange={(e)=>preview(e)} />
                <img style={{width: "300px", height: "200px"}} className="hover-effect form-control" onClick={()=>changePhoto()} accept="image/*" src={!!imageSelect ? imageSelect : "https://dummyimage.com/300x300/000/fff"} alt="avatar" id="floatingInput"/>
                <label htmlFor="floatingInput">Click to change image</label>
            </div>
            <div className="form-floating">
                <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "100px"}} value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                <label htmlFor="floatingTextarea2">Description</label>
            </div>
            <button type="submit" className="btn btn-primary mt-2 col-auto">Save</button>
        </form>
    </div>
  )
};
