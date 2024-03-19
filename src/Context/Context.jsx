import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalProfileOpen, setModalProfileOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [addProductsOpen, setAddProductsOpen] = useState(false);
  const [addClientsOpen, setAddClientsOpen] = useState(false);
  const [addDeliveryOpen, setAddDeliveryOpen] = useState(false);
  const [deliveryData, setDeliveryData] = useState([]);
  const [deliveryId, setDeliveryId] = useState(false);
  const [deliverysClients, setDeliveryClients] = useState([]);
  const [checkedDelivery, setCheckedDelivery] = useState({});
  const [idDelete, setIdDelete] = useState();
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://monkfish-app-v8pst.ondigitalocean.app/api/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDeliveryData(data.data.records);
      } catch (error) {
        console.warn(error);
      }
    };
    const fetchDeliveriesClients = async () => {
      try {
        const response = await fetch(
          `https://monkfish-app-v8pst.ondigitalocean.app/api/user/${deliveryId}?relations[0]=clientsAsDeliveryman`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDeliveryClients(data.data.clientsAsDeliveryman);
      } catch (error) {
        console.warn(error);
      }
    };
    if (deliveryId) {
      fetchDeliveriesClients();
    }
    fetchUserData();
  }, [deliveryId]);

  return (
    <UserContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        modalProfileOpen,
        setModalProfileOpen,
        logoutOpen,
        setLogoutOpen,
        deliveryOpen,
        setDeliveryOpen,
        addProductsOpen,
        setAddProductsOpen,
        addClientsOpen,
        setAddClientsOpen,
        addDeliveryOpen,
        setAddDeliveryOpen,
        deliveryData,
        deliveryId,
        setDeliveryId,
        deliverysClients,
        checkedDelivery,
        setCheckedDelivery,
        deleteOpen,
        setDeleteOpen,
        idDelete,
        setIdDelete,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
