import React, { useContext } from "react";
import "./AddProducts.css";
import { UserContext } from "../../Context/Context";
const AddProducts = () => {
  const { setAddProductsOpen, searchProducts, setSearchProducts } =
    useContext(UserContext);
  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Поиск"
        onChange={(e) => setSearchProducts(e.target.value)}
        value={searchProducts}
      />
      <button
        onClick={() => {
          setAddProductsOpen(true);
        }}
      >
        Добавить продукт <span>+</span>
      </button>
    </div>
  );
};

export default AddProducts;
