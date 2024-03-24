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
  const [products, setProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState("");
  const [orders, setOrders] = useState([]);
  const [chechedClient, setCheckedClient] = useState(null);
  const [clientForDelivary, setClientForDelivary] = useState([]);
  const [devId, setDevId] = useState(null);
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const requestOptions = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch(
          `https://monkfish-app-v8pst.ondigitalocean.app/api/order?relations[0]=owner&filter[owner][id]=${chechedClient}`,
          requestOptions
        );
        if (response.ok) {
          const data = await response.json();
          setOrders(data.data.records);
        } else {
          console.error(
            "Ошибка при загрузке данных о заказах:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Произошла ошибка:", error);
      }
    };

    const fetchDataProducts = async () => {
      try {
        const response = await fetch(
          "https://monkfish-app-v8pst.ondigitalocean.app/api/product?relations[0]=image",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProducts(data.data.records);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://monkfish-app-v8pst.ondigitalocean.app/api/user?relations[0]=clientsAsDeliveryman.profile&filter[role]=deliveryman",
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
          `https://monkfish-app-v8pst.ondigitalocean.app/api/user/${deliveryId}?relations[0]=clientsAsDeliveryman.profile`,
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
        console.log(data);
        setDeliveryClients(data.data.clientsAsDeliveryman);
      } catch (error) {
        console.warn(error);
      }
    };
    const fetchHomeDeliveryClient = async () => {
      try {
        const response = await fetch(
          `https://monkfish-app-v8pst.ondigitalocean.app/api/user/${devId}?relations[0]=clientsAsDeliveryman&relations[1]=profile`,
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
        setClientForDelivary(data.data.clientsAsDeliveryman);
      } catch (error) {
        console.warn(error);
      }
    };
    if (deliveryId) {
      fetchDeliveriesClients();
    }
    if (devId) {
      fetchHomeDeliveryClient();
    }
    if (chechedClient !== null) {
      fetchOrders();
    }
    fetchUserData();
    fetchDataProducts();
  }, [deliveryId, token, chechedClient, devId]);

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
        products,
        setProducts,
        searchProducts,
        setSearchProducts,
        orders,
        setOrders,
        chechedClient,
        setCheckedClient,
        setDevId,
        clientForDelivary,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
