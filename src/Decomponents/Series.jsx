import React from "react";

const Series = ({ bg, color, sum, text }) => {
  return (
    <div className="series-a">
      <span
        className="sum"
        style={{
          color: `${color}`,
        }}
      >
        {sum}
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
            fill={`${color}`}
          />
        </svg>
      </span>
      <span className="tit">
        <div className={`quadrate ${bg} `} />
        {text}
      </span>
    </div>
  );
};

export default Series;
