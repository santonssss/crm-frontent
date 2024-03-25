import React, { useContext, useEffect, useState } from "react";
import "./ModalAddOrder.css";
import lavash from "../../Assets/Image/lavash.png";
import close_icon from "../../Assets/Icons/iconamoon_close-duotone.png";
import ModalProductsList from "../ModalProductsList/ModalProductsList";
import { UserContext } from "../../Context/Context";

import toast, { Toaster } from "react-hot-toast";
const ModalAddOrder = ({ setAddOrderOpen }) => {
  const [productsList, setProductsList] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState({});
  const [totalSelectedPrice, setTotalSelectedPrice] = useState(0);
  const [openList, setOpenList] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState("");
  const { deliveryData, setDeliveryId, deliverysClients } =
    useContext(UserContext);
  const deliveryMen = deliveryData.filter(
    (user) => user.role === "deliveryman"
  );
  useEffect(() => {
    const total = Object.values(selectedPrices).reduce(
      (acc, price) => acc + Number(price),
      0
    );
    setTotalSelectedPrice(total);
  }, [selectedPrices]);
  const submitOrder = async (e) => {
    const token = localStorage.getItem("accessToken");

    e.preventDefault();
    try {
      const data = {
        amount: totalSelectedPrice,
        baskets: productsList,
        owner: selectedClientId,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(
        "https://monkfish-app-v8pst.ondigitalocean.app/api/order",
        requestOptions
      );
      const responseData = await response.json();
      if (response.ok) {
        toast("Заказ успешно создан");
        setProductsList([]);
        setTotalSelectedPrice(0);
        setSum((prev) => prev + 1);
      } else {
        toast("При создание заказа произошло ошибка");
      }
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }
  };
  return (
    <form className="modal-overlay_addOrder" onSubmit={submitOrder}>
      <div
        className="modal-content_addOrder"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="close_order" onClick={() => setAddOrderOpen(false)}>
          <img src={close_icon} alt="close" />
        </div>
        <select
          name=""
          className="sel"
          onChange={(e) => {
            const selectedDeliveryId = e.target.value;
            setDeliveryId(selectedDeliveryId);
          }}
        >
          <option
            value=""
            style={{
              display: "none",
            }}
          >
            Выбрать достащика
          </option>
          {deliveryMen.length > 0 ? (
            deliveryMen.map((delivery) => {
              return <option value={delivery.id}>{delivery.username}</option>;
            })
          ) : (
            <p>Доставщиков пока что нету</p>
          )}
        </select>
        <select
          name=""
          className="sel"
          id=""
          onChange={(e) => {
            const clientId = e.target.value;
            setSelectedClientId(clientId);
          }}
        >
          <option
            value=""
            style={{
              display: "none",
            }}
          >
            Выбрать клиента
          </option>
          {deliverysClients.length > 0 ? (
            deliverysClients.map((client) => {
              return <option value={client.id}>{client.username}</option>;
            })
          ) : (
            <p>Клиентов пока что нету</p>
          )}
        </select>
        <div className="table-order-wrapper">
          <table>
            <thead>
              <tr>
                <th>Товар</th>
                <th>Цена</th>
                <th>Скидка</th>
              </tr>
            </thead>
            <tbody>
              {productsList.length > 0 ? (
                productsList.map((product, index) => (
                  <ProductRow
                    key={index}
                    product={product}
                    selectedPrice={selectedPrices[index]}
                    setSelectedPrice={(price) =>
                      setSelectedPrices((prev) => ({
                        ...prev,
                        [index]: price,
                      }))
                    }
                  />
                ))
              ) : (
                <tr>
                  <td>Добавленных товаров пока нет</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <h3>
          Итого <span>{formatPrice(totalSelectedPrice)}</span>
        </h3>
        <div className="btns_order ">
          <button
            className="bg"
            title="Добавьте товары"
            disabled={totalSelectedPrice === 0}
          >
            Сохранить
          </button>
          <button
            type="button"
            className="bg "
            onClick={() => setOpenList(true)}
          >
            Добавить товар
          </button>
        </div>
      </div>
      {openList && (
        <ModalProductsList
          setProductsList={setProductsList}
          productsList={productsList}
          setOpenList={setOpenList}
        />
      )}
      <Toaster />
    </form>
  );
};

const ProductRow = ({ product, selectedPrice, setSelectedPrice }) => {
  const handleSelectChange = (e) => {
    setSelectedPrice(e.target.value);
  };

  useEffect(() => {
    if (!selectedPrice) {
      setSelectedPrice(product.standard);
    }
  }, []);
  return (
    <tr>
      <td>
        <div className="flex items-center gap-2">
          {product.image && product.image.url && (
            <img src={product.image.url} alt={product.name} />
          )}
          {product.name}
        </div>
      </td>
      <td>{selectedPrice ? formatPrice(selectedPrice) : product.standard}</td>
      <td>
        <select value={selectedPrice} onChange={handleSelectChange}>
          <option value={product.standard}>
            {formatPrice(product.standard)}
          </option>
          <option value={product.discount1}>
            {formatPrice(product.discount1)}
          </option>
          <option value={product.discount2}>
            {formatPrice(product.discount2)}
          </option>
        </select>
      </td>
    </tr>
  );
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  }).format(price);
};

export default ModalAddOrder;
