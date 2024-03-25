import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/Context";
import OrdersLeft from "../../Components/OrdersLeft/OrdersLeft";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import ModalEditOrder from "../../Modals/ModalEditOrder/ModalEditOrder";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbWEiLCJpZCI6NDMsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzExMjM2MTk2LCJleHAiOjE3MTEzMjI1OTZ9.hXjzpXeC3hFzC-Jg-qdmpizbdsIAIw9Gk7qsErKWw4M";

const Abacus = () => {
  const { sidebarOpen, checkedClient } = useContext(UserContext);
  const [beforeSelectedDate, setSelectedDateBefore] = useState(new Date());
  const [afterSelectedDate, setSelectedDateAfter] = useState(new Date());
  const [orders, setOrders] = useState([]);
  const [client, setClient] = useState({});
  const [paid, setPaid] = useState(0);
  const [remains, setRemains] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleEditClick = (order) => {
    setSelectedOrder(order);
  };

  const fetchOrdersOfClients = async () => {
    try {
      const response = await fetch(
        `https://monkfish-app-v8pst.ondigitalocean.app/api/order/?relations[0]=owner&relations[1]=paymentHistories&filter[owner][id]=${checkedClient}`,
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
      let sumPaid = 0;
      let sumRemains = 0;
      data.data.records.map((value, index) => {
        sumRemains += Number(value.remains);
        sumPaid += Number(value.amount - value.remains);
      });
      setPaid(sumPaid);
      setRemains(sumRemains);
      setOrders(data.data.records);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const fetchUser = async () => {
    try {
      // const queryParams = new URLSearchParams(params).toString();
      const response = await fetch(
        `https://monkfish-app-v8pst.ondigitalocean.app/api/user/${checkedClient}?relations[0]=ordersAsClient`,
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
      console.log(data);
      const sizeOrders = data.data.ordersAsClient?.length;
      let summa = 0;
      data.data.ordersAsClient?.map((value, index) => {
        console.log(value.amount);
        summa += Number(value.amount);
      });
      console.log(summa);
      data.data.sizeOrders = sizeOrders;
      data.data.summa = summa;
      setClient(data.data);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

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
  const handleDateChangeBefore = (date) => {
    setSelectedDateBefore(date);
  };
  const handleDateChangeAfter = (date) => {
    setSelectedDateAfter(date);
  };
  useEffect(() => {
    fetchUser();
    fetchOrdersOfClients();
  }, [checkedClient]);
  return (
    <div className={`abacus-page ${sidebarOpen ? "p-o" : "p-c"}`}>
      <h3 className="products_title mb-10">Счеты</h3>
      <div className="flex gap-x-12">
        <OrdersLeft />
        <div className="right-abacus">
          <div className="abacus-info">
            <span>Клиент:</span>
            <span>{client.username}</span>
          </div>
          <div className="abacus-info">
            <span>Телефон:</span>
            <span>{client.phone}</span>
          </div>
          <div className="abacus-info">
            <span>Сумма заказов:</span>
            <span>{client.summa}</span>
          </div>
          <div className="abacus-info">
            <span>Кол-во заказов:</span>
            <span>{client.sizeOrders}</span>
          </div>
          <div className="date-pick">
            От
            <DatePicker
              selected={beforeSelectedDate}
              onChange={handleDateChangeBefore}
              dateFormat="dd.MM.yyyy"
              className="custom-datepicker"
              locale={ru}
            />
            До
            <DatePicker
              selected={afterSelectedDate}
              onChange={handleDateChangeAfter}
              dateFormat="dd.MM.yyyy"
              className="custom-datepicker"
              locale={ru}
            />
          </div>
          <table className="order-table">
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
              {orders.length != 0 ? (
                orders.map((order) => {
                  return (
                    <tr>
                      <td>{order.id}</td>
                      <td>{formatDate(new Date(order.createdAt))}</td>
                      <td>{formatToRubles(order.amount)}</td>
                      <td>{formatToRubles(order.amount - order.remains)}</td>
                      <td>{formatToRubles(order.remains)}</td>
                      <td>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleEditClick(order)}
                        >
                          Редактировать
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>Заказов к сожалению нету</td>
                </tr>
              )}
              <tr className="bg-gray-200">
                <td>
                  <strong>Итог:</strong>
                </td>
                <td></td>
                <td></td>
                <td>{formatToRubles(paid)}</td>
                <td>{formatToRubles(remains)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {selectedOrder && (
        <ModalEditOrder
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          // Другие пропсы, которые могут понадобиться для редактирования
        />
      )}
    </div>
  );
};

export default Abacus;
