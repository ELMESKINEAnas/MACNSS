import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import LoginPatient from "./../pages/LoginPatient";
import LoginAgent from "./../pages/LoginAgent";
import Home from "../pages/Home";
import ManagePatient from "../pages/ManagePatient";

export default function ERoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home/> } />
        <Route path="/LoginPatient" element={<LoginPatient />} />
        <Route path="/LoginAgent" element={<LoginAgent />} />
        <Route path="/ManagePatient" element={<ManagePatient />} />
      </Routes>
    </HashRouter>
  );
}
