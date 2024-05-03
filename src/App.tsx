import React from "react";
import { useState } from "react";
import globalStyle from "./Styles/globalCss";
import Flex from "./Styles/styledComponent/Flex";
import Nav from "./components/nav";
import Main from "./components/main";
import Features from "./components/features";
import About from "./components/about";
import Faq from "./components/faq";
import Contact from "./components/contact";
import Register from "./components/register";
import Login from "./components/login";
import LogReg from "./components/logreg";
import ProfOut from "./components/profout";
import Dashboard from "./components/dashboard";
import UserProfile from "./components/profile";
import AuthPage from "./components/authPage";
import ChatsPage from "./components/chatsPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  globalStyle();

  return (
    <Router>
      <Flex
        id="wrapper"
        data-testid="app"
        css={{
          position: "relative",
          padding: " $2 $10",
          "@bp1": {
            padding: " $2 $3",
          },
          "@bp2": {
            padding: " $2 $5",
          },
          "@bp5": {
            padding: " $2 $3",
          },
          backgroundImage: `url(${require("./asesst/BG.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Navbar */}
        <Nav />

        {/* Main content */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/logreg" element={<LogReg />} />
          <Route path="/profout" element={<ProfOut />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />{" "}
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/authPage" element={<AuthPage />} />
          <Route path="/chatsPage" element={<ChatsPage />} />
        </Routes>
      </Flex>
    </Router>
  );
};

export default App;
