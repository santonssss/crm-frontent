import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/Context";
import ChartWrapper from "../../Components/Chart/Chart";
import Delivary from "../../Components/delivary/Delivary";
import Profile from "../../Components/Profile/Profile";
import ModalProfile from "../../Modals/ModalProfile/ModalProfile";
import ModalLogout from "../../Modals/ModalLogout/ModalLogout";
import ModalDelivery from "../../Modals/ModalDelivery/ModalDelivery";
import ModalDataClientHistory from "../../Modals/ModalDataClientHistory/ModalDataClientHistory";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { sidebarOpen, modalProfileOpen, logoutOpen, deliveryOpen } =
    useContext(UserContext);
  const [atTheMomentDelivery, setTheMomentDelivery] = useState({});
  const [openHistory, setOpenHistory] = useState(false);
  const [atTheMomentClient, setAtTheMomentClient] = useState({});
  const role = localStorage.getItem("role");
  return (
    <div className={`home-wrap ${sidebarOpen ? "p-o" : "p-c"}`}>
      <ChartWrapper />
      <Delivary setTheMomentDelivery={setTheMomentDelivery} />
      <Profile />
      {role !== "optometrist" && (
        <Link
          to={"/sign-in123123123123"}
          className="bg-blue-500 absolute abs rounded-full p-2 text-white"
        >
          Добавить
        </Link>
      )}

      {modalProfileOpen && <ModalProfile />}
      {logoutOpen && <ModalLogout />}
      {deliveryOpen && (
        <ModalDelivery
          atTheMomentDelivery={atTheMomentDelivery}
          setOpenHistory={setOpenHistory}
          atTheMomentClient={atTheMomentClient}
          setAtTheMomentClient={setAtTheMomentClient}
        />
      )}
      {openHistory && (
        <ModalDataClientHistory
          setOpenHistory={setOpenHistory}
          atTheMomentClient={atTheMomentClient}
        />
      )}
    </div>
  );
};

export default HomePage;
