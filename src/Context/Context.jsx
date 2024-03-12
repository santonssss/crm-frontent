import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalProfileOpen, setModalProfileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
