import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
  const [checkedClient, setCheckedClient] = useState(null);
  const [clientForDelivary, setClientForDelivary] = useState([]);
  const [devId, setDevId] = useState(null);
  const [atTheMom, setAtTheMom] = useState({});
  const [sum, setSum] = useState(0);
  const nav = useNavigate();
  const token = localStorage.getItem("accessToken");
  const location = useLocation();
  const currentPath = location.pathname;

  const handleErrorResponse = (response) => {
    if (!response.ok) {
      const role = localStorage.getItem("role");
      localStorage.removeItem("accessToken");
      if (response.status === 403 && currentPath !== "/login") {
        nav("/login");
      }
      throw new Error("Network response was not ok");
    }
    return response;
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    const optomId = localStorage.getItem("idOptom");

    const fetchOrders = async () => {
      try {
        const requestOptions = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch(
          `https://monkfish-app-v8pst.ondigitalocean.app/api/order?relations[0]=owner&filter[owner][id]=${checkedClient}&relations[1]=baskets.product`,
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
        handleErrorResponse(response);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProducts(data.data.records);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    let fetchUserData = async () => {
      try {
        let apiUrl = "https://monkfish-app-v8pst.ondigitalocean.app/api/user?";
        let deliveryDataAll = [];

        if (role === "optometrist") {
          apiUrl += `filter[role]=optometrist`;
        } else {
          apiUrl += `filter[role]=deliveryman`;
        }

        apiUrl += "&relations[0]=clientsAsDeliveryman.profile.paymentHistories";
        apiUrl +=
          "&relations[1]=clientsAsDeliveryman.ordersAsClient.baskets.product";

        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        handleErrorResponse(response);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        deliveryDataAll = [...data.data.records];

        if (role !== "optometrist") {
          let apiUrlOptometrist =
            "https://monkfish-app-v8pst.ondigitalocean.app/api/user?";
          apiUrlOptometrist += `filter[role]=optometrist`;
          apiUrlOptometrist +=
            "&relations[0]=clientsAsDeliveryman.profile.paymentHistories";
          apiUrlOptometrist +=
            "&relations[1]=clientsAsDeliveryman.ordersAsClient.baskets.product";

          const responseOptometrist = await fetch(apiUrlOptometrist, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          handleErrorResponse(responseOptometrist);

          if (!responseOptometrist.ok) {
            throw new Error("Network response was not ok");
          }

          const dataOptometrist = await responseOptometrist.json();
          deliveryDataAll = [
            ...deliveryDataAll,
            ...dataOptometrist.data.records,
          ];
        }

        setDeliveryData(deliveryDataAll);
      } catch (error) {
        console.warn(error);
      }
    };

    const fetchDeliveriesClients = async () => {
      try {
        const url =
          role === "optometrist"
            ? `https://monkfish-app-v8pst.ondigitalocean.app/api/user/${optomId}?relations[0]=clientsAsDeliveryman.profile`
            : `https://monkfish-app-v8pst.ondigitalocean.app/api/user/${deliveryId}?relations[0]=clientsAsDeliveryman.profile`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setDeliveryClients(data.data.clientsAsDeliveryman);
      } catch (error) {
        console.warn(error);
      }
    };

    const fetchHomeDeliveryClient = async () => {
      try {
        const url =
          role === "optometrist"
            ? `https://monkfish-app-v8pst.ondigitalocean.app/api/user/${optomId}?relations[0]=clientsAsDeliveryman&relations[1]=profile`
            : `https://monkfish-app-v8pst.ondigitalocean.app/api/user/${devId}?relations[0]=clientsAsDeliveryman&relations[1]=profile`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
    if (role === "optometrist") {
      fetchHomeDeliveryClient();
    } else if (devId !== null && devId !== undefined) {
      fetchHomeDeliveryClient();
    }
    if (checkedClient !== null) {
      fetchOrders();
    }
    fetchUserData();
    fetchDataProducts();
  }, [deliveryId, token, checkedClient, sum]);

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
        checkedClient,
        setCheckedClient,
        setDevId,
        clientForDelivary,
        atTheMom,
        setAtTheMom,
        setSum,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
