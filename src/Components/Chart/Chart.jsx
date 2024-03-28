import React, { useContext, useEffect, useState } from "react";
import "./Chart.css";

import Chart from "react-apexcharts";
import Series from "../../Decomponents/Series";
import { UserContext } from "../../Context/Context";

const ChartWrapper = () => {
  const { deliveryData } = useContext(UserContext);
  const [totalDebts, setTotalDebts] = useState(0);
  const [totalPartly, setTotalPartly] = useState(0);
  useEffect(() => {
    console.log(deliveryData);
    if (deliveryData.length > 0) {
      let debtsSum = 0;
      let partlySum = 0;
      deliveryData.forEach((deliveryman) => {
        if (deliveryman.clientsAsDeliveryman) {
          deliveryman.clientsAsDeliveryman.forEach((client) => {
            if (client.profile && typeof client.profile.debts === "number") {
              debtsSum += client.profile.debts;
            }
            if (client.profile && client.profile.paymentHistories) {
              client.profile.paymentHistories.forEach((payment) => {
                if (
                  payment.paymentType === "partly" ||
                  payment.paymentType === "paid"
                ) {
                  console.log(payment.money);
                  partlySum += payment.money;
                }
              });
            }
          });
        }
      });
      setTotalDebts(debtsSum);
      setTotalPartly(partlySum);
    }
  }, [deliveryData]);

  useEffect(() => {
    setChartData((prevChartData) => ({
      ...prevChartData,
      series: [totalDebts, totalPartly],
    }));
  }, [totalDebts, totalPartly]);

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
    series: [0, 0],
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
              sum={totalPartly}
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
