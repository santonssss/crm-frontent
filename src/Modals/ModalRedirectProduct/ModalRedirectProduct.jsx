import React, { useState } from "react";
import "./ModalRedirectProduct.css";

import toast from "react-hot-toast";
const ModalRedirectProduct = ({ setProductRedirect, checkedProduct }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [discount1, setDiscount1] = useState("");
  const [discount2, setDiscount2] = useState("");
  const token = localStorage.getItem("accessToken");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {};

    if (productName.trim() !== "" && productName !== checkedProduct.name) {
      updatedData.name = productName;
    }

    if (price.trim() !== "" && price !== checkedProduct.standard) {
      updatedData.standard = price;
    }

    if (discount1.trim() !== "" && discount1 !== checkedProduct.discount1) {
      updatedData.discount1 = discount1;
    }

    if (discount2.trim() !== "" && discount2 !== checkedProduct.discount2) {
      updatedData.discount2 = discount2;
    }

    if (Object.keys(updatedData).length === 0) {
      return;
    }

    try {
      const response = await fetch(
        `https://monkfish-app-v8pst.ondigitalocean.app/api/product/${checkedProduct.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error("Ошибка при обновлении данных продукта");
      }

      toast("Редактирование прошло успешно");
      setProductRedirect(false);
      setProductName("");
      setPrice("");
      setDiscount1("");
      setDiscount2("");
    } catch (error) {
      toast("Произошла ошибка при редактировании продукта");
      console.error("Ошибка при редактировании продукта:", error.message);
    }
  };

  return (
    <form
      className="modal-overlay_redirectProduct"
      onClick={() => setProductRedirect(false)}
    >
      <div
        className="modal-content_redirectProduct"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="close" onClick={() => setProductRedirect(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 1 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 1.414-1.414L12 10.586z" />
          </svg>
        </div>
        <div className="inputs">
          <div className="inp">
            <span>Название:</span>
            <input
              type="text"
              className="prod_name"
              placeholder="Введите название"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="inp">
            <span>Цена</span>
            <div>
              <input
                type="number"
                required
                className="inp_price"
                placeholder=""
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="inp">
            <span>Скидка-1</span>
            <div>
              <input
                type="number"
                required
                className="inp_price"
                placeholder=""
                value={discount1}
                onChange={(e) => setDiscount1(e.target.value)}
              />
            </div>
          </div>
          <div className="inp">
            <span>Скидка-2</span>
            <div>
              <input
                type="number"
                required
                className="inp_price"
                placeholder=""
                value={discount2}
                onChange={(e) => setDiscount2(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button onClick={handleSubmit}>Редактировать</button>
      </div>
    </form>
  );
};

export default ModalRedirectProduct;
