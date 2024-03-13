import React from "react";
import "./AddProducts.css";
const AddProducts = () => {
  return (
    <div className="search-wrapper">
      <input type="text" placeholder="Поиск" />
      <button>
        Добавить продукт <span>+</span>
      </button>
    </div>
  );
};

export default AddProducts;
