import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import Sidebar from "./Components/Sidebar/Sidebar";
import Products from "./Pages/Products/Products";
function App() {
  return (
    <div className="container">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
