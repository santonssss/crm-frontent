import React, { useContext, useState } from "react";
import "./Sidebar.css";
import eos from "../../Assets/Icons/eos-icons_products.png";
import grommet from "../../Assets/Icons/grommet-icons_money.png";
import ion from "../../Assets/Icons/ion_people-outline.png";
import lets from "../../Assets/Icons/lets-icons_order.png";
import majesticons from "../../Assets/Icons/majesticons_home.png";
import close_icon from "../../Assets/Icons/iconamoon_close-duotone.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/Context";
const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useContext(UserContext);

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="sidebar">
      {!sidebarOpen ? (
        <div className="sidebar_icon" onClick={handleSidebarOpen}>
          <div className="burger-icon" />
          <nav className="sidebar-group-list">
            <ul>
              <li>
                <img src={majesticons} alt="icon" />
              </li>
              <li>
                <img src={eos} alt="icon" />
              </li>
              <li>
                <img src={lets} alt="icon" />
              </li>
              <li>
                <img src={ion} alt="icon" />
              </li>
              <li>
                <img src={grommet} alt="icon" />
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <>
          <div className="sidebar_open">
            <div className="sidebar_close-icon" onClick={handleSidebarClose}>
              <img src={close_icon} alt="icon" />
            </div>
            <nav className="sidebar-group-list">
              <ul>
                <li>
                  <img src={majesticons} alt="icon" />
                  <Link to={"/"}>Главная</Link>
                </li>
                <li>
                  <img src={eos} alt="icon" />
                  <Link to={"/products"}>Продукты</Link>
                </li>
                <li>
                  <img src={lets} alt="icon" />
                  <Link to={"/orders"}>Заказы</Link>
                </li>
                <li>
                  <img src={ion} alt="icon" />
                  <Link to={"/clients"}>Клиенты</Link>
                </li>
                <li>
                  <img src={grommet} alt="icon" />
                  <Link to={"/abacus"}>Счеты</Link>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
