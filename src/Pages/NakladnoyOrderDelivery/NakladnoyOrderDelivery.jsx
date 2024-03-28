import React, { useContext } from "react";
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

  // Считаем общее количество каждого продукта
  const productQuantities = {};
  filteredOrders.forEach((order) => {
    order.baskets.forEach((basket) => {
      const productId = basket.product.id; // Убедитесь, что это правильный путь к ID продукта
      if (!productQuantities[productId]) {
        productQuantities[productId] = 0;
      }
      productQuantities[productId] += basket.quantity;
    });
  });

  const totalAmount = filteredOrders.reduce(
    (total, order) => total + order.amount,
    0
  );

  return (
    <div className="order-naklad">
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
            {products.map((product) => (
              <th key={product.id}>{product.name}</th>
            ))}
            <th>Сумма</th>
            <th>Платил</th>
            <th>Долг</th>
            <th>Оплата</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={order.id}>
              <td>
                {index + 1}. {order.clientName}
              </td>
              {products.map((product) => {
                const productOrders = order.baskets
                  .filter((basket) => basket.product.id === product.id)
                  .map((basket) => `${basket.quantity} к/ш (${basket.summa} ₽)`)
                  .join(", ");
                return <td key={product.id}>{productOrders || "—"}</td>;
              })}
              <td>{order.amount} ₽</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
          <tr>
            <td colSpan={products.length + 4}>Всего {totalAmount} ₽</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NakladnoyOrderDelivery;
