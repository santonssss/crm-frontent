import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/Context";
import "./NakladnoyOrderDelivery.css";

const NakladnoyOrderDelivery = () => {
  const { checkedDelivery, products } = useContext(UserContext);
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;

  let filteredOrders = [];
  if (
    checkedDelivery.clientsAsDeliveryman &&
    Array.isArray(checkedDelivery.clientsAsDeliveryman)
  ) {
    filteredOrders = checkedDelivery.clientsAsDeliveryman
      .flatMap((client) =>
        client.ordersAsClient.map((order) => ({
          ...order,
          clientName: client.username,
        }))
      )
      .filter((order) => {
        const orderDate = new Date(order.createdAt);
        return (
          orderDate.getDate() === currentDate.getDate() &&
          orderDate.getMonth() === currentDate.getMonth() &&
          orderDate.getFullYear() === currentDate.getFullYear()
        );
      });
  }

  const productQuantities = {};
  products.forEach((product) => {
    productQuantities[product.id] = 0;
  });

  filteredOrders.forEach((order) => {
    order.baskets.forEach((basket) => {
      productQuantities[basket.productId] += basket.quantity;
    });
  });
  const totalAmount = filteredOrders.reduce(
    (total, order) => total + order.amount,
    0
  );
  return (
    <div className="order-naklad">
      <div>
        <strong
          style={{
            textDecoration: "underline",
          }}
        >
          {formattedDate}
        </strong>
      </div>
      <div>
        <strong>{checkedDelivery.username}</strong>
      </div>
      <table className="order-table-3">
        <thead>
          <tr>
            <th>№ Имя</th>
            {products.map((product) => {
              return <th>{product.name}</th>;
            })}
            <th>Сумма</th>
            <th>Платил</th>
            <th>Долг</th>
            <th>Оплата</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => {
            console.log(order);
            return (
              <tr key={order.id}>
                <td>
                  {index + 1} {order.clientName}
                </td>
                {products.map((product) => (
                  <td key={product.id}>
                    {order.baskets.find(
                      (basket) => basket.product.id === product.id
                    )
                      ? order.baskets.find(
                          (basket) => basket.product.id === product.id
                        ).quantity
                      : 0}{" "}
                    кг/шт
                  </td>
                ))}
                <td>{order.amount} ₽</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            );
          })}
          <tr>
            {products.map((prod) => {
              return <td key={prod.id}></td>;
            })}
            <td></td>
            <td>Всего {totalAmount} ₽</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NakladnoyOrderDelivery;
