import React, { useContext } from "react";
import "./ModalLogout.css";
import { UserContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
const ModalLogout = () => {
  const { setLogoutOpen } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="modal-overlay_logout">
      <div className="modal_logout">
        <p>Хотите ли вы выйти?</p>
        <div className="btns_logout">
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              navigate("/sign-in");
              setLogoutOpen(false);
            }}
          >
            Да
          </button>
          <button
            onClick={() => {
              setLogoutOpen(false);
            }}
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalLogout;
