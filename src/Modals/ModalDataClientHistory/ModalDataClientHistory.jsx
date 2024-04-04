import React from "react";
import "./ModalDataClientHistory.css";

const ModalDataClientHistory = ({ setOpenHistory, atTheMomentClient }) => {
  const formatToRubles = (value) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    }).format(value);
  };
  return (
    <div
      className="modal-overlay_clientHistory"
      onClick={() => {
        setOpenHistory(false);
      }}
    >
      <div className="modal_clientHistory" onClick={(e) => e.stopPropagation()}>
        <div
          className="close_clientHistory"
          onClick={() => setOpenHistory(false)}
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
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          className="datas-client"
          style={{
            marginBottom: "30px",
          }}
        >
          <div className="data_cl">
            <span>Имя:</span> <strong>{atTheMomentClient.username}</strong>
          </div>
          <div className="data_cl">
            <span>Телефон:</span> <strong>{atTheMomentClient.phone}</strong>
          </div>
          <div className="data_cl">
            <span>Адресс:</span> <strong>{atTheMomentClient.address}</strong>
          </div>
        </div>
        <table className="payment-history-table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Сумма</th>
              <th>Тип платежа</th>
            </tr>
          </thead>
          <tbody>
            {atTheMomentClient &&
              atTheMomentClient.profile &&
              atTheMomentClient.profile.paymentHistories &&
              atTheMomentClient.profile.paymentHistories
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((payment) => (
                  <tr key={payment.id}>
                    <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                    <td>{formatToRubles(payment.money)}</td>
                    <td>
                      {payment.paymentType === "debt"
                        ? "Долг"
                        : "Частичный платеж"}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModalDataClientHistory;
