import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/Context";
import ChartWrapper from "../../Components/Chart/Chart";
import Delivary from "../../Components/delivary/Delivary";
import Profile from "../../Components/Profile/Profile";
import ModalProfile from "../../Modals/ModalProfile/ModalProfile";
import ModalLogout from "../../Modals/ModalLogout/ModalLogout";
import ModalDelivery from "../../Modals/ModalDelivery/ModalDelivery";

const HomePage = () => {
  const { sidebarOpen, modalProfileOpen, logoutOpen, deliveryOpen } =
    useContext(UserContext);
  return (
    <div className={`home-wrap ${sidebarOpen ? "p-o" : "p-c"}`}>
      <ChartWrapper />
      <Delivary />
      <Profile />
      {modalProfileOpen && <ModalProfile />}
      {logoutOpen && <ModalLogout />}
      {deliveryOpen && <ModalDelivery />}
    </div>
  );
};

export default HomePage;
