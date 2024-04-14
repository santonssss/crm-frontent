import React from "react";
import "./MobileModalClientHistory.css";

const MobileModalClientHistory = ({ setOpenHistory, atTheMomentClient }) => {
  const formatToRubles = (value) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    }).format(value);
  };

  return (
    <div className="mobile-modal-overlay" onClick={() => setOpenHistory(false)}>
      <div className="mobile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-close" onClick={() => setOpenHistory(false)}>
          &times;
        </div>
        <div className="mobile-datas-client">
          <div className="mobile-data">
            <span>Имя:</span> <strong>{atTheMomentClient.username}</strong>
          </div>
          <div className="mobile-data">
            <span>Адрес:</span> <strong>{atTheMomentClient.address}</strong>
          </div>
        </div>
        <div className="mobile-payment-history">
          <table>
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
                      <td>
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </td>
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
    </div>
  );
};

export default MobileModalClientHistory;
