import React, { useContext, useEffect, useState } from "react";
import "./OrdersRight.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import { UserContext } from "../../Context/Context";
const OrdersRight = ({ setAddOrderOpen }) => {
  const { orders } = useContext(UserContext);
  const [sortedOrders, setSortedOrders] = useState([]);

  useEffect(() => {
    const sortOrdersByDate = (orders) => {
      return orders.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA - dateB;
      });
    };

    const sorted = sortOrdersByDate(orders);
    setSortedOrders(sorted);
  }, [orders]);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const [beforeSelectedDate, setBeforeSelectedDate] = useState(yesterday);
  const [afterSelectedDate, setAfterSelectedDate] = useState(new Date());
  const handleDateChangeBefore = (date) => {
    setBeforeSelectedDate(date);
    filterOrders(date, afterSelectedDate);
  };

  const handleDateChangeAfter = (date) => {
    setAfterSelectedDate(date);
    filterOrders(beforeSelectedDate, date);
  };

  const filterOrders = (beforeDate, afterDate) => {
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= beforeDate && orderDate <= afterDate;
    });
    setSortedOrders(filtered);
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
  return (
    <div className="orders-right">
      <div className="right-btns">
        <button
          className="right-btn"
          onClick={() => {
            setAddOrderOpen(true);
          }}
        >
          Создать <br />
          накладную <span>+</span>
        </button>
        <button className="right-btn">Печать</button>
      </div>
      <table className="order-table">
        <thead>
          <tr>
            <th>№ Накладного</th>
            <th>Дата</th>
            <th>Сумма</th>
            <th>Оплачено</th>
            <th>Долги</th>
            <th>
              от
              <DatePicker
                selected={beforeSelectedDate}
                onChange={handleDateChangeBefore}
                dateFormat="dd.MM.yyyy"
                className="custom-datepicker"
                locale={ru}
              />
            </th>
            <th>
              до
              <DatePicker
                selected={afterSelectedDate}
                onChange={handleDateChangeAfter}
                dateFormat="dd.MM.yyyy"
                className="custom-datepicker"
                locale={ru}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.length ? (
            sortedOrders.map((order) => (
              <tr key={order.id}>
                <td>№{order.id}</td>
                <td>{formatDate(new Date(order.createdAt))}</td>
                <td>{formatToRubles(order.amount)}</td>
                <td></td>
                <td></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Заказов этого клиента к сожалению нету</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersRight;
