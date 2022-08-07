import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { About } from "./pages/about";
// import { Features } from "./pages/features";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Register } from "./pages/register";
import { Profile } from "./pages/profile";
import { Loquesea } from "./pages/loquesea";

import GoogleLogin from "react-google-login";


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
              <Route element={<Register />} path="/register" />
              <Route element={<About />} path="/about" />
              <Route element={<Home />} path="/" />
              <Route element={<Profile />} path="/profile " />
              <Route element={<Loquesea />} path="/loquesea" />
              <Route element={<h1>Not found!</h1>} />
            </Routes>
         
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
