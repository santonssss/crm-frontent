import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Home/HomePage";
import Orders from "../Orders/Orders";
import Products from "../Products/Products";
import Clients from "../Clients/Clients";
import Abacus from "../Abacus/Abacus";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { UserContext } from "../../Context/Context";
import MobilePage from "../MobilePage/MobilePage";

const Main = () => {
  const { setSidebarOpen, sidebarOpen } = useContext(UserContext);
  const role = localStorage.getItem("role");

  return (
    <div className="container">
      {role !== "root" && <Sidebar />}
      <div
        className={`overlay ${sidebarOpen ? "z-ind" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      <Routes>
        {role === "root" ? (
          <Route path="/" element={<MobilePage />} />
        ) : (
          <React.Fragment>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/abacus" element={<Abacus />} />
          </React.Fragment>
        )}
      </Routes>
      {role !== "root" && (
        <div
          className="reload bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-blue-700"
          onClick={() => {
            window.location.reload();
          }}
        >
          Обновить данные
        </div>
      )}
    </div>
  );
};

export default Main;
