import React, { useContext } from "react";
import OrdersLeft from "../../Components/OrdersLeft/OrdersLeft";
import ClientsRight from "../../Components/ClientsRight/ClientsRight";
import { UserContext } from "../../Context/Context";
import ModalAddClients from "../../Modals/ModalAddClients/ModalAddClients";
import ModalAddDelivery from "../../Modals/ModalAddDelivery/ModalAddDelivery";
import ModalDelete from "../../Modals/ModalDelete/ModalDelete";

const Clients = () => {
  const {
    sidebarOpen,
    addClientsOpen,
    addDeliveryOpen,
    deliverysClients,
    deleteOpen,
  } = useContext(UserContext);

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
      <ClientsRight />
      {addClientsOpen && <ModalAddClients />}
      {addDeliveryOpen && <ModalAddDelivery />}
      {deleteOpen && <ModalDelete />}
    </div>
  );
};

export default Clients;
