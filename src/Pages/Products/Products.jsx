import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/Context";
import AddProducts from "../../Components/AddProducts/AddProducts";
import TableProducts from "../../Components/TableProducts/TableProducts";
import ModalAddProducts from "../../Modals/ModalAddProducts/ModalAddProducts";
import ModalDeleteProduct from "../../Modals/ModalDeleteProduct/ModalDeleteProduct";
import ModalRedirectProduct from "../../Modals/ModalRedirectProduct/ModalRedirectProduct";
import { Toaster } from "react-hot-toast";

const Products = () => {
  const { sidebarOpen, addProductsOpen, products } = useContext(UserContext);
  const [productDelete, setProductsDelete] = useState(false);
  const [checkedProduct, setCheckedProduct] = useState({});
  const [productRedirect, setProductRedirect] = useState(false);
  return (
    <div className={`home-wrap ${sidebarOpen ? "p-o" : "p-c"}`}>
      <h2 className="products_title">Продукты</h2>
      <div className="sum-tovars">Товаров: {products.length}</div>
      <AddProducts />
      <TableProducts
        setCheckedProduct={setCheckedProduct}
        setProductsDelete={setProductsDelete}
        setProductRedirect={setProductRedirect}
      />
      {addProductsOpen && <ModalAddProducts />}
      {productDelete && (
        <ModalDeleteProduct
          setProductsDelete={setProductsDelete}
          checkedProduct={checkedProduct}
        />
      )}
      {productRedirect && (
        <ModalRedirectProduct
          setProductRedirect={setProductRedirect}
          checkedProduct={checkedProduct}
        />
      )}
      <Toaster />
    </div>
  );
};

export default Products;
