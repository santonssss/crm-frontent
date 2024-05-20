import React, { useContext, useEffect, useState } from "react";
import "./ModalEditOrder.css";
import { UserContext } from "../../Context/Context";
import toast, { Toaster } from "react-hot-toast";
import { TrashIcon } from "@heroicons/react/24/outline";

const ModalEditOrder = ({
  orders,
  onClose,
  client,
  fetchOrdersOfClients,
  remains,
}) => {
  const [money, setMoney] = useState(Number(remains));
  const [histories, setHistories] = useState([]);
  const { sum, setSum } = useContext(UserContext);
  const token = localStorage.getItem("accessToken");
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

  const handlePaymentAmountChange = (event) => {
    setMoney(event.target.value);
  };

  const deleteClick = async (id, paidMoney) => {
    try {
      const response = await fetch(
        `https://monkfish-app-v8pst.ondigitalocean.app/api/payment-history/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSum((prev) => prev + 1);
      fetchHistories();
      fetchOrdersOfClients();
      setMoney(money + paidMoney);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const fetchHistories = async () => {
    try {
      const response = await fetch(
        `https://monkfish-app-v8pst.ondigitalocean.app/api/payment-history/?relations[0]=profile&relations[1]=order&filter[profile][id]=${client.profile.id}&sort[createdAt]=desc`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setHistories(data.data.records);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  useEffect(() => {
    fetchHistories();
  }, [sum]);

  const handleAcceptPayment = async () => {
    try {
      if (money > remains) {
        toast("Оплата превышает сумму долга!", {
          iconTheme: {
            primary: "red",
            secondary: "#fff",
          },
        });
        return;
      } else if (money <= 0) {
        toast("Сумма оплаты должна быть больше нуля!", {
          iconTheme: {
            primary: "red",
            secondary: "#fff",
          },
        });
        return;
      }
      const dataBody = {
        money: Number(money),
        profile: client.profile.id,
      };
      const response = await fetch(
        `https://monkfish-app-v8pst.ondigitalocean.app/api/payment-history`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataBody),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast("Оплата прошла успешно!");
      setSum((prev) => prev + 1);
      setMoney(0);
      fetchOrdersOfClients();
      onClose();
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <div className="modal-overlay_edit-order" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-center edit-order_modal">
          {" "}
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
          <div className="bg-white rounded-lg shadow-xl">
            <div className="overflow-x-auto conf">
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
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order.id}>
                        <td>№{order.id}</td>
                        <td>{formatDate(new Date(order.createdAt))}</td>
                        <td>{formatToRubles(order.amount)}</td>
                        <td>{formatToRubles(order.amount - order.remains)}</td>
                        <td>{formatToRubles(order.remains)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Заказов к сожалению нету
                      </td>
                    </tr>
                  )}
                  <tr className="bg-gray-200">
                    <td>
                      <strong>Итог:</strong>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{formatToRubles(remains)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex text-gray-900 mt-20 justify-center items-center">
            <label htmlFor="paymentInput" className="pr-10">
              Оплата:{" "}
            </label>
            <input
              id="paymentInput"
              type="number"
              placeholder={remains}
              value={money}
              onChange={handlePaymentAmountChange}
              className="pr-5"
              max={remains}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded pl-5"
              onClick={handleAcceptPayment}
            >
              Принять оплату
            </button>
          </div>
          <div className="overflow-x-auto kk p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                История оплаты
              </h3>
            </div>
            <div className="max-h-[500px] overflow-y-auto kk overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold">
                      Дата
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">
                      № Накладного
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">
                      Оплачен
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {histories
                    .filter((value) => value.paymentType != "debt")
                    .map((value, index) => (
                      <>
                        <tr key={value.id}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {value.createdAt}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {Number(value.order.id)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {formatToRubles(Number(value.money))}
                          </td>
                          <td>
                            <button
                              className="flex items-center justify-center px-4 py-2 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                              onClick={() => deleteClick(value.id, value.money)}
                            >
                              <TrashIcon className="w-4 h-4 mr-2" />
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ModalEditOrder;
