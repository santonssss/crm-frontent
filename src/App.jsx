import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import Sidebar from "./Components/Sidebar/Sidebar";
function App() {
  return (
    <div className="container">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
