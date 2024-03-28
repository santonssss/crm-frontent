import React from "react";

const Series = ({ bg, color, sum, text }) => {
  const formatNumber = (number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    }).format(number);
  };

  return (
    <div className="series-a">
      <span
        className="sum"
        style={{
          color: `${color}`,
        }}
      >
        {formatNumber(sum)}
      </span>
      <span className="tit">
        <div className={`quadrate ${bg} `} />
        {text}
      </span>
    </div>
  );
};

export default Series;
