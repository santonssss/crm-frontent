import React, { useContext } from "react";
import OrdersLeft from "../../Components/OrdersLeft/OrdersLeft";
import ClientsRight from "../../Components/ClientsRight/ClientsRight";
import { UserContext } from "../../Context/Context";
import ModalAddClients from "../../Modals/ModalAddClients/ModalAddClients";
import ModalAddDelivery from "../../Modals/ModalAddDelivery/ModalAddDelivery";

const Clients = () => {
  const { sidebarOpen, addClientsOpen, addDeliveryOpen } =
    useContext(UserContext);
  return (
    <div className={`clients-page ${sidebarOpen ? "p-o" : "p-c"}`}>
      <div className="clients">
        <h3 className="products_title ">Клиенты - Доставшики</h3>
        Клиенты: {"{все клиенты}"}
        <OrdersLeft />
      </div>
      <ClientsRight />
      {addClientsOpen && <ModalAddClients />}
      {addDeliveryOpen && <ModalAddDelivery />}
    </div>
  );
};

export default Clients;
