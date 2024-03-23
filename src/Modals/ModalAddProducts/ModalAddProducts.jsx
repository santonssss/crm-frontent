import React, { useContext, useState } from "react";
import "./ModalAddProducts.css";
import { UserContext } from "../../Context/Context";
import { TailSpin } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";
const ModalAddProducts = () => {
  const [dragging, setDragging] = useState(false);
  const [fileUpload, onFileUpload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [discount1, setDiscount1] = useState(0);
  const [discount2, setDiscount2] = useState(0);
  const token = localStorage.getItem("accessToken");
  const { setAddProductsOpen } = useContext(UserContext);
  const fileInputRef = React.createRef();

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    onFileUpload(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    onFileUpload(file);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", fileUpload);

    const response = await fetch(
      "https://monkfish-app-v8pst.ondigitalocean.app/api/cloud/image",
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    const imageId = data.data.db.id;
    if (!response.ok) {
      throw new Error("Ошибка при загрузке изображения");
    }
    return imageId;
  };

  const addProduct = async (imageId) => {
    const productData = {
      image: imageId,
      name: productName,
      standard: price,
      discount1: discount1,
      discount2: discount2,
    };

    const response = await fetch(
      "https://monkfish-app-v8pst.ondigitalocean.app/api/product",
      {
        method: "POST",
        body: JSON.stringify(productData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Ошибка при добавлении продукта");
    }
    return data;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const id = await uploadImage();
      const productData = await addProduct(id);
      setProductName("");
      setPrice("");
      setDiscount1("");
      setDiscount2("");
      toast("Продукт добавлен успешно");
    } catch (error) {
      console.error(error);
      toast("Не добавлен");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className="modal-overlay_addProd"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div
        className={`modal_addProd `}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div
          className={`image-drop ${dragging ? "dragging" : ""}`}
          onClick={() => fileInputRef.current.click()}
        >
          <svg
            width="53"
            height="53"
            viewBox="0 0 53 53"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M47.1111 5.88889V47.1111H5.88889V5.88889H47.1111ZM47.1111 0H5.88889C2.65 0 0 2.65 0 5.88889V47.1111C0 50.35 2.65 53 5.88889 53H47.1111C50.35 53 53 50.35 53 47.1111V5.88889C53 2.65 50.35 0 47.1111 0ZM32.8011 26.0878L23.9678 37.4828L17.6667 29.8567L8.83333 41.2222H44.1667L32.8011 26.0878Z"
              fill="#1E89EC"
            />
          </svg>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            style={{ display: "none " }}
            ref={fileInputRef}
          />
          <span>Загрузите фотографию</span>
        </div>
        <div className="inputs">
          <div className="inp">
            <span>Название:</span>
            <input
              type="text"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
              className="prod_name"
              placeholder="Введите название"
            />
          </div>
          <div className="inp">
            <span>Цена</span>
            <div>
              <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
                className="inp_price"
                placeholder=""
              />
              <svg
                width="11"
                height="14"
                viewBox="0 0 11 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.96 1.75V7H5.98312C7.86104 7 8.8 5.978 8.8 4.36494C8.8 2.76194 7.86104 1.75 5.9928 1.75H3.96ZM6.56348 8.8095H4.02292V10.7275H7.88172V11.8444H4.02292V14H1.89596V11.8444H0V10.7275H1.89596V8.8095H0V7.68206H1.89596V0H6.6308C9.2774 0 11 1.87862 11 4.41962C11 6.95056 9.23868 8.8095 6.56348 8.8095Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
          <div className="inp">
            <span>Скидка-1</span>
            <div>
              <input
                type="number"
                required
                className="inp_price"
                onChange={(e) => setDiscount1(e.target.value)}
                value={discount1}
                placeholder=""
              />
              <svg
                width="11"
                height="14"
                viewBox="0 0 11 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.96 1.75V7H5.98312C7.86104 7 8.8 5.978 8.8 4.36494C8.8 2.76194 7.86104 1.75 5.9928 1.75H3.96ZM6.56348 8.8095H4.02292V10.7275H7.88172V11.8444H4.02292V14H1.89596V11.8444H0V10.7275H1.89596V8.8095H0V7.68206H1.89596V0H6.6308C9.2774 0 11 1.87862 11 4.41962C11 6.95056 9.23868 8.8095 6.56348 8.8095Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
          <div className="inp">
            <span>Скидка-2</span>
            <div>
              <input
                type="number"
                required
                onChange={(e) => setDiscount2(e.target.value)}
                value={discount2}
                className="inp_price"
                placeholder=""
              />
              <svg
                width="11"
                height="14"
                viewBox="0 0 11 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.96 1.75V7H5.98312C7.86104 7 8.8 5.978 8.8 4.36494C8.8 2.76194 7.86104 1.75 5.9928 1.75H3.96ZM6.56348 8.8095H4.02292V10.7275H7.88172V11.8444H4.02292V14H1.89596V11.8444H0V10.7275H1.89596V8.8095H0V7.68206H1.89596V0H6.6308C9.2774 0 11 1.87862 11 4.41962C11 6.95056 9.23868 8.8095 6.56348 8.8095Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="btns_prod">
          <button className="addProd_add" onSubmit={() => {}}>
            {!loading ? (
              "Добавить"
            ) : (
              <TailSpin radius={"2px"} width={30} height={30} />
            )}
          </button>
          <button
            className="addProd_close"
            onClick={() => {
              setAddProductsOpen(false);
            }}
          >
            Отменить
          </button>
        </div>
      </div>
      <Toaster />
    </form>
  );
};

export default ModalAddProducts;
