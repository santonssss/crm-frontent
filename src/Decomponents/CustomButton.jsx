import React from "react";

const CustomButton = ({ children, ...props }) => {
  return (
    <button
      {...props}
      style={{
        padding: "8px 11px",
        display: "flex",
        width: "214px",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#1e89ec",
        border: "none",
        color: "#fff",
        borderRadius: "5px",
      }}
    >
      {children}
    </button>
  );
};

export default CustomButton;
