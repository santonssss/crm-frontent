import React, { useContext } from "react";
import "./TableProduct.css";
import { UserContext } from "../../Context/Context";

const TableProducts = () => {
  const { products, searchProducts } = useContext(UserContext);
  const formatToRubles = (value) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    }).format(value);
  };
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchProducts.toLowerCase())
  );
  return (
    <table className="tableProducts">
      <thead>
        <tr className="head-table">
          <th>Название</th>
          <th>Цена</th>
          <th>Скидка-1</th>
          <th>Скидка-2</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map((product) => (
          <tr key={product.id}>
            <td>
              <div>
                {product.image && product.image.url && (
                  <img src={product.image.url} alt={product.name} />
                )}
                <span>{product.name}</span>
              </div>
            </td>
            <td>{formatToRubles(product.standard)}</td>
            <td>{formatToRubles(product.discount1)}</td>
            <td>{formatToRubles(product.discount2)}</td>
            <td>
              <div>
                <button>
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.1668 4.66667H18.0835L16.9168 3.5H11.0835L9.91683 4.66667H5.8335V7H22.1668M7.00016 22.1667C7.00016 22.7855 7.246 23.379 7.68358 23.8166C8.12117 24.2542 8.71466 24.5 9.3335 24.5H18.6668C19.2857 24.5 19.8792 24.2542 20.3167 23.8166C20.7543 23.379 21.0002 22.7855 21.0002 22.1667V8.16667H7.00016V22.1667Z"
                      fill="#D12C2C"
                    />
                  </svg>
                </button>
                <button>
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.83317 23.3334H22.1665C22.4759 23.3334 22.7727 23.4563 22.9915 23.6751C23.2103 23.8939 23.3332 24.1906 23.3332 24.5C23.3332 24.8095 23.2103 25.1062 22.9915 25.325C22.7727 25.5438 22.4759 25.6667 22.1665 25.6667H5.83317C5.52375 25.6667 5.22701 25.5438 5.00821 25.325C4.78942 25.1062 4.6665 24.8095 4.6665 24.5C4.6665 24.1906 4.78942 23.8939 5.00821 23.6751C5.22701 23.4563 5.52375 23.3334 5.83317 23.3334ZM4.6665 17.5L16.3332 5.83337L19.8332 9.33337L8.1665 21H4.6665V17.5ZM17.4998 4.66671L19.8332 2.33337L23.3332 5.83337L20.9987 8.16787L17.4998 4.66671Z"
                      fill="#00A811"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableProducts;
