import React, { useContext, useState } from "react";
import "./ModalAddDelivery.css";
import { UserContext } from "../../Context/Context";
import { TailSpin } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";
const ModalAddDelivery = ({
  username,
  setUsername,
  carNumber,
  setCarNumber,
}) => {
  const { setAddDeliveryOpen } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    event.preventDefault();
    const role = "deliveryman";
    try {
      const response = await fetch(
        "https://monkfish-app-v8pst.ondigitalocean.app/api/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username,
            carNumber,
            role,
          }),
        }
      );

      if (!response.ok) {
        toast(
          "Не удалось добавить доставщика, пожалуйста перепроверьте данные"
        );
        throw new Error("Network response was not ok");
      }

      toast("Доставщик добавлен успешно");
      setUsername("");
      setCarNumber("");
      setSum((prev) => prev + 1);
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-delivery" onClick={() => setAddDeliveryOpen(false)}>
      <form
        className="add-delivery_modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={handleSubmit}
      >
        <div>
          <span>Имя доставщика</span>
          <input
            type="text"
            placeholder="Имя доставщика"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <span>Номер машины</span>
          <input
            type="text"
            placeholder="Номер машины"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
          />
        </div>
        <div className="add_btns">
          <button type="submit">
            {!loading ? (
              "Добавить"
            ) : (
              <TailSpin radius={"2px"} width={30} height={30} />
            )}
          </button>
          <button type="button" onClick={() => setAddDeliveryOpen(false)}>
            Отменить
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default ModalAddDelivery;
