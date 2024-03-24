import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/Context";
import OrdersLeft from "../../Components/OrdersLeft/OrdersLeft";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbWEiLCJpZCI6NDMsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzExMjM2MTk2LCJleHAiOjE3MTEzMjI1OTZ9.hXjzpXeC3hFzC-Jg-qdmpizbdsIAIw9Gk7qsErKWw4M'

const Abacus = () => {
  const { sidebarOpen, checkedClient } = useContext(UserContext);
  const [beforeSelectedDate, setSelectedDateBefore] = useState(new Date());
  const [afterSelectedDate, setSelectedDateAfter] = useState(new Date());
  const [orders, setOrders] = useState([
    {
      id: 1,
      createdAt: '2042-03-23',
      amount: 1000
    }

  ]);

  const fetchOrdersOfClients = async () => {
    try {
      // const queryParams = new URLSearchParams(params).toString();
      const response = await fetch(
        `https://monkfish-app-v8pst.ondigitalocean.app/api/order/?relations[0]=owner&filter[owner][id]=${checkedClient}&sort[createdAt]=esc&dateFilter[startDate]=${}`,
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
      // Обработка полученных данных
      console.log(data)
      setOrders(data.data.records);
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
  console.log(checkedClient)
  useEffect(() => {
    fetchOrdersOfClients(checkedClient);
  }, [checkedClient]);
  return (
    <div className={`abacus-page ${sidebarOpen ? "p-o" : "p-c"}`}>
      <h3 className="products_title mb-10">Счеты</h3>
      <div className="flex gap-x-12">
        <OrdersLeft />
        <div className="right-abacus">
          <div className="abacus-info">
            <span>Клиент:</span>
            <span>{"{ Имя клиента}"}</span>
          </div>
          <div className="abacus-info">
            <span>Телефон:</span>
            <span>{"{+7 321 323 42 42}"}</span>
          </div>
          <div className="abacus-info">
            <span>Сумма заказов:</span>
            <span>{"{сумма}"}</span>
          </div>
          <div className="abacus-info">
            <span>Кол-во заказов:</span>
            <span>{"{кол-во}"}</span>
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
          </tr>
        </thead>
        <tbody>
          {orders.length != 0 ? (
            orders.map((order) => {
              return (
                <tr>
                  <td>{order.id}</td>
                  <td>{formatDate(new Date(order.createdAt))}</td>
                  <td>{formatToRubles(order.amount)}</td>
                  <td></td>
                  <td></td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>Заказов к сожалению нету</td>
            </tr>
          )}
        </tbody>
      </table>
        </div>
      </div>
    </div>
  );
};

export default Abacus;
