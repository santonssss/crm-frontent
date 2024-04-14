import React, { useContext, useEffect } from "react";
import { UserContext } from "../../Context/Context";
import "./MobileModalDelivery.css";
import { Link } from "react-router-dom";

const MobileModalDelivery = ({
  setTheMod,
  atTheMomentDelivery,
  setAtTheMomentClient,
  setOpenHistory,
}) => {
  const { setDeliveryOpen, clientForDelivary, setAtTheMom } =
    useContext(UserContext);
  const totalDebts = atTheMomentDelivery.clientsAsDeliveryman
    ? atTheMomentDelivery.clientsAsDeliveryman.reduce((accumulator, client) => {
        return (
          accumulator +
          (client.profile && typeof client.profile.debts === "number"
            ? client.profile.debts
            : 0)
        );
      }, 0)
    : 0;

  const formatToRubles = (value) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    }).format(value);
  };

  useEffect(() => {
    setAtTheMom(atTheMomentDelivery);
  }, [atTheMomentDelivery]);

  return (
    <div className="mobile-modal-overlay">
      <div className="mobile-modal">
        <div className="mobile-close" onClick={() => setTheMod(false)}>
          &times;
        </div>
        <div className="mobile-info">
          <h2>{atTheMomentDelivery.username}</h2>
          <p>{atTheMomentDelivery.clientsAsDeliveryman.length} клиентов</p>
          <p>Долги: {formatToRubles(totalDebts)}</p>
        </div>
        <div className="mobile-client-list">
          {atTheMomentDelivery.clientsAsDeliveryman.map((client) => {
            const totalDebtForClient = client.profile.paymentHistories.reduce(
              (total, payment) => {
                return (
                  total + (payment.paymentType === "debt" ? payment.money : 0)
                );
              },
              0
            );

            return (
              <div
                className="mobile-client-card"
                onClick={() => {
                  setAtTheMomentClient(client);
                  setOpenHistory(true);
                }}
              >
                <h3>{client.username}</h3>
                <p>Сумма: {formatToRubles(totalDebtForClient)}</p>
                <p>Долг: {formatToRubles(client.profile.debts)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileModalDelivery;
