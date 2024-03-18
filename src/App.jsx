import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import Sidebar from "./Components/Sidebar/Sidebar";
import Products from "./Pages/Products/Products";
import Orders from "./Pages/Orders/Orders";
import Clients from "./Pages/Clients/Clients";
import Signin from "./Pages/Signin/Signin";
import Abacus from "./Pages/Abacus/Abacus";
function App() {
  return (
    <div className="container">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/abacus" element={<Abacus />} />
      </Routes>
    </div>
  );
}

export default App;
