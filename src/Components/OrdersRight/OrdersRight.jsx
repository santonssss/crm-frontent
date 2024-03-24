import React, { useContext, useState } from "react";
import "./OrdersRight.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import { UserContext } from "../../Context/Context";
const OrdersRight = ({ setAddOrderOpen }) => {
  const [beforeSelectedDate, setSelectedDateBefore] = useState(new Date());
  const [afterSelectedDate, setSelectedDateAfter] = useState(new Date());
  const handleDateChangeBefore = (date) => {
    setSelectedDateBefore(date);
  };
  const handleDateChangeAfter = (date) => {
    setSelectedDateAfter(date);
  };
  const formatToRubles = (value) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    }).format(value);
  };
  const { orders } = useContext(UserContext);
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
          {orders.length ? (
            orders.map((order) => {
              return (
                <tr>
                  <td>№{order.id}</td>
                  <td>{formatDate(new Date(order.createdAt))}</td>
                  <td>{formatToRubles(order.amount)}</td>
                  <td></td>
                  <td></td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>Заказов этого клиента к сожалению нету</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersRight;
