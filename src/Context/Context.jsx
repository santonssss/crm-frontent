import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalProfileOpen, setModalProfileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [addProductsOpen, setAddProductsOpen] = useState(false);
  const [addClientsOpen, setAddClientsOpen] = useState(false);
  const [addDeliveryOpen, setAddDeliveryOpen] = useState(false);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
