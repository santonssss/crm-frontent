import React, { useContext, useState } from "react";
import "./ModalDelete.css";
import { UserContext } from "../../Context/Context";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";
const ModalDelete = () => {
  const { idDelete, setDeleteOpen, setSum } = useContext(UserContext);
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
      if (response.ok) {
        toast("Пользователь удален успешно");
        setDeleteOpen(false);
        setSum((prev) => prev + 1);
      } else {
        console.error(
          "Ошибка удаления пользователя. Статус ответа:",
          response.status
        );
        throw new Error("Ошибка удаления пользователя");
      }
    } catch (error) {
      console.error("Произошла ошибка:", error);
      toast("При удаление пользователя произошли технические проблемы");
    }
  };
  return (
    <form className="modal-overlay_delete" onSubmit={handleDelete}>
      <div
        className="modal-content_delete"
        onClick={(e) => e.stopPropagation()}
      >
        <p
          style={{
            textAlign: "center",
          }}
        >
          Вы точно хотите удалить выбранного пользователя?
        </p>
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
      </div>
    </form>
  );
};

export default ModalDelete;
