import React, { useContext } from "react";
import { UserContext } from "../../Context/Context";
import AddProducts from "../../Components/AddProducts/AddProducts";
import TableProducts from "../../Components/TableProducts/TableProducts";
import ModalAddProducts from "../../Modals/ModalAddProducts/ModalAddProducts";

const Products = () => {
  const { sidebarOpen, addProductsOpen, products } = useContext(UserContext);
  return (
    <div className={`home-wrap ${sidebarOpen ? "p-o" : "p-c"}`}>
      <h2 className="products_title">Продукты</h2>
      <div className="sum-tovars">Товаров: {products.length}</div>
      <AddProducts />
      <TableProducts />
      {addProductsOpen && <ModalAddProducts />}
    </div>
  );
};

export default Products;
