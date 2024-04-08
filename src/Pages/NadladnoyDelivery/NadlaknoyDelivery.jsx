import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NadladnoyDelivery.css";
import { UserContext } from "../../Context/Context";
const NadlaknoyDelivery = () => {
  const { atTheMom } = useContext(UserContext);
  const totalDebts = atTheMom.clientsAsDeliveryman.reduce(
    (accumulator, client) => {
      if (client.profile && typeof client.profile.debts === "number") {
        return accumulator + client.profile.debts;
      } else {
        return accumulator;
      }
    },
    0
  );
  return (
    <div className="nakladnoyy">
      <Link to={"/"}>Назад</Link>
      <div className="nakladnoyy-content">
        <span>
          Доставщик: <strong>{atTheMom.username}</strong>
        </span>
        <span>
          Клиентов: <strong>10</strong>
        </span>
        <span>
          Долги: <strong>{totalDebts} ₽</strong>
        </span>
        <div className="table-deli">
          <table
            className="nakladnoy-delivery-table"
            style={{
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid black ",
                    padding: "10px 15px",
                  }}
                >
                  Клиент
                </th>
                <th
                  style={{
                    border: "1px solid black ",
                    padding: "10px 15px",
                  }}
                >
                  Сумма
                </th>
                <th
                  style={{
                    border: "1px solid black ",
                    padding: "10px 15px",
                  }}
                >
                  Долг
                </th>
              </tr>
            </thead>
            <tbody>
              {atTheMom.clientsAsDeliveryman.map((client) => {
                let sum = 0;
                client.profile.paymentHistories.map((client) => {
                  if (client.paymentType == "debt") {
                    sum += client.money;
                  }
                });
                return (
                  <tr>
                    <td
                      style={{
                        border: "1px solid black ",
                        padding: "10px 15px",
                      }}
                    >
                      {client.username}
                    </td>

                    <td
                      style={{
                        border: "1px solid black ",
                        padding: "10px 15px",
                      }}
                    >
                      {sum} ₽
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "10px 15px",
                      }}
                    >
                      {client.profile.debts} ₽
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
        </div>
      </div>
    </div>
  );
};

export default NadlaknoyDelivery;
