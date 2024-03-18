import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/Context";
import OrdersLeft from "../../Components/OrdersLeft/OrdersLeft";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
const Abacus = () => {
  const { sidebarOpen } = useContext(UserContext);
  const [beforeSelectedDate, setSelectedDateBefore] = useState(new Date());
  const [afterSelectedDate, setSelectedDateAfter] = useState(new Date());
  const handleDateChangeBefore = (date) => {
    setSelectedDateBefore(date);
  };
  const handleDateChangeAfter = (date) => {
    setSelectedDateAfter(date);
  };
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
        </div>
      </div>
    </div>
  );
};

export default Abacus;
