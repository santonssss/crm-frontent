import React, { useContext, useEffect, useState } from "react";
import "./ModalAddOrder.css";
import close_icon from "../../Assets/Icons/iconamoon_close-duotone.png";
import ModalProductsList from "../ModalProductsList/ModalProductsList";
import { UserContext } from "../../Context/Context";
import defa from "../../Assets/Icons/defa.png";
import toast, { Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
const ModalAddOrder = ({ setAddOrderOpen }) => {
  const [productsList, setProductsList] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState({});
  const [totalSelectedPrice, setTotalSelectedPrice] = useState(0);
  const [openList, setOpenList] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClientId, setSelectedClientId] = useState("");
  const { deliveryData, setDeliveryId, deliverysClients, setSum } =
    useContext(UserContext);
  const deliveryMen = deliveryData.filter(
    (user) => user.role === "deliveryman" || user.role === "optometrist"
  );
  useEffect(() => {
    const total = productsList.reduce((acc, product, index) => {
      const price = selectedPrices[index] || product.standard;
      return acc + price * product.selectedQuantity;
    }, 0);
    setTotalSelectedPrice(total);
  }, [selectedPrices, productsList]);
  const submitOrder = async (e) => {
    const token = localStorage.getItem("accessToken");
    e.preventDefault();
    try {
      const baskets = productsList.map((product) => ({
        product: product.id,
        discountType: product.selectedDiscountType || "standard",
        quantity: parseInt(product.selectedQuantity) || 1,
      }));
      const data = {
        amount: totalSelectedPrice,
        baskets: baskets,
        owner: selectedClientId,
        createdAt: selectedDate.toISOString(),
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
        setSelectedPrices({});
      }
      setSum((prev) => prev + 1);
    } catch (error) {
      toast("При создание заказа произошло ошибка");
      console.error("Произошла ошибка:", error);
    }
  };
  const role = localStorage.getItem("role");
  const handleDateChange = (date) => {
    setSelectedDate(date);
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
        {role !== "optometrist" && (
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
              Выбрать доставщика
            </option>
            {deliveryMen.length > 0 ? (
              deliveryMen.map((delivery) => {
                return <option value={delivery.id}>{delivery.username}</option>;
              })
            ) : (
              <p>Доставщиков пока что нету</p>
            )}
          </select>
        )}
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
                <th>Товар.</th>
                <th>кг/шт</th>
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
                    updateProduct={(updatedProduct) => {
                      const updatedProductsList = [...productsList];
                      updatedProductsList[index] = updatedProduct;
                      setProductsList(updatedProductsList);
                    }}
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
          Итого. <span>{formatPrice(totalSelectedPrice)}</span>
        </h3>
        <div className="btns_order ">
          <button
            className="bg"
            title="Добавьте товары"
            disabled={totalSelectedPrice === 0}
          >
            Сохранить
          </button>{" "}
          <DatePicker
            selected={selectedDate}
            dateFormat="dd.MM.yyyy"
            className="custom-datepicker bg-white text-white rounded-sm mt-5 cursor-pointer "
            locale={ru}
            onChange={handleDateChange}
          />
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
const ProductRow = ({ product, setSelectedPrice, updateProduct }) => {
  const [selectedDiscountType, setSelectedDiscountType] = useState("standard");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedPrice, setSelectedPriceLocal] = useState(product.standard);
  const handleSelectChange = (e) => {
    setSelectedPriceLocal(e.target.value);
    const newSelectedPrice = parseFloat(e.target.value);
    setSelectedPrice(newSelectedPrice);
    const newDiscountType =
      e.target.options[e.target.selectedIndex].dataset.discountType;
    setSelectedDiscountType(newDiscountType);
    updateProduct({
      ...product,
      selectedDiscountType: newDiscountType,
      selectedQuantity: selectedQuantity,
    });
  };
  const handleQuantityChange = (e) => {
    setSelectedQuantity(e.target.value);
  };

  useEffect(() => {
    if (!selectedPrice) {
      setSelectedPrice(product.standard);
    }
  }, [selectedPrice]);

  useEffect(() => {
    if (typeof updateProduct === "function") {
      updateProduct({
        ...product,
        selectedDiscountType: selectedDiscountType,
        selectedQuantity: selectedQuantity,
      });
    }
  }, [selectedDiscountType, selectedQuantity]);

  return (
    <tr>
      <td>
        <div className="flex items-center gap-2">
          {product.image && product.image.url ? (
            <img src={product.image.url} alt={product.name} />
          ) : (
            <img src={defa} alt={product.name} />
          )}
          {product.name}
        </div>
      </td>
      <td>
        <input
          type="number"
          style={{
            border: "1px solid black",
            borderRadius: "5px",
            padding: "2px 5px",
            width: "100px",
          }}
          name=""
          id=""
          className="w-10"
          value={selectedQuantity}
          onChange={handleQuantityChange}
        />
        <span>кг/шт</span>
      </td>
      <td>
        {selectedPrice !== undefined
          ? formatPrice(selectedPrice * selectedQuantity)
          : formatPrice(product.standard * selectedQuantity)}
      </td>
      <td>
        <select value={selectedPrice} onChange={handleSelectChange}>
          <option value={product.standard} data-discount-type="standard">
            {formatPrice(product.standard)}
          </option>
          <option value={product.discount1} data-discount-type="discount1">
            {formatPrice(product.discount1)}
          </option>
          <option value={product.discount2} data-discount-type="discount2">
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
