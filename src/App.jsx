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
import NakladnoyOrderDelivery from "./Pages/NakladnoyOrderDelivery/NakladnoyOrderDelivery";
import NakladnoyOrderAllClients from "./Pages/NakladnoyOrderAllClients/NakladnoyOrderAllClients";
function App() {
  const navigate = useNavigate();
  const tok = localStorage.getItem("accessToken");
  const isTokenPresent = tok !== null && tok !== undefined && tok !== "";
  useEffect(() => {
    if (!isTokenPresent) {
      if (window.location.pathname !== "/login") {
        navigate("/login");
      }
    }
  }, []);

  return (
    <Routes>
      <Route path={"/sign-in123123123123"} element={<Signin />} />
      {isTokenPresent ? (
        <>
          <Route path="/nakladnoy-delivery" element={<NadlaknoyDelivery />} />
          <Route path="/nakladnoy-order" element={<NakladnoyOrderDelivery />} />
          <Route
            path="/nakladnoyOrderAllClients"
            element={<NakladnoyOrderAllClients />}
          />
          <Route path={"*"} element={<Main />} />
        </>
      ) : (
        <>
          <Route path={"/login"} element={<SignUp />} />
        </>
      )}
    </Routes>
  );
}

export default App;
