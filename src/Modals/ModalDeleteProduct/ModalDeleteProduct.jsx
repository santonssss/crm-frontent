import React, { useContext } from "react";
import "./ModalDeleteProduct.css";
import toast from "react-hot-toast";
import { UserContext } from "../../Context/Context";
const ModalDeleteProduct = ({ setProductsDelete, checkedProduct }) => {
  const { setSum } = useContext(UserContext);
  async function deleteProductById(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(
        `https://monkfish-app-v8pst.ondigitalocean.app/api/product/${checkedProduct.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        toast(
          "При удаление продукта возникли проблемы пожалуйста перепроверьте данные!"
        );
        throw new Error("Ошибка при удалении продукта");
      }

      const data = await response.json();
      toast("Продукт успешно удален");
      setProductsDelete(false);
      setSum((prev) => prev + 1);
    } catch (error) {
      console.error("Произошла ошибка при удалении продукта:", error.message);

      return null;
    }
  }

  return (
    <form
      onSubmit={deleteProductById}
      className="modal-overlay_deleteProduct"
      onClick={() => setProductsDelete(false)}
    >
      <div
        className="modal-content_deleteProduct"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="close" onClick={() => setProductsDelete(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 1 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 1.414-1.414L12 10.586z" />
          </svg>
        </div>
        <p>Вы точно хотите удалить выбранный продукт?</p>
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

export default ModalDeleteProduct;
