import React, { useState } from "react";
import "./ModalAddProducts.css";
const ModalAddProducts = () => {
  const [dragging, setDragging] = useState(false);
  const [fileUpload, onFileUpload] = useState();
  let fileInputRef = React.createRef();
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
  return (
    <div className="modal-overlay_addProd">
      <div
        className={`modal_addProd ${dragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="modal-content">
          <h2>Загрузить фотографию</h2>
          <p>Перетащите файл сюда или нажмите для выбора файла</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <button onClick={() => fileInputRef.current.click()}>
            Выбрать файл
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddProducts;
