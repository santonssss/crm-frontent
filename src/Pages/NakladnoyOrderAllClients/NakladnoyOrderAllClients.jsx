import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/Context";
import "./NakladnoyOrderAllClients.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";

const NakladnoyOrderAllClients = () => {
  const { checkedDelivery } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedSelectedDate = selectedDate.toLocaleDateString();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  if (
    !checkedDelivery ||
    !Array.isArray(checkedDelivery.clientsAsDeliveryman)
  ) {
    return <div>Нет данных</div>;
  }

  const clientsWithOrdersOnSelectedDate =
    checkedDelivery.clientsAsDeliveryman.filter((client) =>
      client.ordersAsClient.some((order) => {
        const orderDate = new Date(order.createdAt).toLocaleDateString();
        return orderDate === formattedSelectedDate;
      })
    );

  return (
    <div className="allClient">
      <button
        className="nakladnoy"
        onClick={() => {
          window.print();
          const style = document.createElement("style");
          style.innerHTML = `@page { size: portrait; }`;
          document.head.appendChild(style);
        }}
      >
        Напечатать накладную
      </button>
      <div className="flex items-center justify-center">
        <DatePicker
          selected={selectedDate}
          dateFormat="dd.MM.yyyy"
          className="custom-datepicker bg-blue-500 rounded-sm mt-5 cursor-pointer "
          locale={ru}
          onChange={handleDateChange}
        />
      </div>
      {clientsWithOrdersOnSelectedDate.length === 0 ? (
        <div>Нет данных для выбранной даты</div>
      ) : (
        clientsWithOrdersOnSelectedDate.map((client, index) => (
          <div key={index} className="client-wrapper-nakladnoy">
            <div>
              <strong>Продавец:</strong> {checkedDelivery.username}
            </div>
            <div>
              <strong>Покупатель:</strong> {client.username}
            </div>
            <div>
              <strong>Дата:</strong> {formattedSelectedDate}
            </div>
            <table>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Наименование</th>
                  <th>Кг/Шт</th>
                  <th>Цена</th>
                  <th>Сумма</th>
                </tr>
              </thead>
              <tbody>
                {client.ordersAsClient
                  .filter(
                    (order) =>
                      new Date(order.createdAt).toLocaleDateString() ===
                      formattedSelectedDate
                  )
                  .map((order, orderIndex) => (
                    <React.Fragment key={orderIndex}>
                      {order.baskets.map((basket, basketIndex) => (
                        <tr key={basketIndex}>
                          <td>{basketIndex + 1}</td>
                          <td>{basket.product.name}</td>
                          <td>{basket.quantity}</td>
                          <td>
                            {basket.discountType === "discount1"
                              ? basket.product.discount1
                              : basket.discountType === "discount2"
                              ? basket.product.discount2
                              : basket.product.standard}
                            ₽
                          </td>
                          <td>{basket.summa}₽</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="4">
                          <strong>Общая сумма:</strong>
                        </td>
                        <td
                          style={{
                            textDecoration: "underline",
                          }}
                        >
                          <strong>
                            {" "}
                            {order.baskets.reduce(
                              (total, basket) => total + basket.summa,
                              0
                            )}
                            ₽
                          </strong>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
            <div className="two-pod">
              <span>Отпустил _______</span>
              <span>Получил _______</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NakladnoyOrderAllClients;
