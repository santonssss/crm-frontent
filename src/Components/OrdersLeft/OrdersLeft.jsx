import React, { useContext, useState } from "react";
import "./OrdersLeft.css";
import { UserContext } from "../../Context/Context";
const OrdersLeft = () => {
  const {
    deliveryData,
    setDeliveryId,
    deliverysClients,
    setCheckedDelivery,
    checkedDelivery,
    checkedClient,
    setCheckedClient,
  } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const role = localStorage.getItem("role");
  const optomId = localStorage.getItem("idOptom");
  const deliveryMen =
    role === "optometrist"
      ? deliveryData.filter(
          (user) => user.role === "optometrist" && user.id === Number(optomId)
        )
      : deliveryData.filter(
          (user) => user.role === "deliveryman" || user.role === "optometrist"
        );
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredDeliveryMen = deliveryMen.filter((delivery) =>
    delivery.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSelectChange = (e) => {
    const selectedDeliveryId = parseInt(e.target.value, 10);
    setDeliveryId(selectedDeliveryId);
    const selectedDelivery = deliveryMen.find(
      (delivery) => delivery.id === selectedDeliveryId
    );
    setCheckedDelivery(selectedDelivery);
  };
  const filteredClients = deliverysClients.filter((client) =>
    client.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="orders-left">
      <div className="left-input">
        <input type="text" placeholder="Поиск" onChange={handleInputChange} />
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.9167 20.5833C16.7031 20.5833 20.5833 16.7031 20.5833 11.9167C20.5833 7.1302 16.7031 3.25 11.9167 3.25C7.1302 3.25 3.25 7.1302 3.25 11.9167C3.25 16.7031 7.1302 20.5833 11.9167 20.5833Z"
            stroke="#656565"
            stroke-width="2.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22.7501 22.75L18.0918 18.0917"
            stroke="#656565"
            stroke-width="2.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className="delivery-list">
        <select className="list-title" onChange={handleSelectChange}>
          <option
            value=""
            style={{
              display: "none",
            }}
          >
            Доставщики
          </option>
          {filteredDeliveryMen.map((delivery) => (
            <option key={delivery.id} value={delivery.id}>
              {delivery.username}
            </option>
          ))}
        </select>
        <div className="list-body">
          {filteredClients.length > 0 ? (
            filteredClients.map((client, index) => (
              <div
                className="list-name"
                key={index}
                onClick={() => {
                  setCheckedClient(client.id);
                }}
              >
                {client.username}
              </div>
            ))
          ) : (
            <div>Нет клиентов</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersLeft;
