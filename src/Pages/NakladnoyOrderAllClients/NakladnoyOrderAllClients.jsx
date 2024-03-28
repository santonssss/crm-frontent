import React, { useContext, useEffect } from "react";
import { UserContext } from "../../Context/Context";
import "./NakladnoyOrderAllClients.css";

const NakladnoyOrderAllClients = () => {
  const { checkedDelivery } = useContext(UserContext);
  const today = new Date().toLocaleDateString();
  if (
    !checkedDelivery ||
    !Array.isArray(checkedDelivery.clientsAsDeliveryman)
  ) {
    return <div>Нет данных</div>;
  }
  return (
    <div className="allClient">
      <button
        className="nakladnoy"
        onClick={() => {
          window.print();
          const style = document.createElement("style");
          style.innerHTML = `@page { size: landscape; }`;
          document.head.appendChild(style);
        }}
      >
        Напечатать накладную
      </button>
      {checkedDelivery.clientsAsDeliveryman.map((client, index) => {
        const filteredOrders = client.ordersAsClient.filter((order) => {
          const orderDate = new Date(order.createdAt).toLocaleDateString();
          return orderDate === today;
        });

        filteredOrders.sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });

        return (
          <div key={index} className="client-wrapper-nakladnoy">
            <div>
              <strong>Продавец:</strong> {checkedDelivery.username}
            </div>
            <div>
              <strong>Покупатель:</strong> {client.username}
            </div>
            <div>
              <strong>Дата:</strong> {new Date().toLocaleDateString()}
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
                {filteredOrders.map((order, orderIndex) => (
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
                    ))}{" "}
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
          </div>
        );
      })}
    </div>
  );
};

export default NakladnoyOrderAllClients;
