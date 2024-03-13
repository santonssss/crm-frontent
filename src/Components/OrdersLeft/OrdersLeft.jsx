import React from "react";
import "./OrdersLeft.css";
const OrdersLeft = () => {
  return (
    <div className="orders-left">
      <div className="left-input">
        <input type="text" placeholder="Поиск" />
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.9167 20.5833C16.7031 20.5833 20.5833 16.7031 20.5833 11.9167C20.5833 7.1302 16.7031 3.25 11.9167 3.25C7.1302 3.25 3.25 7.1302 3.25 11.9167C3.25 16.7031 7.1302 20.5833 11.9167 20.5833Z"
            stroke="#656565"
            stroke-width="2.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22.7501 22.75L18.0918 18.0917"
            stroke="#656565"
            stroke-width="2.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className="delivery-list">
        <div className="list-title">Список доставщиков</div>
        <div className="list-body">
          <div className="list-name">Имя доставщика</div>
          <div className="list-name">Имя доставщика</div>
        </div>
      </div>
    </div>
  );
};

export default OrdersLeft;
