import React, { useState } from "react";
import "./ModalChangeDelivary.css";
import toast, { Toaster } from "react-hot-toast";
const ModalChangeDelivary = ({
  deliveryChange,
  setUsername,
  username,
  phone,
  setPhone,
  carNumber,
  setCarNumber,
  setModalChange,
}) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    const token = localStorage.getItem("accessToken");
    e.preventDefault();
    setLoading(true);

    try {
      const updatedData = {};

      if (username.trim() !== "") {
        updatedData.username = username;
      }

      if (phone.trim() !== "") {
        updatedData.phone = phone;
      }

      if (deliveryChange.role === "client") {
        if (carNumber.trim() !== "") {
          updatedData.address = carNumber;
        }
      } else {
        if (carNumber.trim() !== "") {
          updatedData.carNumber = carNumber;
        }
      }

      if (Object.keys(updatedData).length === 0) {
        toast("Нет изменений для сохранения");
        return;
      }
      const response = await fetch(
        `https://monkfish-app-v8pst.ondigitalocean.app/api/user/${deliveryChange.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Ошибка при обновлении данных пользователя");
      }
      toast("Редактирование прошло успешно");
      setModalChange(false);
      setUsername("");
      setPhone("");
      setCarNumber("");
    } catch (error) {
      toast(
        "В редактирование произошла ошибка, пожалуйста перепроверьте данные!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="modal_change" onClick={() => setModalChange(false)}>
      <div
        className="modal-content_change"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="close" onClick={() => setModalChange(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 1 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 1.414-1.414L12 10.586z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder={deliveryChange.username}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder={
            deliveryChange.role === "client"
              ? deliveryChange.address
              : deliveryChange.carNumber
          }
          value={carNumber}
          onChange={(e) => setCarNumber(e.target.value)}
        />

        <input
          type="text"
          placeholder={deliveryChange.phone}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Загрузка..." : "Редактировать"}
        </button>
      </div>
      <Toaster />
    </form>
  );
};

export default ModalChangeDelivary;
