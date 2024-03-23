import React, { useContext } from "react";
import "./ModalProductsList.css";
import { UserContext } from "../../Context/Context";

const ModalProductsList = ({ setProductsList, productsList, setOpenList }) => {
  const { products } = useContext(UserContext);

  const handleAddProduct = (product) => {
    setProductsList((prevProducts) => [...prevProducts, product]);
  };

  return (
    <div className="modal-overlay_product-list">
      <div
        className="modal-content_product-list"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="product-list_close" onClick={() => setOpenList(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="black"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M3.146 3.146a.5.5 0 0 1 .708 0L8 7.293l4.146-4.147a.5.5 0 1 1 .708.708L8.707 8l4.147 4.146a.5.5 0 1 1-.708.708L8 8.707l-4.146 4.147a.5.5 0 0 1-.708-.708L7.293 8 3.146 3.854a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.image && product.image.url && (
                <img src={product.image.url} alt={product.name} />
              )}
              <span>{product.name ? product.name : "Товар"}</span>
              <button type="button" onClick={() => handleAddProduct(product)}>
                +
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ModalProductsList;
