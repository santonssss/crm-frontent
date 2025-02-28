import React, { useContext, useState } from "react";
import "./ModalAddClients.css";
import { UserContext } from "../../Context/Context";
import { TailSpin } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

const ModalAddClients = () => {
  const { setAddClientsOpen, setSum } = useContext(UserContext);
  const [username, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [deliverymanAsClient, setDeliverymanAsClient] = useState("");
  const { deliveryData } = useContext(UserContext);
  const deliveryMen = deliveryData.filter(
    (user) => user.role === "deliveryman" || user.role === "optometrist"
  );

  const roleValid = localStorage.getItem("role");
  const optomId = localStorage.getItem("idOptom");
  const handleSubmit = async (event) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    event.preventDefault();
    const role = "client";
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
            address,
            deliverymanAsClient:
              roleValid === "optometrist" ? optomId : deliverymanAsClient,
            role,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      toast("Пользователь добавлен успешно");
      setName("");
      setAddress("");
      setSum((prev) => prev + 1);
    } catch (error) {
      toast(
        "Не удалось добавить пользователя, пожалуйста перепроверьте данные"
      );
      console.error("Ошибка при выполнении запроса:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-clients" onClick={() => setAddClientsOpen(false)}>
      <form
        className="add-clients_modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={handleSubmit}
      >
        <div>
          <span>Имя клиента</span>
          <input
            type="text"
            placeholder="Имя"
            value={username}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <span>Адрес</span>
          <input
            type="text"
            placeholder="Адрес"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          {roleValid === "optometrist" ? null : <span>Доставщик</span>}
          {roleValid === "optometrist" ? null : (
            <select
              value={deliverymanAsClient}
              onChange={(e) => setDeliverymanAsClient(e.target.value)}
            >
              <option value="">Выберите доставщика</option>
              {deliveryMen.map((delivery) => (
                <option key={delivery.id} value={delivery.id}>
                  {delivery.username}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="add_btns">
          <button type="submit">
            {!loading ? (
              "Добавить"
            ) : (
              <TailSpin radius={"2px"} width={30} height={30} />
            )}
          </button>
          <button type="button" onClick={() => setAddClientsOpen(false)}>
            Отменить
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default ModalAddClients;
