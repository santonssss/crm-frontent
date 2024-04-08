import React, { useContext, useState } from "react";
import OrdersLeft from "../../Components/OrdersLeft/OrdersLeft";
import ClientsRight from "../../Components/ClientsRight/ClientsRight";
import { UserContext } from "../../Context/Context";
import ModalAddClients from "../../Modals/ModalAddClients/ModalAddClients";
import ModalAddDelivery from "../../Modals/ModalAddDelivery/ModalAddDelivery";
import ModalDelete from "../../Modals/ModalDelete/ModalDelete";
import ModalChangeDelivary from "../../Modals/ModalChangeDelivary/ModalChangeDelivary";
import { Toaster } from "react-hot-toast";

const Clients = () => {
  const {
    sidebarOpen,
    addClientsOpen,
    addDeliveryOpen,
    deliverysClients,
    deleteOpen,
  } = useContext(UserContext);
  const [modalChange, setModalChange] = useState(false);
  const [deliveryChange, setDeliveryChange] = useState({});
  const [username, setUsername] = useState("");
  const [carNumber, setCarNumber] = useState("");
  return (
    <div className={`clients-page ${sidebarOpen ? "p-o" : "p-c"}`}>
      <div className="clients">
        <h3 className="products_title ">Клиенты - Доставшики</h3>
        <span
          style={{
            fontWeight: "500",
          }}
        >
          Клиенты:{"    "} {deliverysClients.length}
        </span>
        <OrdersLeft />
      </div>
      <ClientsRight
        setModalChange={setModalChange}
        setDeliveryChange={setDeliveryChange}
      />
      {addClientsOpen && <ModalAddClients />}
      {addDeliveryOpen && (
        <ModalAddDelivery
          setUsername={setUsername}
          username={username}
          carNumber={carNumber}
          setCarNumber={setCarNumber}
        />
      )}
      {deleteOpen && <ModalDelete />}
      {modalChange && (
        <ModalChangeDelivary
          deliveryChange={deliveryChange}
          setUsername={setUsername}
          username={username}
          carNumber={carNumber}
          setCarNumber={setCarNumber}
          setModalChange={setModalChange}
        />
      )}
      <Toaster />
    </div>
  );
};

export default Clients;
