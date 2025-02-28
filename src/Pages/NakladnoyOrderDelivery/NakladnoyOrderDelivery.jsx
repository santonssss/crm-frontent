import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/Context";
import "./NakladnoyOrderDelivery.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";

const NakladnoyOrderDelivery = () => {
  const { checkedDelivery, products } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const currentDate = selectedDate;
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
  filteredOrders.forEach((order) => {
    order.baskets.forEach((basket) => {
      const productId = basket.product.id;
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
        }}
      >
        Напечатать накладную
      </button>
      <div className="flex items-center justify-center">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd.MM.yyyy"
          className="custom-datepicker bg-blue-500 rounded-sm mt-5 cursor-pointer"
          locale={ru}
        />
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
                  .map((basket) => `${basket.quantity} к/ш `)
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
            <td colSpan={products.length + 4}>
              Всего{" "}
              <strong
                style={{
                  textDecoration: "underline",
                }}
              >
                {totalAmount} ₽
              </strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NakladnoyOrderDelivery;
