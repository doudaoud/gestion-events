import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import Signin from "../src/pages/Signin";
import "./App.css";
export default function App(): React.ReactElement {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path ="/home" element ={ <Home />} />
        <Route path ="/signIn" element ={ <Signin />} />
      </Routes>
    </React.Fragment>
  );
}
