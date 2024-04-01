import React, { useContext, useEffect, useState } from "react";
import "./OrdersRight.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import { UserContext } from "../../Context/Context";
import false_icon from "../../Assets/Image/true.svg";
import true_icon from "../../Assets/Image/false.svg";
import { Link } from "react-router-dom";
import ModalChangeOrder from "../../Modals/ModalChangeOrder/ModalChangeOrder";

const OrdersRight = ({ setAddOrderOpen }) => {
  const { orders, setSum } = useContext(UserContext);
  const [sortedOrders, setSortedOrders] = useState([]);
  const [initialSortedOrders, setInitialSortedOrders] = useState([]);
  const [openChangeDelivery, setOpenChangeDelivery] = useState(false);
  const [atTheMomentOrder, setAtTheMomemtOrder] = useState({});

  useEffect(() => {
    if (orders.length > 0) {
      const sortOrdersByDate = (orders) => {
        return orders.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateA - dateB;
        });
      };

      const sorted = sortOrdersByDate(orders);
      setSortedOrders(sorted);
      setInitialSortedOrders(sorted); // Сохраняем изначально отсортированные заказы
    }
  }, [orders]);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const [beforeSelectedDate, setBeforeSelectedDate] = useState(yesterday);
  const [afterSelectedDate, setAfterSelectedDate] = useState(new Date());

  const handleDateChangeBefore = (date) => {
    setBeforeSelectedDate(date);
    filterOrders(date, afterSelectedDate);
  };

  const handleDateChangeAfter = (date) => {
    setAfterSelectedDate(date);
    filterOrders(beforeSelectedDate, date);
  };

  const filterOrders = (beforeDate, afterDate) => {
    const startOfDayBefore = new Date(beforeDate);
    startOfDayBefore.setHours(0, 0, 0, 0);
    const startOfDayAfter = new Date(afterDate);
    startOfDayAfter.setHours(0, 0, 0, 0);

    const filtered = initialSortedOrders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startOfDayBefore && orderDate <= startOfDayAfter;
    });
    setSortedOrders(() => filtered);
  };

  const formatToRubles = (value) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    }).format(value);
  };

  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;

    return formattedDate;
  }

  const updateOrderStatus = async (orderId, confirmed) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `https://monkfish-app-v8pst.ondigitalocean.app/api/order/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            confirmed: !confirmed,
          }),
        }
      );
      const data = await response.json();
      setSum((prev) => prev + 1);
      if (!response.ok) {
        throw new Error("Ошибка при обновлении статуса заказа");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const handleImageClick = async (orderId, confirmed) => {
    const updatedOrder = await updateOrderStatus(orderId, confirmed);
    const index = sortedOrders.findIndex((order) => order.id === orderId);
    const newSortedOrders = [...sortedOrders];
    newSortedOrders[index].confirmed = updatedOrder.confirmed;
    setSortedOrders(newSortedOrders);
  };

  return (
    <div className="orders-right">
      <div className="right-btns">
        <button
          className="right-btn"
          onClick={() => {
            setAddOrderOpen(true);
          }}
        >
          Создать <br />
          накладную <span>+</span>
        </button>
        <Link className="right-btn" to={"/nakladnoy-order"}>
          Напечатать накладную для Доставщика
        </Link>
        <Link className="right-btn " to={"/nakladnoyOrderAllClients"}>
          Напечатать накладную для всех клиентов
        </Link>
      </div>
      <table className="order-table">
        <thead>
          <tr>
            <th>№ Накладного</th>
            <th>Дата</th>
            <th>Сумма</th>
            <th>Оплачено</th>
            <th>Долги</th>
            <th>
              от
              <DatePicker
                selected={beforeSelectedDate}
                onChange={handleDateChangeBefore}
                dateFormat="dd.MM.yyyy"
                className="custom-datepicker"
                locale={ru}
              />
            </th>
            <th>
              до
              <DatePicker
                selected={afterSelectedDate}
                onChange={handleDateChangeAfter}
                dateFormat="dd.MM.yyyy"
                className="custom-datepicker"
                locale={ru}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.length ? (
            sortedOrders.map((order) => (
              <tr key={order.id}>
                <td>
                  <div className="flex align-center gap-1">
                    <img
                      style={{
                        cursor: "pointer",
                      }}
                      src={order.confirmed ? true_icon : false_icon}
                      alt=""
                      onClick={() =>
                        handleImageClick(order.id, order.confirmed)
                      }
                    />
                    №{order.id}
                  </div>
                </td>
                <td>{formatDate(new Date(order.createdAt))}</td>
                <td>{formatToRubles(order.amount)}</td>
                <td>{formatToRubles(order.amount - order.remains)}</td>
                <td>{formatToRubles(order.remains)}</td>
                <td>
                  <div>
                    <button
                      className="right-btn"
                      onClick={() => {
                        setOpenChangeDelivery(true);
                        setAtTheMomemtOrder(order);
                      }}
                    >
                      Редактировать
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Заказов этого клиента к сожалению нету</td>
            </tr>
          )}
        </tbody>
      </table>
      {openChangeDelivery && (
        <ModalChangeOrder
          atTheMomentOrder={atTheMomentOrder}
          setOpenChangeDelivery={setOpenChangeDelivery}
        />
      )}
    </div>
  );
};

export default OrdersRight;
