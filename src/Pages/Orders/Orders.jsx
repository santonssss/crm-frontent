import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/Context";
import OrdersLeft from "../../Components/OrdersLeft/OrdersLeft";
import OrdersRight from "../../Components/OrdersRight/OrdersRight";
import ModalAddOrder from "../../Modals/ModalAddOrder/ModalAddOrder";
const Orders = () => {
  const [addOrderOpen, setAddOrderOpen] = useState(false);
  const { sidebarOpen, addProductsOpen } = useContext(UserContext);
  return (
    <div className={`home-wrap ${sidebarOpen ? "p-o" : "p-c"}`}>
      <h3 className="products_title">Заказы</h3>
      <div className="orders-wrap">
        <OrdersLeft />
        <OrdersRight
          addOrderOpen={addOrderOpen}
          setAddOrderOpen={setAddOrderOpen}
        />
      </div>
      {addOrderOpen && <ModalAddOrder setAddOrderOpen={setAddOrderOpen} />}
    </div>
  );
};

export default Orders;
