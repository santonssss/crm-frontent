import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Home/HomePage";
import Orders from "../Orders/Orders";
import Products from "../Products/Products";
import Clients from "../Clients/Clients";
import Abacus from "../Abacus/Abacus";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { UserContext } from "../../Context/Context";

const Main = () => {
  const { setSidebarOpen, sidebarOpen } = useContext(UserContext);
  return (
    <div className="container">
      <Sidebar />
      <div
        className={`overlay ${sidebarOpen ? "z-ind" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>
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
