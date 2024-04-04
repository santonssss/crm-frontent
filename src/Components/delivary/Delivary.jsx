import React, { useContext } from "react";
import "./Delivary.css";
import { UserContext } from "../../Context/Context";
import { TailSpin } from "react-loader-spinner";

const Delivary = ({ setTheMomentDelivery }) => {
  const { setDeliveryOpen, deliveryData, setDevId } = useContext(UserContext);
  const role = localStorage.getItem("role");
  const optomId = localStorage.getItem("idOptom");

  // Фильтрация доставщиков в зависимости от роли
  const deliveryMen = deliveryData.filter((user) => {
    if (role === "optometrist") {
      return user.role === "optometrist" && user.id === Number(optomId);
    } else {
      // Отображение всех доставщиков для не оптомщика
      return user.role === "deliveryman" || user.role === "optometrist";
    }
  });

  return (
    <section className="delivary">
      <table>
        <caption>Доставщики</caption>
        <thead>
          <tr>
            <th>Доставщик</th>
            <th>Кол-во клиентов</th>
            <th>Долги</th>
          </tr>
        </thead>
        <tbody>
          {deliveryMen.length > 0 ? (
            deliveryMen.map((delivery) => {
              const totalDebts = delivery.clientsAsDeliveryman.reduce(
                (accumulator, client) => accumulator + client.profile.debts,
                0
              );
              const formatter = new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: "RUB",
              });
              const formattedTotalDebts = formatter.format(totalDebts);
              return (
                <tr
                  onClick={() => {
                    setDeliveryOpen(true);
                    setTheMomentDelivery(delivery);
                    setDevId(delivery.id);
                  }}
                  key={delivery.id}
                >
                  <td>{delivery.username}</td>
                  <td>{delivery.clientsAsDeliveryman.length}</td>
                  <td>{formattedTotalDebts}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <TailSpin radius={"2px"} width={30} height={30} />
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Delivary;
