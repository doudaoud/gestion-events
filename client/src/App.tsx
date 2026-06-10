import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import Signin from "../src/pages/Signin";
import "./App.css";
import Signup from "./pages/Signup";
import Verificationcode from "./pages/Verificationcode";
import Typeprofile from "./pages/Typeprofile";

export default function App(): React.ReactElement {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signIn" element={<Signin />} />
        <Route path="/signUp" element={<Signup />} />
        <Route path="verification" element={<Verificationcode />} />
        <Route path="/signUp/typeprofile" element={<Typeprofile />} />
      </Routes>
    </React.Fragment>
  );
}
