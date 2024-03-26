import React, { useContext, useEffect } from "react";
import "./ModalDelivery.css";
import { UserContext } from "../../Context/Context";
import { Link } from "react-router-dom";

const ModalDelivery = ({ atTheMomentDelivery }) => {
  const { setDeliveryOpen, clientForDelivary, setAtTheMom } =
    useContext(UserContext);
  const totalDebts = atTheMomentDelivery.clientsAsDeliveryman.reduce(
    (accumulator, client) => {
      if (client.profile && typeof client.profile.debts === "number") {
        return accumulator + client.profile.debts;
      } else {
        return accumulator;
      }
    },
    0
  );
  useEffect(() => {
    setAtTheMom(atTheMomentDelivery);
  }, [atTheMomentDelivery]);
  return (
    <div className="modal-overlay_del">
      <div className="modal_del">
        <div
          className="close_del"
          onClick={() => {
            setDeliveryOpen(false);
          }}
        >
          <svg
            width="39"
            height="39"
            viewBox="0 0 39 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 12L28.25 28.25M12 28.25L28.25 12"
              stroke="black"
              stroke-width="2.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className="info_del">
          <div className="info-card">
            <svg
              width="43"
              height="43"
              viewBox="0 0 43 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.1665 31.1462C7.1665 29.2454 7.92156 27.4226 9.26557 26.0786C10.6096 24.7345 12.4325 23.9795 14.3332 23.9795H28.6665C30.5672 23.9795 32.3901 24.7345 33.7341 26.0786C35.0781 27.4226 35.8332 29.2454 35.8332 31.1462C35.8332 32.0965 35.4556 33.008 34.7836 33.68C34.1116 34.352 33.2002 34.7295 32.2498 34.7295H10.7498C9.79948 34.7295 8.88804 34.352 8.21604 33.68C7.54403 33.008 7.1665 32.0965 7.1665 31.1462Z"
                stroke="#1E89EC"
                stroke-width="2.46"
                stroke-linejoin="round"
              />
              <path
                d="M21.5 19.75C24.4685 19.75 26.875 17.3435 26.875 14.375C26.875 11.4065 24.4685 9 21.5 9C18.5315 9 16.125 11.4065 16.125 14.375C16.125 17.3435 18.5315 19.75 21.5 19.75Z"
                stroke="#1E89EC"
                stroke-width="2.46"
              />
            </svg>
            <span>{atTheMomentDelivery.username}</span>
          </div>
          <div className="info-card">
            <span className="sum-info">{clientForDelivary.length}</span>
            <span>клиентов</span>
          </div>
          <div className="info-card">
            <span className="sum-info">{totalDebts} ₽</span>
            <span>Долги</span>
          </div>
        </div>
        <div className="table-deli">
          <table>
            <thead>
              <tr>
                <th>Клиент</th>
                <th>Телефон</th>
                <th>Сумма</th>
                <th>Долг</th>
              </tr>
            </thead>
            <tbody>
              {atTheMomentDelivery.clientsAsDeliveryman.map((client) => {
                console.log(client);
                return (
                  <tr>
                    <td>{client.username}</td>
                    <td>{client.phone}</td>
                    <td>100455</td>
                    <td>{client.profile.debts}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button className="nakladnoy">
          <Link
            to={"/nakladnoy-delivery"}
            onClick={() => {
              setDeliveryOpen(false);
            }}
          >
            Напечатать накладную
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ModalDelivery;
