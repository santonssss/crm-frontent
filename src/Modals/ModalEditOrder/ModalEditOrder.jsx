import React, { useContext, useEffect, useState } from "react";
import "./ModalEditOrder.css";
import { UserContext } from "../../Context/Context";
const token = localStorage.getItem("accessToken");


const ModalEditOrder = ({ order, onClose, client, fetchOrdersOfClients }) => {
  const [money, setMoney] = useState(0);
  const [payOrder, setPayOrder] = useState(order);

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
    setMoney(event.target.value);
  };



  const handleAcceptPayment = async () => {
    try {
      
      const dataBody = {
        money: Number(money),
        order: order.id,
        profile: client.profile.id
      }
      console.log(dataBody);
      const response = await fetch(
        `https://monkfish-app-v8pst.ondigitalocean.app/api/payment-history`,
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(
            dataBody
          )
        }
      );
      
      const data = await response.json()
      console.log(data)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const orderUpadte = await fetch(
        `https://monkfish-app-v8pst.ondigitalocean.app/api/order/${order.id}?relations[0]=paymentHistories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataOrder = await orderUpadte.json();
      setPayOrder(dataOrder.data)
      setMoney(0);
      fetchOrdersOfClients()
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
          </tr>
        </thead>
        <tbody className="text-gray-700">
                <tr>
                  <td>{payOrder.id}</td>
                  <td>{formatDate(new Date(payOrder.createdAt))}</td>
                  <td>{formatToRubles(payOrder.amount)}</td>
                  <td>{ formatToRubles(payOrder.amount - payOrder.remains) }</td>
                  <td>{ formatToRubles(payOrder.remains) }</td>
                </tr>
              <tr className="bg-gray-200">
                  <td><strong>Итог:</strong></td>
                  <td></td>
                  <td></td>
                  <td>{ formatToRubles(payOrder.amount - payOrder.remains) }</td>
                  <td>{ formatToRubles(payOrder.remains) }</td>
                </tr>
        </tbody>
      </table>
            </div>

            
        </div>
          <div className="flex text-gray-900 mt-20 justify-center items-center">
            <label htmlFor="paymentInput" className="pr-10">Оплата: </label>
            <input
              id="paymentInput" type="number" placeholder={payOrder.remains} value={money} onChange={handlePaymentAmountChange} className="pr-5"/>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded pl-5" onClick={handleAcceptPayment}>
    Принять оплату
  </button>
          </div>
          
          <div className="overflow-x-auto p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">История оплаты</h3>
            </div>
            <div className="max-h-[500px] overflow-y-auto overflow-x-auto">

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
                    payOrder.paymentHistories.length > 1 ? (
                      payOrder.paymentHistories
                        .filter((value) => value.paymentType !== 'debt')
                        .map((value, index) => (<>
<tr> 
                        <td className="px-4 py-3 whitespace-nowrap">{ value.createdAt }</td>
                        <td className="px-4 py-3 whitespace-nowrap">{ formatToRubles(Number(value.money))}</td>
                            <td className="px-4 py-3 whitespace-nowrap">{payOrder.amount - value.money}</td>
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
    </div>
  );
};

export default ModalEditOrder;
