import React from "react";
import "./Delivary.css";
const Delivary = () => {
  return (
    <section className="delivary">
      <table>
        <caption>Доставщики</caption>
        <tr>
          <th>Доставщик</th>
          <th>Кол-во клиентов</th>
          <th>Долги</th>
        </tr>
        <tr>
          <td>Вася Александров </td>
          <td>10</td>
          <td>100000</td>
        </tr>
        <tr>
          <td>Вася Александров </td>
          <td>10</td>
          <td>100000</td>
        </tr>
        <tr>
          <td>Вася Александров </td>
          <td>10</td>
          <td>100000</td>
        </tr>
      </table>
    </section>
  );
};

export default Delivary;
