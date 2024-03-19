import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Home/HomePage";
import Orders from "../Orders/Orders";
import Products from "../Products/Products";
import Clients from "../Clients/Clients";
import Abacus from "../Abacus/Abacus";
import Sidebar from "../../Components/Sidebar/Sidebar";

const Main = () => {
  return (
    <div className="container">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/abacus" element={<Abacus />} />
      </Routes>
    </div>
  );
};

export default Main;
