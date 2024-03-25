import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import Sidebar from "./Components/Sidebar/Sidebar";
import Products from "./Pages/Products/Products";
import Orders from "./Pages/Orders/Orders";
import Clients from "./Pages/Clients/Clients";
import Abacus from "./Pages/Abacus/Abacus";
import Signin from "./Pages/Signin/Signin";
import SignUp from "./Pages/SignUp/SignUp";
import Main from "./Pages/Main/Main";
import NadlaknoyDelivery from "./Pages/NadladnoyDelivery/NadlaknoyDelivery";
function App() {
  const navigate = useNavigate();
  const tok = localStorage.getItem("accessToken");
  const isTokenPresent = tok !== null && tok !== undefined && tok !== "";
  useEffect(() => {
    if (!isTokenPresent) {
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/sign-in"
      ) {
        navigate("/login");
      }
    }
  }, []);

  return (
    <Routes>
      {isTokenPresent ? (
        <>
          <Route path="/nakladnoy-delivery" element={<NadlaknoyDelivery />} />
          <Route path={"*"} element={<Main />} />
        </>
      ) : (
        <>
          <Route path={"/sign-in"} element={<Signin />} />
          <Route path={"/login"} element={<SignUp />} />
        </>
      )}
    </Routes>
  );
}

export default App;
