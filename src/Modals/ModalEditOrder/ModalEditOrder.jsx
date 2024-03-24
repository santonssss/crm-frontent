import React, { useContext, useEffect, useState } from "react";
import "./ModalEditOrder.css";
import { UserContext } from "../../Context/Context";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbWEiLCJpZCI6NDMsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzExMjM2MTk2LCJleHAiOjE3MTEzMjI1OTZ9.hXjzpXeC3hFzC-Jg-qdmpizbdsIAIw9Gk7qsErKWw4M'


const ModalEditOrder = ({ order, onClose }) => {
  const [money, setMoney] = useState(null);

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

  const [paymentAmount, setPaymentAmount] = useState(order.remains);

  const handlePaymentAmountChange = (event) => {
    setPaymentAmount(event.target.value);
  };



  const handleAcceptPayment = async () => {
    try {
      // const queryParams = new URLSearchParams(params).toString();
      const response = await fetch(
        `https://monkfish-app-v8pst.ondigitalocean.app/api/payment-history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.json()

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(data.data)
      onClose();
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  
  // useEffect(() => {
  //   fetchOrderById();
  // }, [])

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
        <div className="flex items-center justify-center edit-order_modal">
        <div className="bg-white rounded-lg shadow-xl">
            <div className="overflow-x-auto">
              <table className="order-table min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th>№ Накладного</th>
            <th>Дата</th>
            <th>Сумма</th>
            <th>Оплачен</th>
            <th>Долги</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
                <tr>
                  <td>{order.id}</td>
                  <td>{formatDate(new Date(order.createdAt))}</td>
                  <td>{formatToRubles(order.amount)}</td>
                  <td>{ formatToRubles(order.amount - order.remains) }</td>
                  <td>{ formatToRubles(order.remains) }</td>
                </tr>
              <tr className="bg-gray-200">
                  <td><strong>Итог:</strong></td>
                  <td></td>
                  <td></td>
                  <td>{ formatToRubles(order.amount - order.remains) }</td>
                  <td>{ formatToRubles(order.remains) }</td>
                  <td></td>
                </tr>
        </tbody>
      </table>
            </div>

            
        </div>

              <div className="flex justify-start p-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAcceptPayment}>
    Принять оплату
  </button>
  <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Сохранить
  </button>
          </div>
          <input type="number" placeholder={order.remains} value={paymentAmount} onChange={handlePaymentAmountChange} />
          <div className="overflow-x-auto p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">История оплаты</h3>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-semibold">Дата</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold">Оплачен</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold">Долги</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                
                  {
                    order.paymentHistories.length > 1 ? (
                      order.paymentHistories
                        .filter((value) => value.paymentType !== 'debt')
                        .map((value, index) => (<>
<tr>
                        <td className="px-4 py-3 whitespace-nowrap">{ value.createdAt }</td>
                        <td className="px-4 py-3 whitespace-nowrap">{ formatToRubles(Number(value.money))}</td>
                            <td className="px-4 py-3 whitespace-nowrap">{order.amount - value.money}</td>
                            </tr>
                      </>))
                      
                    ) : (
                  <>
                    Нету оплаты 
                  </>
                    )
                  }
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditOrder;
