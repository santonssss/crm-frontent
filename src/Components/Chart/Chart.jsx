import React, { useContext, useEffect, useState } from "react";
import "./Chart.css";

import Chart from "react-apexcharts";
import Series from "../../Decomponents/Series";
import { UserContext } from "../../Context/Context";

const ChartWrapper = () => {
  const { deliveryData } = useContext(UserContext);
  const [totalDebts, setTotalDebts] = useState(0);
  console.log(deliveryData);
  useEffect(() => {
    if (deliveryData.length > 0) {
      let totalDebts = deliveryData.reduce((accDelivery, deliveryman) => {
        if (deliveryman.clientsAsDeliveryman) {
          const debtsSum = deliveryman.clientsAsDeliveryman.reduce(
            (accClient, client) => {
              if (client.profile && typeof client.profile.debts === "number") {
                return accClient + client.profile.debts;
              } else {
                return accClient;
              }
            },
            0
          );
          return accDelivery + debtsSum;
        } else {
          return accDelivery;
        }
      }, 0);
      setTotalDebts(totalDebts);
    }
  }, []);

  useEffect(() => {
    setChartData((prevChartData) => ({
      ...prevChartData,
      series: [totalDebts, 100085],
    }));
  }, [totalDebts]);

  const [chartData, setChartData] = useState({
    options: {
      datalabels: {
        display: false,
      },
      colors: ["#F65531", "#2E93fA"],
      hover: {
        mode: null,
      },
    },
    series: [totalDebts, 100085],
  });

  return (
    <section className="sc">
      <h1>График выручки и задолженности</h1>
      <div className="chart-wrapper">
        <div className="chart_title">
          <h2>Продажи</h2>
          <select name="" id="">
            <option value="">За все время</option>
            <option value="">За год</option>
            <option value="">За месяц</option>
            <option value="">За неделью</option>
          </select>
        </div>
        <div className="cc-sa">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="donut"
            width="200"
          />
          <div className="series">
            <Series
              bg={"bg1"}
              color={"#1E89EC"}
              sum={100085}
              text={"оплачено"}
            />
            <Series
              bg={"bg2"}
              color={"#F65531"}
              sum={totalDebts}
              text={"Долги"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartWrapper;
