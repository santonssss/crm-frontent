import React, { useContext } from "react";
import "./ModalAddClients.css";
import { UserContext } from "../../Context/Context";
const ModalAddClients = () => {
  const { setAddClientsOpen } = useContext(UserContext);
  return (
    <div className="add-clients" onClick={() => setAddClientsOpen(false)}>
      <form
        className="add-clients_modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <span>Имя клиента</span>
          <input type="text" placeholder="Имя" />
        </div>
        <div>
          <span>Телефон</span>
          <input type="text" placeholder="+7 (777) 777 77 77" />
        </div>
        <div>
          <span>Адрес</span>
          <input type="text" placeholder="Адрес" />
        </div>
        <div>
          <span>Доставщик</span>
          <select name="" id="">
            <option value="">доставщика</option>
            <option value="">доставщика</option>
            <option value="">доставщика</option>
          </select>
        </div>
        <div className="add_btns">
          <button type="submit">Добавить</button>
          <button type="button" onClick={() => setAddClientsOpen(false)}>
            Отменить
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalAddClients;
