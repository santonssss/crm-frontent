import React, { useContext, useEffect, useState } from "react";
import "./ModalEditOrder.css";
import { UserContext } from "../../Context/Context";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbWEiLCJpZCI6NSwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTEzOTU0ODIsImV4cCI6MTcxMTQ4MTg4Mn0.eUjkODDqd2qi3jy6Tbm42cvfWTFwwUz1XF4NWsEQRTg'


const ModalPayment = ({ orderId, profileId, onClose }) => {
  // const [order, setOrder] = useState({})
  const [open, setOpen] = useState(false);

  const formatToRubles = (value) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    }).format(value);
  };

  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;

    return formattedDate;
  }

  return (
    <div className="modal-overlay_edit-order">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="edit-order_close" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="black"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M3.146 3.146a.5.5 0 0 1 .708 0L8 7.293l4.146-4.147a.5.5 0 1 1 .708.708L8.707 8l4.147 4.146a.5.5 0 1 1-.708.708L8 8.707l-4.146 4.147a.5.5 0 0 1-.708-.708L7.293 8 3.146 3.854a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
        <div className="flex items-center justify-center w-500 h-700">
        <div className="bg-white rounded-lg shadow-xl">
            <div className="overflow-x-auto">
            </div>

            
        </div>

              <div className="flex justify-start p-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
    Принять оплату
  </button>
  <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Сохранить
  </button>
          </div>x
        </div>
        
      </div>
    </div>
  );
};

export default ModalPayment;
