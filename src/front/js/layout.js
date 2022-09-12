import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import { Home } from "./pages/home";
import { About } from "./pages/about";
import { Admin } from "./pages/admin";
import { Register } from "./pages/register";
import { Profile } from "./pages/profile";
import { Post } from "./pages/post";
import { Setting } from "./pages/settingprofile";
// import { Features } from "./pages/features";
import injectContext from "./store/appContext";



//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />

          <Routes>
            <Route element={<Setting />} path={"/profile/setting/:username"} />
            <Route element={<Profile />} path={"/profile/:username"} />
            <Route element={<Profile />} path={"/profile"} />
            <Route element={<Admin />} path="/admin" />
            <Route element={<Register />} path="/register" />
            <Route element={<Post />} path="/post" />
            <Route element={<About />} path="/about" />
            <Route element={<Home />} path="/" />

            <Route element={<div className="text-center"><h1>404: Not found!</h1></div>} path="*"/>
          </Routes>

          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
