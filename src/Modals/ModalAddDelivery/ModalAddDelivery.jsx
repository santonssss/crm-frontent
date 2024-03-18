import React, { useContext } from "react";
import "./ModalAddDelivery.css";
import { UserContext } from "../../Context/Context";
const ModalAddDelivery = () => {
  const { setAddDeliveryOpen } = useContext(UserContext);
  return (
    <div className="add-delivery" onClick={() => setAddDeliveryOpen(false)}>
      <form
        className="add-delivery_modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <span>Имя доставщика</span>
          <input type="text" placeholder="достащик" />
        </div>
        <div>
          <span>Телефон</span>
          <input type="text" placeholder="+7 (777) 777 77 77" />
        </div>
        <div>
          <span>Адрес</span>
          <input type="text" placeholder="Номер машины" />
        </div>

        <div className="add_btns">
          <button type="submit">Добавить</button>
          <button type="button" onClick={() => setAddDeliveryOpen(false)}>
            Отменить
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalAddDelivery;
