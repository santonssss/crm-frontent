import React, { useContext, useState } from "react";
import "./ModalDelete.css";
import { UserContext } from "../../Context/Context";
const ModalDelete = () => {
  const [success, setSuccess] = useState(false);
  const { idDelete, setDeleteOpen } = useContext(UserContext);
  const token = localStorage.getItem("accessToken");
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://monkfish-app-v8pst.ondigitalocean.app/api/user/${idDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log("Пользователь успешно удален");
      } else {
        console.error(
          "Ошибка удаления пользователя. Статус ответа:",
          response.status
        );
        throw new Error("Ошибка удаления пользователя");
      }
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }
  };
  return (
    <form className="modal-overlay_delete" onSubmit={handleDelete}>
      <div
        className="modal-content_delete"
        onClick={(e) => e.stopPropagation()}
      >
        {!success ? (
          <p>Вы точно хотите удалить доставщика?</p>
        ) : (
          <p>Доставщик удален успешно</p>
        )}
        {!success ? (
          <div className="btns_delete">
            <button>Да</button>
            <button
              onClick={() => {
                setDeleteOpen(false);
              }}
              type="button"
            >
              Нет
            </button>
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default ModalDelete;
