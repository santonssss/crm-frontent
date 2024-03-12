import React, { useContext } from "react";
import "./Delivary.css";
import { UserContext } from "../../Context/Context";
const Delivary = () => {
  const { setDeliveryOpen } = useContext(UserContext);
  return (
    <section className="delivary">
      <table>
        <caption>Доставщики</caption>
        <tr>
          <th>Доставщик</th>
          <th>Кол-во клиентов</th>
          <th>Долги</th>
        </tr>
        <tr
          onClick={() => {
            setDeliveryOpen(true);
          }}
        >
          <td>Вася Александров </td>
          <td>10</td>
          <td>100000</td>
        </tr>
        <tr
          onClick={() => {
            setDeliveryOpen(true);
          }}
        >
          <td>Вася Александров </td>
          <td>10</td>
          <td>100000</td>
        </tr>
        <tr
          onClick={() => {
            setDeliveryOpen(true);
          }}
        >
          <td>Вася Александров </td>
          <td>10</td>
          <td>100000</td>
        </tr>
      </table>
    </section>
  );
};

export default Delivary;
