import React, { useContext } from "react";
import "./ModalLogout.css";
import { UserContext } from "../../Context/Context";
const ModalLogout = () => {
  const { setLogoutOpen } = useContext(UserContext);
  return (
    <div className="modal-overlay_logout">
      <div className="modal_logout">
        <p>Хотите ли вы выйти?</p>
        <div className="btns_logout">
          <button>Да</button>
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
