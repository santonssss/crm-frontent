import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/Context";
import OrdersLeft from "../../Components/OrdersLeft/OrdersLeft";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import ModalEditOrder from "../../Modals/ModalEditOrder/ModalEditOrder";

const Abacus = () => {
  const { sidebarOpen, checkedClient } = useContext(UserContext);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const [beforeSelectedDate, setSelectedDateBefore] = useState(yesterday - 1);
  const [afterSelectedDate, setSelectedDateAfter] = useState(new Date());
  const [orders, setOrders] = useState([]);
  const [client, setClient] = useState({});
  const [paid, setPaid] = useState(0);
  const [remains, setRemains] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [showUnpaidOnly, setShowUnpaidOnly] = useState(false);
  const [debtsOrder, setDebtsOrder] = useState([]);
  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const unpaidOnlyCondition = showUnpaidOnly ? order.remains !== 0 : true;
    return (
      orderDate >= beforeSelectedDate &&
      orderDate <= afterSelectedDate &&
      unpaidOnlyCondition
    );
  });
  const handleEditClick = () => {
    setDebtsOrder(orders.filter((value, index) => value.remains !== 0));
    setOpenModal(true);
  };

  const fetchWithDates = async () => {
    try {
      const response = await fetch(
        `https://monkfish-app-v8pst.ondigitalocean.app/api/order/?relations[0]=owner&relations[1]=paymentHistories&filter[owner][id]=${checkedClient}&dateFilter[startDate]=${beforeSelectedDate}&dateFilter[endDate]=${afterSelectedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      let sumPaid = 0;
      let sumRemains = 0;
      data.data.records.map((value, index) => {
        sumRemains += Number(value.remains);
        sumPaid += Number(value.amount - value.remains);
      });
      setPaid(sumPaid);
      setRemains(sumRemains);
      setOrders(data.data.records);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const fetchOrdersOfClients = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const idshka = checkedClient;
      const response = await fetch(
        `https://monkfish-app-v8pst.ondigitalocean.app/api/order/?relations[0]=owner&relations[1]=paymentHistories&filter[owner][id]=${idshka}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      let sumPaid = 0;
      let sumRemains = 0;
      data.data.records.map((value, index) => {
        sumRemains += Number(value.remains);
        sumPaid += Number(value.amount - value.remains);
      });
      setPaid(sumPaid);
      setRemains(sumRemains);
      setOrders(data.data.records);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const idshka = checkedClient;
      const response = await fetch(
        `https://monkfish-app-v8pst.ondigitalocean.app/api/user/${idshka}?relations[0]=ordersAsClient&relations[1]=profile&relations[2]=profile.paymentHistories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const sizeOrders = data.data.ordersAsClient?.length;
      let summa = 0;
      data.data.ordersAsClient?.map((value, index) => {
        summa += Number(value.amount);
      });
      data.data.sizeOrders = sizeOrders;
      data.data.summa = summa;
      setClient(data.data);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const formatToRubles = (value) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    }).format(value);
  };
  const filteredOrderss = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const unpaidOnlyCondition = showUnpaidOnly ? order.remains !== 0 : true;
    return (
      orderDate >= beforeSelectedDate &&
      orderDate <= afterSelectedDate &&
      unpaidOnlyCondition
    );
  });
  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;

    return formattedDate;
  }
  const handleDateChangeBefore = (date) => {
    setSelectedDateBefore(date);
  };
  const handleDateChangeAfter = (date) => {
    setSelectedDateAfter(date);
  };
  useEffect(() => {
    fetchUser();
    fetchOrdersOfClients();
    console.log(checkedClient);
  }, [checkedClient]);
  return (
    <div className={`abacus-page ${sidebarOpen ? "p-o" : "p-c"}`}>
      <h3 className="products_title mb-10">Счеты</h3>
      <div className="flex gap-x-12">
        <OrdersLeft />
        <div className="right-abacus">
          <div className="abacus-info">
            <span>Клиент:</span>
            <span>{client.username}</span>
          </div>
          <div className="abacus-info">
            <span>Сумма заказов:</span>
            <span>{client.summa ? formatToRubles(client.summa) : ""}</span>
          </div>
          <div className="abacus-info">
            <span>Кол-во заказов:</span>
            <span>{client.sizeOrders}</span>
          </div>
          <div className="date-pick">
            От
            <DatePicker
              selected={beforeSelectedDate}
              onChange={handleDateChangeBefore}
              dateFormat="dd.MM.yyyy"
              className="custom-datepicker"
              locale={ru}
            />
            До
            <DatePicker
              selected={afterSelectedDate}
              onChange={handleDateChangeAfter}
              dateFormat="dd.MM.yyyy"
              className="custom-datepicker"
              locale={ru}
            />
          </div>
          <div className="w-s   flex gap-3">
            <input
              type="checkbox"
              checked={showUnpaidOnly}
              onChange={() => setShowUnpaidOnly(!showUnpaidOnly)}
            />
            <label>Показать только неоплаченные долги</label>
          </div>
          <table className="order-table z-0">
            <thead>
              <tr>
                <th>№ Накладного</th>
                <th>Дата</th>
                <th>Сумма</th>
                <th>Оплачен</th>
                <th>Долги</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {orders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>№{order.id}</td>
                    <td>{formatDate(new Date(order.createdAt))}</td>
                    <td>{formatToRubles(order.amount)}</td>
                    <td>{formatToRubles(order.amount - order.remains)}</td>
                    <td>{formatToRubles(order.remains)}</td>
                    <td>
                      {order.paymentType == "paid" && (
                        <span className=" bg-green-200 text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-700 dark:text-green-300">
                          Оплачен
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    Заказов к сожалению нету
                  </td>
                </tr>
              )}
              <tr className="bg-gray-200">
                <td>
                  <strong>Итог:</strong>
                </td>
                <td></td>
                <td></td>
                <td>{formatToRubles(paid)}</td>
                <td>{formatToRubles(remains)}</td>
                <td>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handleEditClick}
                  >
                    Редактировать
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {openModal && (
        <ModalEditOrder
          orders={debtsOrder}
          onClose={() => setOpenModal(false)}
          remains={remains}
          client={client}
          fetchOrdersOfClients={fetchOrdersOfClients}
        />
      )}
    </div>
  );
};

export default Abacus;
