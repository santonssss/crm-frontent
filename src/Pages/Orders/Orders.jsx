import React, { useContext } from "react";
import { UserContext } from "../../Context/Context";
import OrdersLeft from "../../Components/OrdersLeft/OrdersLeft";
import OrdersRight from "../../Components/OrdersRight/OrdersRight";
const Orders = () => {
  const { sidebarOpen, addProductsOpen } = useContext(UserContext);
  return (
    <div className={`home-wrap ${sidebarOpen ? "p-o" : "p-c"}`}>
      <h3 className="products_title">Заказы</h3>
      <div className="orders-wrap">
        <OrdersLeft />
        <OrdersRight />
      </div>
    </div>
  );
};

export default Orders;
