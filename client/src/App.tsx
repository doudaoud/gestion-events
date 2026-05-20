import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import "./App.css";
export default function App(): React.ReactElement {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path ="/home" element ={ <Home />} />
      </Routes>
    </React.Fragment>
  );
}
