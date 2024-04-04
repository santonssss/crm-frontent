import React, { useContext, useState } from "react";
import "./ModalChangeOrder.css";
import close_icon from "../../Assets/Icons/iconamoon_close-duotone.png";
import defa from "../../Assets/Icons/defa.png";
import { Toaster, toast } from "react-hot-toast";
import { UserContext } from "../../Context/Context";
const ModalChangeOrder = ({ setOpenChangeDelivery, atTheMomentOrder }) => {
  const [basketData, setBasketData] = useState(
    atTheMomentOrder.baskets.map((item) => ({ ...item }))
  );
  const { setSum } = useContext(UserContext);
  const token = localStorage.getItem("accessToken");

  const recalculateSumma = (item) => {
    const basePrice = item.product.standard;
    let finalPrice = basePrice;

    if (item.discountType === "discount1") {
      finalPrice = item.product.discount1;
    } else if (item.discountType === "discount2") {
      finalPrice = item.product.discount2;
    }

    return finalPrice * item.quantity;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    }).format(price);
  };

  const handleChange = (index, e) => {
    const { value } = e.target;
    const updatedBasket = [...basketData];
    updatedBasket[index].quantity = parseInt(value, 10) || 0;
    updatedBasket[index].summa = recalculateSumma(updatedBasket[index]);
    setBasketData(updatedBasket);
  };

  const handleDiscountChange = (index, e) => {
    const { value } = e.target;
    const updatedBasket = [...basketData];
    updatedBasket[index].discountType = value;
    updatedBasket[index].summa = recalculateSumma(updatedBasket[index]);
    setBasketData(updatedBasket);
  };

  const handleUpdateBasket = async (e, itemIndex) => {
    e.preventDefault();
    const itemToUpdate = basketData[itemIndex];
    const idProd = itemToUpdate.id;

    try {
      const bodyData = {
        discountType: itemToUpdate.discountType,
        quantity: itemToUpdate.quantity,
        summa: itemToUpdate.summa,
      };

      const response = await fetch(
        `https://monkfish-app-v8pst.ondigitalocean.app/api/basket/${idProd}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyData),
        }
      );

      const data = await response.json();
      toast("Изменение отправлены успешно");
      setSum((prev) => prev + 1);
      if (!response.ok) {
        throw new Error("Failed to update basket");
      }

      const newAmount = basketData.reduce((total, item) => {
        return total + item.summa;
      }, 0);

      const orderResponse = await fetch(
        `https://monkfish-app-v8pst.ondigitalocean.app/api/order/${atTheMomentOrder.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: newAmount }),
        }
      );

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error("Failed to update order amount");
      }
    } catch (error) {
      console.error("Error updating basket:", error);
      toast("Ошибка в отправке изменений!");
    }
  };

  return (
    <form
      className="modal-overlay_ChangeOrder"
      onClick={() => setOpenChangeDelivery(false)}
    >
      <div
        className="modal-content_ChangeOrder"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="close_order"
          onClick={() => {
            setOpenChangeDelivery(false);
          }}
        >
          <img src={close_icon} alt="close" />
        </div>
        <table>
          <thead>
            <tr>
              <th>Товар</th>
              <th>кг/шт</th>
              <th>Цена</th>
              <th>Скидка</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {basketData.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center gap-2">
                    {item.product.image && item.product.image.url ? (
                      <img src={item.image.url} alt={item.product.name} />
                    ) : (
                      <img src={defa} alt={item.product.name} />
                    )}
                    {item.product.name}
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
                    value={item.quantity || ""}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <span>кг/шт</span>
                </td>
                <td>{formatPrice(item.summa)}</td>
                <td>
                  <select
                    value={item.discountType}
                    onChange={(e) => handleDiscountChange(index, e)}
                  >
                    <option value="standard">
                      {formatPrice(item.product.standard)}
                    </option>
                    <option value="discount1">
                      {formatPrice(item.product.discount1)}
                    </option>
                    <option value="discount2">
                      {formatPrice(item.product.discount2)}
                    </option>
                  </select>
                </td>
                <td>
                  <button
                    className="p-2 rounded text-white"
                    style={{
                      background: "var(--back-blue)",
                    }}
                    onClick={(e) => {
                      handleUpdateBasket(e, index);
                    }}
                  >
                    Изменить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster />
    </form>
  );
};

export default ModalChangeOrder;
