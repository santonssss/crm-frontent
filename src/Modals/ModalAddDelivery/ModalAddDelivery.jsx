import React, { useContext, useState } from "react";
import "./ModalAddDelivery.css";
import { UserContext } from "../../Context/Context";

const ModalAddDelivery = () => {
  const { setAddDeliveryOpen } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [carNumber, setСarNumber] = useState("");
  const handleSubmit = async (event) => {
    const token = localStorage.getItem("accessToken");
    event.preventDefault();
    const role = "deliveryman";
    try {
      const response = await fetch(
        "https://monkfish-app-v8pst.ondigitalocean.app/api/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username,
            phone,
            carNumber,
            role,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setUsername("");
      setPhone("");
      setСarNumber("");
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };

  return (
    <div className="add-delivery" onClick={() => setAddDeliveryOpen(false)}>
      <form
        className="add-delivery_modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={handleSubmit}
      >
        <div>
          <span>Имя доставщика</span>
          <input
            type="text"
            placeholder="Имя доставщика"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <span>Телефон</span>
          <input
            type="text"
            placeholder="+7 (777) 777 77 77"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <span>Номер машины</span>
          <input
            type="text"
            placeholder="Номер машины"
            value={carNumber}
            onChange={(e) => setСarNumber(e.target.value)}
          />
        </div>

        <div className="add_btns">
          <button type="submit">Добавить</button>
          <button type="button" onClick={() => setAddDeliveryOpen(false)}>
            Отменить
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalAddDelivery;
