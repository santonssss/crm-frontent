import React, { useState } from "react";
import "./OrdersRight.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
const OrdersRight = () => {
  const [beforeSelectedDate, setSelectedDateBefore] = useState(new Date());
  const [afterSelectedDate, setSelectedDateAfter] = useState(new Date());
  const handleDateChangeBefore = (date) => {
    setSelectedDateBefore(date);
  };
  const handleDateChangeAfter = (date) => {
    setSelectedDateAfter(date);
  };
  return (
    <div className="orders-right">
      <div className="right-btns">
        <button className="right-btn">
          Создать <br />
          накладную <span>+</span>
        </button>
        <button className="right-print-btn">Печать</button>
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
          <tr>
            <td>123</td>
            <td>10,000</td>
            <td>06.02.2024</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>123</td>
            <td>10,000</td>
            <td>06.02.2024</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>123</td>
            <td>10,000</td>
            <td>06.02.2024</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrdersRight;
